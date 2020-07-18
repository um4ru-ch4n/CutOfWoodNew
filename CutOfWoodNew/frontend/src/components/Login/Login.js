import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../store/actions/auth';

// Компонент для авторизации пользователя
export class Login extends Component {
    state = {
        email: '',
        password: ''
    };

    static propTypes = {
        login: PropTypes.func.isRequired,       // Метод для авторизации
        isAuthenticated: PropTypes.bool,        // true, если пользователь авторизован, иначе false
    };

    // Метод при отправке формы авторизации
    onSubmit = (e) => {
        e.preventDefault();
        const { email, password } = this.state;

        const loginData = {
            email,
            password
        };

        this.props.login(loginData);

    };

    // Метод при изменении состояния поля формы авторизации
    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        // Если пользователь уже авторизован, 
        // происходит перенаправление на главную страницу
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
        }
        const {
            email,
            password,
        } = this.state;
        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Authorization</h2>
                    {/* Форма авторизации */}
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                onChange={this.onChange}
                                value={email}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                onChange={this.onChange}
                                value={password}
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        </div>
                        <p>
                            Don't have an account? <Link to="/registration">Registration</Link>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated      // Импорт поля для проверки авторизован ли пользователь из store
});

const mapDispatchToProps = dispatch => ({
    login: (loginData) => dispatch(login(loginData))        // Импорт метода для авторизации из actions
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);