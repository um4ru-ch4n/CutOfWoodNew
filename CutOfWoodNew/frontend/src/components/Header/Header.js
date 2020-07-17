import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../../store/actions/auth';

class Header extends React.Component {
    static propTypes = {
        logout: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired,
    };

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <li className="nav-item">
                    <strong className="nav-link">{user ? `Welcome ${user.username}` : ''}</strong>
                </li>
                <li className="nav-item">
                    <Link onClick={(e) => {
                        e.preventDefault();
                        this.props.logout();
                    }} className="nav-link" to="/">
                        Выход
                    </Link>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        Авторизация
                </Link>
                </li>
                <li className="nav-item">
                    <Link to="/registration" className="nav-link">
                        Регистрация
                </Link>
                </li>
            </ul>
        );

        return (
            <nav className={"navbar navbar-expand-sm navbar-dark bg-dark "}>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link className="navbar-brand" to={"/"}>CutOfWood</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav my-2 my-lg-0">
                        {
                            isAuthenticated ? authLinks : guestLinks
                        }
                    </ul>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.authReducer
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
