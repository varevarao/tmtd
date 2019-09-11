import { combineReducers } from 'redux';
import user from './user';
import ui from './ui';

const ENV_DEV = process.env.NODE_ENV === 'development';

export const makeRootReducer = asyncReducers => {
	const defaults = {
		...asyncReducers,
		user,
		ui
	};

	if (ENV_DEV) {
		// defaults.errors = errorReducer;
	}

	return combineReducers(defaults);
}

export const injectReducer = (store, { key, reducer }) => {
	if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

	store.asyncReducers[key] = reducer;
	store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
