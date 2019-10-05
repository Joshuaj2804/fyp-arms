import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = user => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        user
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/api-auth/login/', {
            username: username,
            password: password
        })
        .then(res => {
            const adminrole=res.data.user.groups==='http://127.0.0.1:8000/group-detail/1/'?true:false
            const anonrole=res.data.user.groups==='http://127.0.0.1:8000/group-detail/2/'?true:false
            const user = {
                username,
                token : res.data.key,
                expirationDate : new Date(new Date().getTime() + 3600 * 1000),
                group: res.data.user.groups,
                is_admin:adminrole,
                is_anon:anonrole

            }
            localStorage.setItem('user', JSON.stringify(user));
            dispatch(authSuccess(user));
            dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authSignup = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/api-auth/register/', {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        })
        .then(res => {
            const user = {
                username,
                token : res.data.key,
                expirationDate : new Date(new Date().getTime() + 3600 * 1000),
                group: res.data.user.group
            }
            localStorage.setItem('user', JSON.stringify(user));
            dispatch(authSuccess(user));
            dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === undefined) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if ( expirationDate <= new Date() ) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000) );
            }
        }
    }
}
