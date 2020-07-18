import { GET_ERRORS } from '../actions/actionTypes';

const initialState = {
  message: {},    // Сообщение об ошибке
  status: null,   // Статус ошибки
};

// Редюсер для работы с ошибками
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