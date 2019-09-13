import { user as actionTypes } from '../actions/actionTypes';

const initialState = {
    authenticated: false,
    profile: null,
    meta: {},
    groups: {}
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
                groups: payload.groups || {}
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
        default:
            return state
    }
}
