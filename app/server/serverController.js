module.exports = {

    createUser: (DB, profileData) => {
        DB.find_user_by_authID(profileData.auth_id).then((user) => {
            if (!user[0]) {
                let { username, name, email, profilepic, auth_id, role } = profileData;
                DB.create_user(username, name, email, profilepic, auth_id, role);
            }
        });
    },

    getAllTickets: (DB, request, response, auth_id) => {
        DB.find_user_role(auth_id).then((data) => {
            if (data[0].role === 'admin') {
                DB.get_all_tickets().then((data) => {
                    response.status(200).send(data);
                });
            } else {
                response.send('Not Authenticated');
            }
        });
    },

    getTicketById: (DB, request, response, ticket_id, auth_id) => {
        DB.find_user_role(auth_id).then((data) => {
            if (data[0].role === 'admin') {
                DB.get_ticket_by_id(request.params.ticket_id).then(data => {
                    response.status(200).send(data);
                });
            } else {
                response.send('Not Authenticated');
            }
        });
    },

    createTicket: (DB, request, response, ticketData) => {
        let { auth_id, subject, status, description } = ticketData;

        DB.create_ticket(auth_id, subject, status, description).then(data => {
            response.status(200).send(data);
        });
    },

    updateTicketStatus: (DB, request, response, ticketData, auth_id) => {
        let { ticket_id, status } = ticketData;

        DB.find_user_role(auth_id).then((data) => {
            if (data[0].role === 'admin') {
                DB.update_ticket_status(ticket_id, status).then(data => {
                    response.status(200).send(data);
                });
            } else {
                response.send('Not Authenticated');
            }
        });
    },

    postComment: (DB, request, response, commentData) => {
        console.log(commentData);
        DB.post_comment([commentData]).then((data) => {
            response.status(200).send('Comment Successful');
        })
    }
}