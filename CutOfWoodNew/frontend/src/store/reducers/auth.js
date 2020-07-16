import { AUTH_SUCCESS, AUTH_LOGOUT, AUTH_ERROR, REGISTRATION_ERROR } from "../actions/actionTypes";

const initialState = {
    token: null,
    user: {},
    errorMessage: ""
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                token: action.token,
                user: action.user,
                errorMessage: ""
            };
        case AUTH_LOGOUT:
            return initialState;
        case AUTH_ERROR:
            return {
                ...state,
                errorMessage: action.errorMessage
            };
        case REGISTRATION_ERROR:
            return {
                ...state,
                errorMessage: action.errorMessage
            };
        default:
            return state;
    }
}