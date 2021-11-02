import React from 'react';
import ReactDOM from 'react-dom';
import Root from "./views/root/Root";
import reportWebVitals from './reportWebVitals';

// router
import {BrowserRouter as Router} from "react-router-dom";

// redux
import {Provider} from 'react-redux';
import {PersistGate} from "redux-persist/integration/react";
import {store, persistor} from "./redux";

// helmet provider
import {HelmetProvider} from "react-helmet-async";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HelmetProvider>
          <Router>
            <Root />
          </Router>
        </HelmetProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
