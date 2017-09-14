module.exports = {

    createUser: (DB, profileData) => {
        DB.find_user_by_authID(profileData.auth_id).then((user) => {
            if (!user[0]) {
                let { username, name, email, profilepic, auth_id, role } = profileData;
                DB.create_user(username, name, email, profilepic, auth_id, role);
            }
        });
    },

    getUserById: (DB, request, response, auth_id) => {
        DB.find_user_by_authID(auth_id).then(user => {
            response.status(200).send(user);
        });
    },

    getAllTickets: (DB, response, auth_id) => {
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

    getUserTickets: (DB, request, response, auth_id) => {
        DB.get_user_tickets(auth_id).then(data => {
            response.send(data);
        })
    },

    getTicketById: (DB, request, response, ticket_id) => {
        DB.get_ticket_by_id(ticket_id).then(data => {
            response.status(200).send(data);
        });
    },

    createTicket: (DB, response, ticketData) => {
        let { auth_id, subject, status, tag, description } = ticketData;
        DB.create_ticket(auth_id, subject, status, tag, description).then(data => {

            DB.init_comment(data[0].ticket_id).then(() => {
                console.log('Created Comment Section');
            })

            response.status(200).send(data);
        });
    },

    updateTicketStatus: (DB, response, ticketData, auth_id) => {
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
        DB.post_comment([commentData, commentData.ticket_id]).then((data) => {
            response.status(200).send('Comment Successful');
        })
    },

    getComment: (DB, request,response,ticket_id) => {
        DB.get_comments(request.body.ticket_id).then(data => {
            response.status(200).send(data);
        })
    }
}