import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createStore, applyMiddleware } from 'redux';
//import thunk from 'redux-thunk';
import thunk from './myThunk';
import rootReducer from './reducers';
const root = ReactDOM.createRoot(document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// createStore的时候传入thunk中间件
const store = createStore(rootReducer, applyMiddleware(thunk));

// 发起网络请求的方法
function fetchSecretSauce() {
  return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        console.log('ok...');
        resolve('ok')
      },10000)
  });
}

// 下面两个是普通的action
function makeASandwich(forPerson, secretSauce) {
  return {
    type: 'MAKE_SANDWICH',
    forPerson,
    secretSauce,
  };
}

function apologize(fromPerson, toPerson, error) {
  return {
    type: 'APOLOGIZE',
    fromPerson,
    toPerson,
    error,
  };
}

// 这是一个异步action，先请求网络，成功就makeASandwich，失败就apologize
function makeASandwichWithSecretSauce(forPerson) {
  return function (dispatch) {
    return fetchSecretSauce().then(
      (sauce) => dispatch(makeASandwich(forPerson, sauce)),
      (error) => dispatch(apologize('The Sandwich Shop', forPerson, error)),
    );
  };
}

function dispatchMakeASandwichWithSecretSauce(){
  // 最终dispatch的是异步action makeASandwichWithSecretSauce
  store.dispatch(
    makeASandwichWithSecretSauce('Me')
  ).then(() => {
    console.log("It works.")
  }, (error) => {
    console.log("Thunk works, but others not: " + error)
  });
}

root.render(
  <React.StrictMode>
    <App dispatchMake={dispatchMakeASandwichWithSecretSauce}/>
  </React.StrictMode>
);