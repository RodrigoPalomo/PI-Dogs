import React from 'react';
// import ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store/index";

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render (
  // proveedor
  <Provider store= {store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
