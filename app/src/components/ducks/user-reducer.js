const initialState = {
    username: '',
    name: '',
    email: '',
    profilepic: '',
    auth_id: '',
    role: ''
}

const GET_USER_INFO = 'GET_USER_INFO';
const CHANGE_USERNAME = 'CHANGE_USERNAME';
const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';

export function getUserInfo() {

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

//create an action that will change user.username
export function changeUsername(value) {
    return {
        type: CHANGE_USERNAME,
        payload: value
    }
}

export function updateCurrentUser(user) {
    return {
        type: UPDATE_CURRENT_USER,
        payload: user
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_CURRENT_USER:
            return Object.assign({}, state, action.payload);
        case GET_USER_INFO:
            return Object.assign({}, state, action.payload);
        case CHANGE_USERNAME:
            return Object.assign({}, state, { username: action.payload });
        default:
            return state;
    }
}