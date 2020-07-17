import { CREATE_MESSAGE, GET_ERRORS } from './actionTypes';

// CREATE MESSAGE
export const createMessage = (text, type="info") => {
	return {
		type: CREATE_MESSAGE,
		payload: {
			text,
			type
		},
	};
};

// RETURN ERRORS
export const returnErrors = (message, status) => {
	return {
		type: GET_ERRORS,
		payload: { message, status },
	};
};