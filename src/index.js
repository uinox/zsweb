import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import storageUtils from "./utils/storageUtils";
import memoryUtils from "./utils/memoryUtils";

const user = storageUtils.getUser();
memoryUtils.user = user;

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
