import { user as actionTypes } from './actionTypes';
import AuthenticationService from '../../services/authentication-service';
import DataService from '../../services/data-service';

export const setProfile = (profile, meta) => ({
    type: actionTypes.LOGIN,
    payload: { profile, meta }
});

export const login = (email, password) => async dispatch => {
    try {
        // First, perform the login
        await AuthenticationService.login(email, password);
        // Next get the profile
        await dispatch(fetchUserProfile());
    } catch (err) {
        // Log any error
        console.error(err);
    }
}

export const logout = () => {
    AuthenticationService.logout();
    return {
        type: actionTypes.LOGOUT
    }
};

export const setMeta = (key, value) => ({
    type: actionTypes.SET_META,
    payload: { key, value }
});

export const deleteMeta = key => ({
    type: actionTypes.DELETE_META,
    payload: { key }
});

export const fetchUserProfile = () => async dispatch => {
    const profile = await DataService.getUserProfile();
    dispatch(setProfile(profile));
}

export const setupInitialState = () => async dispatch => {
    if (AuthenticationService.loggedIn()) {
        await dispatch(fetchUserProfile());
    } else {
        dispatch(logout());
    }
    return Promise.resolve(true);
}