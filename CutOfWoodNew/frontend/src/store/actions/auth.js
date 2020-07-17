import axios from 'axios';
// import axios from '../../axios/myAxios';

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

// CHECK TOKEN & LOAD USER
export const loadUser = () => async (dispatch, getState) => {
    // User Loading
    dispatch({ type: USER_LOADING });

    const token = getState().authReducer.token;

    if (token) {
        const options = {
            method: 'GET',
            headers: {
                'Authorization': 'Token ' + token,
            },
            url: "/api/auth/user"
        };

        await axios(options)
            .then(response => {
                dispatch({
                    type: USER_LOADED,
                    payload: response.data,
                });
            })
            .catch(error => {
                dispatch(returnErrors(error.response.data, error.response.status));
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

// LOGIN USER
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

// REGISTER USER
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

// LOGOUT USER
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