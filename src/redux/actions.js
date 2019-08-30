import {
    ACTION_SET_IS_LOGIN_VISIBLE,
    ACTION_SET_IS_REGISTER_VISIBLE,

    ACTION_SET_CATEGORIES,
    ACTION_SET_TOPICS,
} from "./actions-types";

export function setCategories(categories){
    return {
        type:ACTION_SET_CATEGORIES,
        payload:categories,
    }
}
export function setTopics(topics){
    return {
        type:ACTION_SET_TOPICS,
        payload:topics,
    }
}

export function toggleIsLoginVisible(isLoginVisible){

    return {
            type:ACTION_SET_IS_LOGIN_VISIBLE,
            payload:isLoginVisible,
    }
}

export function toggleIsRegisterVisible(isRegisterVisible){
    return {
            type:ACTION_SET_IS_REGISTER_VISIBLE,
            payload:isRegisterVisible,
    }
}