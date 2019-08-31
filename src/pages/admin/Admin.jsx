import React, {Fragment} from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import './Admin.less';

import Header from '../../component/header/Header.jsx';
import Footer from '../../component/footer/Footer.jsx';
import Home from "../home/Home.jsx";
import Article from "../article/Article.jsx";
import Category from "../category/Category.jsx";
import Tech from "../tech/Tech.jsx";
import ArticleAdd from "../article/ArticleAdd";
import ArticleView from "../article/ArticleView";
import ArticleEdit from "../article/ArticleEdit";
import Youku from "../life/Youku";
import Toudu from "../life/Toudu";
import Glory from "../life/Glory";
import Lol from "../life/Lol";

function Admin(){
    return (
        <Fragment>
            <Header/>
            <div className="admin">
                <Switch>
                    <Route path='/' component={Home} />
                    <Route path='/home' component={Home} />
                    <Route path='/category' component={Category} />
                    <Route path='/article' >
                        <Switch>
                            <Route path='/article/add' component={ArticleAdd}/>
                            <Route path='/article/view' component={ArticleView}/>
                            <Route path='/article/edit' component={ArticleEdit}/>
                            <Route path='/article' component={Article}/>
                        </Switch>
                    </Route>
                    <Route path='/youku' component={Youku}/>
                    <Route path='/toudu' component={Toudu}/>
                    <Route path='/glory' component={Glory}/>
                    <Route path='/lol' component={Lol}/>
                    <Route path='/tech' component={Tech} />
                    <Redirect to='/'/>
                </Switch>
            </div>
            <Footer />
        </Fragment>
    );
}

export default Admin;
