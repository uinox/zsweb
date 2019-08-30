import { createStore, combineReducers, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

export default createStore(
    combineReducers(reducers),
    {
        isLoginVisible: false,
        isRegisterVisible: false,

        categories:[],
        topics:[],
    },
    composeWithDevTools(applyMiddleware(thunk))
);
