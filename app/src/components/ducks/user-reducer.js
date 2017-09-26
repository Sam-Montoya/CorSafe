const initialState = {
    username: '',
    name: 'Error',
    email: '',
    profilepic: '',
    auth_id: '',
    role: '',
    navText: '',
    userTickets: [],
    filteredTickets: []
}

const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';
const UPDATE_NAVBAR_TEXT = 'UPDATE_NAVBAR_TEXT';

const UPDATE_USERTICKETS = 'UPDATE_USERTICKETS';
const UPDATE_FILTEREDTICKETS = 'UPDATE_FILTEREDTICKETS';

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

export function updateUserTickets(ticketArray) {
    return {
        type: UPDATE_USERTICKETS,
        payload: ticketArray
    }
}

export function updateFilteredTickets(ticketArray) {
    return {
        type: UPDATE_FILTEREDTICKETS,
        payload: ticketArray
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_CURRENT_USER:
            return Object.assign({}, state, action.payload);
        case UPDATE_NAVBAR_TEXT:
            return Object.assign({}, state, { navText: action.payload });
        case UPDATE_USERTICKETS:
            return Object.assign({}, state, { userTickets: action.payload });
        case UPDATE_FILTEREDTICKETS:
            return Object.assign({}, state, { filteredTickets: action.payload })
        // case CHANGE_USERNAME:
        //     return Object.assign({}, state, { username: action.payload });
        default:
            return state;
    }
}