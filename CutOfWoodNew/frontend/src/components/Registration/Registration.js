import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../store/actions/auth';
import { createMessage } from '../../store/actions/messages';

// Компонент для регистрации пользователя
export class Registration extends Component {
    state = {
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        patronymic: '',
        phone_number: '',
        instagram: '',
        password: '',
        password2: '',
    };

    static propTypes = {
        register: PropTypes.func.isRequired,        // Метод для регистрации пользователя
        isAuthenticated: PropTypes.bool,            // true, если пользователь авторизован, иначе false
    };

    // Метод при отправке формы регистрации
    onSubmit = (e) => {
        e.preventDefault();
        const {
            username,
            email,
            first_name,
            last_name,
            patronymic,
            phone_number,
            instagram,
            password,
            password2,
        } = this.state;

        // Регулярное выражение для проверки поля с номером телефона
        const phoneNumberRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gmi;
        // Регулярное выражение для проверки поля с инстаграмом
        const instagramRegExp = /^[@]\w*/gmi;

        if (username.length < 3) {      // Если никнейм слишком короткий
            this.props.createMessage("Никнейм должен состоять как минимум из 3 символов!", "error");
        } else if (phone_number && !phoneNumberRegExp.test(phone_number)) {     // Если поле номера телефона заполнено не верно
            this.props.createMessage("Неверный формат поля номер телефона!", "error");
        } else if (instagram && !instagramRegExp.test(instagram)) {     // Если поле инстаграма заполнено не верно
            this.props.createMessage("Неверный формат поля инстаграм!", "error");
        } else if (password !== password2) {        // Если пароли не совпадают
            this.props.createMessage("Пароли не совпадают!", "error");
        } else if (password.length < 6) {       // Если пароль слишком короткий
            this.props.createMessage("Пароль должен состоять как минимум из 6 символов!", "error");
        } else {
            const newUser = {
                username,
                email,
                first_name,
                last_name,
                patronymic,
                phone_number,
                instagram,
                password
            };
            this.props.register(newUser);
        }
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
            username,
            email,
            first_name,
            last_name,
            patronymic,
            phone_number,
            instagram,
            password,
            password2
        } = this.state;
        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Registration</h2>
                    {/* Форма регистрации */}
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                onChange={this.onChange}
                                value={username}
                            />
                        </div>
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
                            <label>Firstname</label>
                            <input
                                type="text"
                                className="form-control"
                                name="first_name"
                                onChange={this.onChange}
                                value={first_name}
                            />
                        </div>
                        <div className="form-group">
                            <label>Lastname</label>
                            <input
                                type="text"
                                className="form-control"
                                name="last_name"
                                onChange={this.onChange}
                                value={last_name}
                            />
                        </div>
                        <div className="form-group">
                            <label>Patronymic</label>
                            <input
                                type="text"
                                className="form-control"
                                name="patronymic"
                                onChange={this.onChange}
                                value={patronymic}
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone number</label>
                            <input
                                type="text"
                                className="form-control"
                                name="phone_number"
                                onChange={this.onChange}
                                value={phone_number}
                            />
                        </div>
                        <div className="form-group">
                            <label>Instagram</label>
                            <input
                                type="text"
                                className="form-control"
                                name="instagram"
                                onChange={this.onChange}
                                value={instagram}
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
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password2"
                                onChange={this.onChange}
                                value={password2}
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </div>
                        <p>
                            Already have an account? <Link to="/login">Login</Link>
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
    register: (newUser) => dispatch(register(newUser)),     // Импорт метода для регистрации из actions
    createMessage: (text, type) => dispatch(createMessage(text, type))      // Импорт метода создания всплывающего сообщения из actions
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);