import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import makeRootReducer from './reducers/index';

const ENV_DEV = process.env.NODE_ENV === 'development';

export default (initialState = {}) => {
    // ======================================================
    // Middleware Configuration
    // ======================================================
    let middleware = [thunk]

    // ======================================================
    // Store Enhancers
    // ======================================================
    const enhancers = []

    let composeEnhancers = compose

    if (ENV_DEV && !!process.browser) {
        // Execute this only in dev mode, on the client
        const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        if (typeof composeWithDevToolsExtension === 'function') {
            composeEnhancers = composeWithDevToolsExtension
        }
    }

    // ======================================================
    // Store Instantiation and HMR Setup
    // ======================================================
    const store = createStore(
        makeRootReducer(),
        initialState,
        composeEnhancers(
            applyMiddleware(...middleware),
            ...enhancers
        )
    )
    store.asyncReducers = {}

    if (module.hot) {
        module.hot.accept('./reducers/index', () => {
            const reducers = require('./reducers/index').default
            store.replaceReducer(reducers(store.asyncReducers))
        })
    }

    return store
}