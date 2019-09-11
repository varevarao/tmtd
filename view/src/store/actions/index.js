import { hideLoader, initComplete, showLoader } from './ui';
import { setupInitialState as user } from './user';

/**
 * Map of API's which support the initial state method
 */
const API_MAP = {
    user
}

/**
 * Wrapper method to invoke all the initial setup methods
 */
export default async function setupClientStores({ dispatch }) {
    // console.log('Setting up client stores.');

    try {
        dispatch(showLoader());

        // Call the fetchInitData on each enabled api
        for (let key of Object.keys(API_MAP)) {
            // If there exists a setupInitialState action, call it
            await dispatch(API_MAP[key].call(this));
        }

        dispatch(initComplete());
    } catch (err) {
        console.error('Error during initial store setup', err);
    } finally {
        // console.log('Done.');
        dispatch(hideLoader());
    }
}