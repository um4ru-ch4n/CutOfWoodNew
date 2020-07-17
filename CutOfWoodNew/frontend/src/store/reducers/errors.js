import { GET_ERRORS } from '../actions/actionTypes';

const initialState = {
  message: {},
  status: null,
};

export default function errorsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        message: action.payload.message,
        status: action.payload.status,
      };
    default:
      return state;
  }
}