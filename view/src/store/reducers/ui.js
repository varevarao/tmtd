import { ui as actionTypes } from '../actions/actionTypes';

const initialState = {
    loader: true,
    toaster: null,
    modal: null,
    header: null,
    initialized: false
};

const uiReducer = (state = initialState, action) => {
    let type, props;
    switch (action.type) {
        case actionTypes.SHOW_LOADER:
            return {
                ...state,
                loader: true
            }
        case actionTypes.HIDE_LOADER:
            return {
                ...state,
                loader: false
            }
        case actionTypes.SHOW_HEADER:
            return {
                ...state,
                header: { ...action.payload }
            }
        case actionTypes.HIDE_HEADER:
            return {
                ...state,
                header: null
            }
        case actionTypes.SHOW_TOASTER:
            type = action.payload.type || null;
            props = action.payload.props || null;
            return {
                ...state,
                toaster: { type, props }
            }
        case actionTypes.HIDE_TOASTER:
            return {
                ...state,
                toaster: null
            }
        case actionTypes.SHOW_MODAL:
            type = action.payload.type || null;
            props = action.payload.props || null;
            return {
                ...state,
                modal: { type, props }
            }
        case actionTypes.HIDE_MODAL:
            return {
                ...state,
                modal: null
            }
        case actionTypes.LOADING:
            return {
                ...state,
                initialized: 'loading'
            }
        case actionTypes.LOADED:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

export default uiReducer;