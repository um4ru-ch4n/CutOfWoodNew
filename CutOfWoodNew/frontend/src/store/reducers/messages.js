import { CREATE_MESSAGE } from '../actions/actionTypes';

const initialState = {
	text: "",		// текст сообщения
	type: ""		// Тип сообщения (ошибка/успех/инфо)
};

// Редюсер для работы с всплывающими уведомлениями
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