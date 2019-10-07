import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    username: null,
    group: null,
    error: null, 
    loading: false,
    is_admin:null,
    is_anon:null

}

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.user.token,
        username: action.user.username,
        group: action.user.group,
        error: null,
        loading: false,
        is_admin:action.user.is_admin,
        is_anon:action.user.is_anon

    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        username: null,
        group: null,
        error: null,
        loading: false,
        is_admin:null,
        is_anon:null

    });
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default:
            return state;
    }
}

export default reducer;