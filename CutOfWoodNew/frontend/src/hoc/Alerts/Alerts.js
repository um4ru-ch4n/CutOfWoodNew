import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


// Компонент для отображения всплывающих сообщений
class Alerts extends Component {
	static propTypes = {
		message: PropTypes.object.isRequired,		// Объект сообщения из store
		error: PropTypes.object.isRequired,			// Объект ошибки из store
	};

	// Вывод уведомления при обновлении компонента
	componentDidUpdate(prevProps) {
		const { error, alert, message } = this.props;
		const messageTranslation = {
			"username": "Никнейм",
			"email": "Email",
			"first_name": "Имя",
			"last_name": "Фамилия",
			"patronymic": "Отчество",
			"phone_number": "Номер телефона",
			"instagram": "Инстаграм",
			"password": "Пароль",
			"non_field_errors": "Ошибка",
		}

		if (error !== prevProps.error) {		// Если объект ошибки был изменен
			for (let key in error.message) {		// Перебираем словарь с сообщениями
				if (typeof(error.message[key]) === "object") {		// Если это массив, объединим его в строку методом join и выведем на экран
					alert.error(`${(key in messageTranslation ? messageTranslation[key] : "Ошибка")}: ${error.message[key].join()}`);
				} else {
					alert.error(`${(key in messageTranslation ? messageTranslation[key] : "Ошибка")}: ${error.message[key]}`);
				}
				
			}
		}

		// Если объект сообщения был изменен
		if (message !== prevProps.message) {
			if (message.type === "error") {		// Если тип сообщения "ошибка", выводим уведомление об ошибке
				alert.error(message.text);
			} else if (message.type === "success") {		// Если тип сообщения "успех", выводим уведомление об ошибке
				alert.success(message.text);
			} else {		// Во всех остальных случаях выводим "инфо" уведомление
				alert.info(message.text);
			}
		}
	}

	render() {
		return (
			<Fragment />
		)
	}
}

const mapStateToProps = (state) => ({
	message: state.messagesReducer,		// Импорт объекта "сообщение" из store
	error: state.errorsReducer,		// Импорт объекта "ошибка" из store
});

export default connect(mapStateToProps)(withAlert()(Alerts));