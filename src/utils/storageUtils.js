import store from 'store'
const NAME = 'name';
export default {
    //保存user
    saveUser (user){
        store.set(NAME,user);
    },
    //读取user
    getUser() {
        return store.get(NAME)||{};
    },

    //删除user
    removeUser(){
        store.remove(NAME);
    }
}