import axios from 'axios';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from './actionTypes';
import { returnErrors } from './messages';

// Проверка токена пользователя из store и получение информации о пользователе
export const loadUser = () => async (dispatch, getState) => {
    
    dispatch({ type: USER_LOADING });       // Установка поля isLoading в значение true

    const token = getState().authReducer.token;     // Получение значения токена из store

    if (token) {
        const options = {
            method: 'GET',
            headers: {
                'Authorization': 'Token ' + token,
            },
            url: "/api/auth/user"
        };

        await axios(options)
            .then(response => {     // При успешной проверке токена сохраняем информацию о пользователе в store
                dispatch({
                    type: USER_LOADED,
                    payload: response.data,
                });
            })
            .catch(error => {
                dispatch(returnErrors(error.response.data, error.response.status));     // При отсутствии токена в базе данных возвращаем сообщение об ошибке
                dispatch({
                    type: AUTH_ERROR,
                });
            })

    } else {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

// Авторизация пользователя
export const login = loginData => async dispatch => {
    const requestData = {
        email: loginData.email,
        password: loginData.password,
    }

    const url = "/api/auth/login"

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(requestData),
        url: url
    };

    await axios(options)
        .then(response => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data,
            });
        })
        .catch(error => {
            dispatch(returnErrors(error.response.data, error.response.status));
            dispatch({
                type: LOGIN_FAIL,
            });
        })
};

// Регистрация пользователя
export const register = (newUser) => async dispatch => {
    const url = "/api/auth/register"

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(newUser),
        url: url
    };
    await axios(options)
        .then(response => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data
            });
        })
        .catch(error => {
            dispatch(returnErrors(error.response.data, error.response.status));
            dispatch({
                type: REGISTER_FAIL,
            });
        })
};

// Выход из аккаунта пользователя
export const logout = () => async (dispatch, getState) => {
    const url = "/api/auth/logout"
    const token = getState().authReducer.token;

    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'Token ' + token,
        },
        url: url
    };

    await axios(options)
      .then(() => {
        dispatch({
          type: LOGOUT_SUCCESS,
        });
      })
      .catch((error) => {
        dispatch(returnErrors(error.response.data, error.response.status));
      });
  };