import { combineReducers } from 'redux'

const defaultState = {
    users: []
}

const authState = {
    login: false,
    logedInUser: null,
    regiseredUsers: [],
    userNotFound: false,
    isSignup: false
}

const authReducer = (state = authState, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                login: action.payload ? true : false,
                logedInUser: action.payload
            }
        case "USER_NOT_FOUND":
            return {
                ...state,
                userNotFound: action.payload
            }
        case "SIGNUP":
            return {
                ...state,
                isSignup: action.payload
            }

        default: return state
    }
}


const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "USER_LIST":
            return {
                ...state,
                users: action.payload
            }
        case "ADD_USER":
            return {
                ...state,
                users: state.users.concat([action.payload])
            }
        case "EDIT_USER": {
            const userIndex = state.users.findIndex(user => user.id === action.payload.id);
            state.users.splice(userIndex,1,action.payload)
            return {
                ...state,
                users: [...state.users]
            }
        }
        case "DELETE_USER": {
            const users = state.users.filter(user => user.id !== action.payload);
            return {
                ...state,
                users: users
            }
        }

        default: return state
    }
}

const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer
});

export default rootReducer;