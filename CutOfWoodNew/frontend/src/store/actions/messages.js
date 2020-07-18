import { CREATE_MESSAGE, GET_ERRORS } from './actionTypes';

// Запись сообщения об ошибке/успехе/инфо
export const createMessage = (text, type="info") => {
	return {
		type: CREATE_MESSAGE,
		payload: {
			text,
			type
		},
	};
};

// Получение списка ошибок с бэкенда и запись его в store
export const returnErrors = (message, status) => {
	return {
		type: GET_ERRORS,
		payload: { message, status },
	};
};