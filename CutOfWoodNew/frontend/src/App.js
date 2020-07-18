import React, { Fragment } from 'react';

import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadUser } from './store/actions/auth';
// import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Header from './components/Header/Header';
import Alerts from './hoc/Alerts/Alerts';

class App extends React.Component {
	async componentDidMount() {
		await this.props.loadUser();		// Проверка актуальности токена пользователя
	}

	static propTypes = {
        isAuthenticated: PropTypes.bool,		// true, если пользователь авторизован, иначе false
        loadUser: PropTypes.func.isRequired		// Метод для загрузки информации о пользователе
    };

	render() {
		// Публичные роуты
		let routers = (
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/registration" component={Registration} />
				{/* <Route exact path="/" component={Home} /> */}
				<Redirect to={"/"} />
			</Switch>
		);
		
		// Приватные роуты
		if (this.props.isAuthenticated) {
			routers = (
				<Switch>
					{/* <Route exact path="/" component={Home} /> */}
					<Redirect to={"/"} />
				</Switch>
			);
		}

		return (
			<Fragment>
				<Header />		{/* Шапка сайта */}
				<Alerts />		{/* Всплывающие уведомления */}

				{routers}		{/* Все роуты сайта */}
			</Fragment>
		);
	}
}

function mapStateToProps(state) {
	return {
		isAuthenticated: state.authReducer.isAuthenticated		// Импорт поля для проверки авторизован ли пользователь из store
	};
}

function mapDispatchToProps(dispatch) {
	return {
		loadUser: () => dispatch(loadUser())		// Импорт метода для загрузки информации о пользователе из actions
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));