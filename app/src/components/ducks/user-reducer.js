const initialState = {
    username: '',
    name: 'Error',
    email: '',
    profilepic: '',
    auth_id: '',
    role: '',
    navText: ''
}

const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';
const UPDATE_NAVBAR_TEXT = 'UPDATE_NAVBAR_TEXT';


export function updateCurrentUser(user) {
    return {
        type: UPDATE_CURRENT_USER,
        payload: user
    }
}

export function updateNavBarText(text) {
    return {
        type: UPDATE_NAVBAR_TEXT,
        payload: text
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_CURRENT_USER:
            return Object.assign({}, state, action.payload);
        case UPDATE_NAVBAR_TEXT:
            return Object.assign({}, state, { navText: action.payload });
        // case CHANGE_USERNAME:
        //     return Object.assign({}, state, { username: action.payload });
        default:
            return state;
    }
}