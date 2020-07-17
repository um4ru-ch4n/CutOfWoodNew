import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Alerts extends Component {
	static propTypes = {
		message: PropTypes.object.isRequired,
		error: PropTypes.object.isRequired,
	};

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

		if (error !== prevProps.error) {
			for (let key in error.message) {
				if (typeof(error.message[key]) === "object") {
					alert.error(`${(key in messageTranslation ? messageTranslation[key] : "Ошибка")}: ${error.message[key].join()}`);
				} else {
					alert.error(`${(key in messageTranslation ? messageTranslation[key] : "Ошибка")}: ${error.message[key]}`);
				}
				
			}
		}

		if (message !== prevProps.message) {
			if (message.type === "error") {
				alert.error(message.text);
			} else if (message.type === "success") {
				alert.success(message.text);
			} else {
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
	message: state.messagesReducer,
	error: state.errorsReducer,
});

export default connect(mapStateToProps)(withAlert()(Alerts));