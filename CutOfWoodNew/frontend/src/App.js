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
		await this.props.loadUser();
	}

	static propTypes = {
        isAuthenticated: PropTypes.bool,
        loadUser: PropTypes.func.isRequired
    };

	render() {
		let routers = (
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/registration" component={Registration} />
				{/* <Route exact path="/" component={Home} /> */}
				<Redirect to={"/"} />
			</Switch>
		);

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
				<Header />
				<Alerts />

				{routers}
			</Fragment>
		);
	}
}

function mapStateToProps(state) {
	return {
		isAuthenticated: state.authReducer.isAuthenticated
	};
}

function mapDispatchToProps(dispatch) {
	return {
		loadUser: () => dispatch(loadUser())
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));