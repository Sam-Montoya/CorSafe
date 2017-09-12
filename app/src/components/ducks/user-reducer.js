import axios from 'axios';

const initialState = {
    user: {
        username: 'test',
        name: '',
        email: '',
        profilepic: '',
        auth_id: '',
        role: ''
    }
}

const GET_USER_INFO = 'GET_USER_INFO';

export function getUserInfo() {
    // let userInfo = axios.get('/api/getUserInfo', auth_id).then(response => {
    //     return response.data;
    // });
    let userInfo = {
        username: 'Test',
        name: 'test',
        email: 'Test',
        profilepic: 'test',
        auth_id: 'Test',
        role: 'user'
    }

    return {
        type: GET_USER_INFO,
        payload: userInfo
    };
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_INFO + '_FULFILLED':
            return Object.assign({}, state, { username: action.payload });
        default:
            return state;
    }
}