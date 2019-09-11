import { ui as actionTypes } from './actionTypes';

export const showLoader = () => ({
    type: actionTypes.SHOW_LOADER
});

export const hideLoader = () => ({
    type: actionTypes.HIDE_LOADER
});

export const showToaster = (type, props) => ({
    type: actionTypes.SHOW_TOASTER,
    payload: { type, props }
});

export const hideToaster = () => ({
    type: actionTypes.HIDE_TOASTER
});

export const showModal = (type, props) => ({
    type: actionTypes.SHOW_MODAL,
    payload: { type, props }
});

export const hideModal = () => ({
    type: actionTypes.HIDE_MODAL
});

export const showHeader = props => ({
    type: actionTypes.SHOW_HEADER,
    payload: props || {}
});

export const hideHeader = () => ({
    type: actionTypes.HIDE_HEADER
});

export const initComplete = () => ({
    type: actionTypes.LOADED
});