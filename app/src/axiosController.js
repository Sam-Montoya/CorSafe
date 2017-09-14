const axios = require('axios');

module.exports = {
    getUserInfo: () => {
        return axios.get('/api/getUserInfo').then(data => {
            return data;
        })
    },

    getUserById: (auth_id) => {
        let authID = {auth_id: auth_id}
        return axios.post('/api/getUserById', authID).then(data => {
            return data.data;
        })
    },

    createTicket: (ticketData) => {
        axios.post('/api/createTicket', ticketData).then(data => {
            console.log(data);
        })
    },

    getUserTickets: (auth_id) => {
        let user_auth_id = {auth_id: auth_id}
        console.log('axios controller: ', user_auth_id);
        return axios.post('/api/getUserTickets', user_auth_id).then(data => {
            return data;
        })
    },

    getTicketById: (ticket_id) => {
        let ticketID = {ticket_id: ticket_id}
        console.log('axios controller: ', ticketID);
        return axios.post('/api/getTicketById', ticketID).then(ticketData => {
            return ticketData;
        })
    },

    getComments: (ticket_id) => {
        let ticketID = {ticket_id: ticket_id}
        return axios.post('/api/getComments', ticketID).then(ticketData => {
            return ticketData;
        })
    } ,

    postComment: (commentData) => {
        return axios.post('/api/postComment', commentData).then(data => {
            return console.log(data);
        })
    }
}