import React, {useState} from 'react';
import {Link,withRouter} from 'react-router-dom';
import {Row, Col,Menu,Input,Modal} from 'antd';
import './Header.less';
import logo from '../../mitgo.svg';
import memoryUtils from "../../utils/memoryUtils";

import LinkButton from '../link-button';
import storageUtils from "../../utils/storageUtils";

// import MenuList from '../config/menuConfig';

const { Search } = Input;
// const { SubMenu } = Menu;

function Header(props) {

    const menuNodes = (MenuList) =>{
        // console.log(props.location.pathname);
    };
    const [logOut,setLogOut] = useState(false);

    let path = props.location.pathname;
    if(path.match(/\/\w+/) ){
        path = path.match(/\/\w+/)[0];
    }

    const handle = (e)=>{
        path = e.key;
    };

    const logout =()=>{
        Modal.confirm({
            title:'提示',
            content:'您确认退出吗？',
            okText:'确认',
            cancelText:'取消',
            onOk:()=>{
                //删除保存的user数据
                storageUtils.removeUser();
                memoryUtils.user = {};
                setLogOut(!logOut);
            }
        })
    };

    const {username} = memoryUtils.user;

    return (
        <header className="header">
            <Row className="menu">
                <Col xs={0} sm={3} md={2} lg={1} xl={1} xxl={1}>
                    <img className="logo" src={logo} alt={"mitgo"}/>
                </Col>
                <Col xs={18} sm={10} md={12} lg={13} xl={14} xxl={15}>
                    <Menu
                        onClick={handle}
                        selectedKeys={[path]}
                        // defaultOpenKeys={[]}
                        mode="horizontal"
                    >
                        {
                            menuNodes()
                        }
                        <Menu.Item key="/home">
                            <Link to="/">首页</Link>
                        </Menu.Item>
                        <Menu.Item key="/category">
                            <Link to="/category">分类</Link>
                        </Menu.Item>
                        <Menu.Item key="/article">
                            <Link to="/article">文章</Link>
                        </Menu.Item>
                        <Menu.Item key="/tech">
                            <Link to="/tech">视频</Link>
                        </Menu.Item>
                    </Menu>
                </Col>
                <Col xs={0} sm={5} md={4} lg={5} xl={5} xxl={5}>
                    <Search className="search" placeholder="请输入" size="small" onSearch={value => console.log(value)} />
                </Col>
                <Col xs={6} sm={6} md={6} lg={5} xl={4} xxl={3}>
                    {
                        username?
                            <div className="header-user">
                                欢迎:<span className="header-user-name">{username}</span>
                                <LinkButton onClick={logout}>退出</LinkButton>
                            </div>
                            :
                            <div className="header-user">
                                <Link className="header-user-login" to="/login">登陆</Link>
                                <Link to="/register">注册</Link>
                            </div>
                    }
                </Col>
            </Row>
        </header>
    );
}

export default withRouter(Header);