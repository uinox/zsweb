import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

import Login from "./pages/login/Login";
import Admin from "./pages/admin/Admin";
import Register from "./pages/login/Register";

if(navigator.userAgent.indexOf('MSIE 9.0') !== -1){
    alert("你的浏览器版本过低,请下载最新版本,或使用谷歌浏览器体验最好的效果");
    window.location.href = 'https://www.google.cn/intl/zh-CN/chrome/';
}

function App(){
  return (
    <BrowserRouter>
        <Switch>
            <Route path='/' exact component={Admin} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
        </Switch>

    </BrowserRouter>
  );
}

export default App;