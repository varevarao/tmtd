import AuthenticationService from '../../services/authentication-service';
import DataService from '../../services/data-service';
import { user as actionTypes } from './actionTypes';

export const authenticated = bool => ({
    type: actionTypes.AUTH,
    payload: bool
})

export const setProfile = ({ email, firstName, lastName, projects, groups, ...meta }) => ({
    type: actionTypes.LOGIN,
    payload: {
        profile: { email, firstName, lastName },
        meta: meta || {},
        projects: projects ? projects.reduce((acc, curr) => {
            acc[curr.title] = curr;
            return acc;
        }, {}) : {},
        groups: groups ? groups.reduce((acc, curr) => {
            acc[curr.name] = curr;
            return acc;
        }, {}) : {}
    }
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

export const addGroup = ({ id, name, tags, notes }) => ({
    type: actionTypes.ADD_GROUP,
    payload: {
        id,
        group: { id, name, tags, notes }
    }
})

export const updateGroup = ({ id, name, tags, notes }) => ({
    type: actionTypes.UPDATE_GROUP,
    payload: {
        id,
        group: { id, name, tags, notes }
    }
})

export const deleteGroup = id => ({
    type: actionTypes.DELETE_GROUP,
    payload: { id }
})

export const localCreateProject = ({ id, title, tags, notes }) => ({
    type: actionTypes.ADD_PROJECT,
    payload: {
        id,
        project: { id, title, tags, notes }
    }
})

export const createProject = ({ title, group, tags, notes }) => async dispatch => {
    const project = await DataService.postNewProject({ title, group, notes, tags });
    dispatch(localCreateProject(project));
}

export const localUpdateProject = ({ id, name, tags, notes }) => ({
    type: actionTypes.UPDATE_PROJECT,
    payload: {
        id,
        project: { id, name, tags, notes }
    }
})

export const updateProject = ({ id, title, group, tags, notes }) => async dispatch => {
    const project = await DataService.updateProject({ id, title, group, notes, tags });
    dispatch(localUpdateProject(project));
}

export const localDeleteProject = id => ({
    type: actionTypes.DELETE_PROJECT,
    payload: { id }
})

export const deleteProject = id => async dispatch => {
    // const project = await DataService.({ id, title, group, notes, tags });
    // dispatch(localUpdateProject(project));
}

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