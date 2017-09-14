const axios = require('axios');

module.exports = {
    getUserInfo: () => {
        return axios.get('/api/getUserInfo').then(userInfo => {
            return userInfo.data;
        })
    },

    getUserById: (auth_id) => {
        let authID = {auth_id: auth_id}

        return axios.post('/api/getUserById', authID).then(userInfo => {
            return userInfo.data;
        })
    },

    createTicket: (ticketData) => {
        axios.post('/api/createTicket', ticketData).then(response => {
            return response.data;
        })
    },

    getUserTickets: (auth_id) => {
        let user_auth_id = {auth_id: auth_id}

        return axios.post('/api/getUserTickets', user_auth_id).then(userTickets => {
            return userTickets.data;
        })
    },

    getTicketById: (ticket_id) => {
        let ticketID = {ticket_id: ticket_id}

        return axios.post('/api/getTicketById', ticketID).then(ticketData => {
            return ticketData.data;
        })
    },

    getComments: (ticket_id) => {
        let ticketID = {ticket_id: ticket_id}

        return axios.post('/api/getComments', ticketID).then(ticketData => {
            return ticketData.data;
        })
    } ,

    postComment: (commentData) => {
        return axios.post('/api/postComment', commentData).then(comments => {
            return comments.data;
        })
    }
}