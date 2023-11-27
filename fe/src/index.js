import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { HashRouter } from 'react-router-dom';
import { Routing } from './routing';
import { store } from './store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <HashRouter>
      <Routing />
    </HashRouter>
  </Provider>
);
