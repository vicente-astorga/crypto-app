import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
// import  store  from './store';
import App from './App';
import './index.css';
import mainStore from './store';
const store = mainStore()

const container = document.getElementById('root');
const root = createRoot(container);


root.render(
  <React.StrictMode>
    <Provider store={store}>
    <Router>
      <App />
      </Router>
    </Provider>
  </React.StrictMode>
);