import { hideLoader, initComplete, showLoader } from './ui';
import user from './user';

/**
 * Map of API's which support the initial state method
 */
const API_MAP = {
    user
}

/**
 * The method name invoked for setting up state
 */
const INIT_METHOD = 'setupInitialState';

/**
 * Wrapper method to invoke all the initial setup methods
 */
export default async function setupClientStores({ dispatch }) {
    console.log('Setting up client stores.');
    dispatch(showLoader());

    // Call the fetchInitData on each enabled api
    for (let key of Object.keys(API_MAP)) {
        // If there exists a setupInitialState action, call it
        if (INIT_METHOD in API_MAP[key]) await dispatch(API_MAP[key][INIT_METHOD].call(this));
        else {
            throw new Error(`Unsupported API mapping for ${key}. In case of new API, please check if the '${INIT_METHOD}' function is defined for this mapping.`);
        }
    }

    dispatch(initComplete());
    dispatch(hideLoader());
}