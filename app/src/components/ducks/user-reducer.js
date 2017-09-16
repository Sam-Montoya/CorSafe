const initialState = {
    username: '',
    name: '',
    email: '',
    profilepic: '',
    auth_id: '',
    role: ''
}

const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';


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
        // case CHANGE_USERNAME:
        //     return Object.assign({}, state, { username: action.payload });
        default:
            return state;
    }
}