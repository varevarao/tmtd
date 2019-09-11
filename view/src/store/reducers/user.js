import { user as actionTypes } from '../actions/actionTypes';

const initialState = {
    profile: null,
    meta: {}
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.LOGIN:
            return {
                ...state,
                profile: payload.profile,
                meta: payload.meta || {}
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
