module.exports = {

    createUser: (DB, profileData) => {
        DB.find_user_by_authID(profileData.auth_id).then((user) => {
            if (!user[0]) {
                let { username, name, email, profilepic, auth_id, role } = profileData;
                DB.create_user(username, name, email, profilepic, auth_id, role);
            }
        })
    },

    getUserById: (DB, request, response, auth_id) => {
        DB.find_user_by_authID(auth_id).then(user => {
            response.status(200).send(user);
        })
    },

    getUserTickets: (DB, request, response, auth_id) => {
        DB.get_user_tickets(auth_id).then(data => {
            response.send(data);
        })
    },

    getAdminTickets: (DB, request, response, auth_id) => {
        DB.find_user_role(auth_id).then((data) => {
            if (data[0].role === 'admin') {
                DB.get_all_tickets().then((data) => {
                    response.status(200).send(data);
                })
            } else {
                response.send('Not Authenticated');
            }
        })
    },

    getTicketById: (DB, request, response, ticket_id) => {
        DB.get_ticket_by_id(ticket_id).then(data => {
            response.status(200).send(data);
        })
    },

    getTicketCount: (DB, request, response, auth_id) => {
        let ticketCounts = []
        DB.get_resolved_count(auth_id).then(resolved => {
            ticketCounts.push(resolved);

            DB.get_inprogress_count(auth_id).then(inprogress => {
                ticketCounts.push(inprogress);

                DB.get_notanswered_count(auth_id).then(notanswered => {
                    ticketCounts.push(notanswered);
                    response.status(200).send(ticketCounts);
                })
            })
        })
    },

    createTicket: (DB, response, ticketData) => {
        let { auth_id, subject, status, tag, description, name } = ticketData;
        if (auth_id) {
            DB.create_ticket(auth_id, subject, status, tag, description, name).then(data => {
                DB.init_comment(data[0].ticket_id).then(() => {
                    console.log('Created Comment Section');
                })
                response.status(200).send(data);
            })
        } else {
            response.status(200).send('Account not valid.');
        }
    },

    deleteTicket: (DB, request, response, ticket_id) => {
        DB.delete_ticket(ticket_id).then(data => {
            response.status(200).send('Ticket Deleted.');
        })
    },

    updateTicketStatus: (DB, request, response) => {
        let { ticket_id, newStatus } = request.body;
        DB.update_ticket_status(ticket_id, newStatus).then(data => {
            response.status(200).send('Ticket #' + ticket_id + ' has been changed to ' + newStatus + '.');
        });
    },

    postComment: (DB, request, response, commentData) => {
        DB.post_comment([commentData, commentData.ticket_id]).then((data) => {
            response.status(200).send('Comment Successful');
        })
    },

    getComment: (DB, request, response, ticket_id) => {
        DB.get_comments(request.body.ticket_id).then(data => {
            response.status(200).send(data);
        })
    }
}