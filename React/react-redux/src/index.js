import React from 'react';
import ReactDOM from 'react-dom/client';
//import { Provider } from 'react-redux';
import { Provider } from './my-react-redux';
import store from './store'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import TestContext from './TestContext';
const setting = {
  color: '#d89151'
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <TestContext.Provider value={setting}>
        <App />
      </TestContext.Provider>
    </Provider>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
