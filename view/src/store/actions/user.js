import { user as actionTypes } from './actionTypes';
import AuthenticationService from '../../services/authentication-service';
import DataService from '../../services/data-service';

export const authenticated = bool => ({
    type: actionTypes.AUTH,
    payload: bool
})

export const setProfile = (profile, meta) => ({
    type: actionTypes.LOGIN,
    payload: { profile, meta }
});

export const login = ({ email, password }) => async dispatch => {
    // First, perform the login
    await AuthenticationService.login(email, password);
    // Update login status
    dispatch(authenticated(true));
    // Next get the profile
    await dispatch(fetchUserProfile());
}

export const register = ({ fName, lName, email, password }) => async dispatch => {
    // Do the registration
    await AuthenticationService.register({ fName, lName, email, password });
    // Update login status
    dispatch(authenticated(true));
    // Next get the profile
    await dispatch(fetchUserProfile());
}

export const logout = () => dispatch => {
    dispatch(authenticated(false));
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
        dispatch(authenticated(true));
        await dispatch(fetchUserProfile());
    } else {
        dispatch(logout());
    }
    return Promise.resolve(true);
}