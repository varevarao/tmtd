import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../components/header';
import Loader from '../components/loader';
import ProductModal from '../components/product-modal';
import Pages from '../pages';
import initializeStore from '../store/index';
import '../styles/app.scss';
import setupClientStores from '../store/actions';

const store = initializeStore();
setupClientStores(store);

const App = () => (
  <div className="app">
    <Provider store={store}>
      <Router>
        <Header />
        <Pages />
        <ProductModal />
        <Loader />
      </Router>
    </Provider>
  </div>
)

export default App;