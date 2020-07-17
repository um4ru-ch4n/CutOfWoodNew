import { CREATE_MESSAGE } from '../actions/actionTypes';

const initialState = {
	text: "",
	type: ""
};

export default function messagesReducer(state = initialState, action) {
	switch (action.type) {
		case CREATE_MESSAGE:
			return {
				text: action.payload.text,
				type: action.payload.type
			};
		default:
			return state;
	}
}