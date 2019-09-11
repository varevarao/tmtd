import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import AppModal from '../components/app-modal';
import Header from '../components/header';
import Loader from '../components/loader';
import Pages from '../pages';
import setupClientStores from '../store/actions';
import initializeStore from '../store/index';
import '../styles/app.scss';

const store = initializeStore();
setupClientStores(store);

const App = () => (
  <div className="app">
    <Provider store={store}>
      <Router>
        <Header />
        <Pages />
        <AppModal />
        <Loader />
      </Router>
    </Provider>
  </div>
)

export default App;