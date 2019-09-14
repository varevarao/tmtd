import { user as actionTypes } from '../actions/actionTypes';

const initialState = {
    authenticated: false,
    profile: null,
    meta: {},
    groups: {},
    projects: {}
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.AUTH:
            return {
                ...state,
                authenticated: payload
            }
        case actionTypes.LOGIN:
            return {
                ...state,
                profile: payload.profile,
                meta: payload.meta || {},
                groups: payload.groups || {},
                projects: payload.projects || {}
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                profile: null,
                meta: {}
            }
        case actionTypes.SET_META:
            return {
                ...state,
                meta: { ...state.meta, [payload.key]: payload.value }
            }
        case actionTypes.DELETE_META:
            const newMeta = { ...state.meta };
            if (payload.key in newMeta) delete newMeta[payload.key];

            return {
                ...state,
                meta: newMeta
            }
        case actionTypes.ADD_PROJECT:
        case actionTypes.UPDATE_PROJECT:
            return {
                ...state,
                projects: { ...state.projects, [payload.project.id]: payload.project }
            }
        case actionTypes.DELETE_PROJECT:
            const afterRemove = { ...state.projects };
            delete afterRemove[payload.id];
            return {
                ...state,
                projects: afterRemove
            }
        default:
            return state
    }
}
