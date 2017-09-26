const initialState = {
    username: '',
    name: 'Error',
    email: '',
    profilepic: '',
    auth_id: '',
    role: '',
    navText: 'Something went wrong...',
    userTickets: [],
    filteredTickets: [],
    buttonClass: 'top-navbar-button-resolved',
    buttonStatus: 'Resolved'
}

const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';
const UPDATE_NAVBAR_TEXT = 'UPDATE_NAVBAR_TEXT';

const UPDATE_USERTICKETS = 'UPDATE_USERTICKETS';
const UPDATE_FILTEREDTICKETS = 'UPDATE_FILTEREDTICKETS';

const UPDATE_BUTTONSTATUS = 'UPDATE_BUTTONSTATUS';
const UPDATE_BUTTONCLASS = 'UPDATE_BUTTONCLASS';

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

export function updateButtonStatus(status) {
    return {
        type: UPDATE_BUTTONSTATUS,
        payload: status
    }
}

export function updateButtonClass(buttonClass) {
    return {
        type: UPDATE_BUTTONCLASS,
        payload: buttonClass
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
            return Object.assign({}, state, { filteredTickets: action.payload });
        case UPDATE_BUTTONSTATUS:
            return Object.assign({}, state, { buttonStatus: action.payload });
        case UPDATE_BUTTONCLASS:
            return Object.assign({}, state, { buttonClass: action.payload });
        // case CHANGE_USERNAME:
        //     return Object.assign({}, state, { username: action.payload });
        default:
            return state;
    }
}