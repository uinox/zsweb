import {
    ACTION_SET_LOGIN_USER,
    ACTION_SET_IS_LOGIN_VISIBLE,
    ACTION_SET_IS_REGISTER_VISIBLE,

    ACTION_SET_CATEGORIES,
    ACTION_SET_TOPICS,
} from './actions-types';

export default {
    loginUser(state='',action){
        const {type,payload} = action;
        switch (type) {
            case ACTION_SET_LOGIN_USER:
                return payload;
            default:
        }
        return state;
    },
    categories(state=[],action){
        const {type,payload} = action;
        switch (type) {
            case ACTION_SET_CATEGORIES:
                return payload;
            default:
        }
        return state;
    },
    topics(state=[],action){
        const {type,payload} = action;
        switch (type) {
            case ACTION_SET_TOPICS:
                return payload;
            default:
        }
        return state;
    },
    isLoginVisible(state = false,action){
        const {type, payload} = action;
        switch (type) {
            case ACTION_SET_IS_LOGIN_VISIBLE:
                
                return payload;
        
            default:
        }

        return state;
    },
    isRegisterVisible(state=false,action){
        const {type,payload} = action;
        switch (type) {
            case ACTION_SET_IS_REGISTER_VISIBLE:
                return payload;
            default:
        }

        return state;
    }
};
