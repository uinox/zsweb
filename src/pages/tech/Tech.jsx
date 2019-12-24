import React from 'react';
import { Link, Route,Switch,Redirect } from "react-router-dom";
import { Row, Col } from "antd";
import './Tech.less';

import Test1 from './test/Test1';
import Test2 from './test/Test2';
import Test3 from './test/Test3';
import Test4 from './test/Test4';

function  Tech(props){
    return (
        <div className="tech">
            <Row>
                <Col span={4}>
                    <div style={{borderRight:"2px solid #f2f4f8",height:"500px"}}>
                        <h1>Demo导航</h1>
                        <ul className="three-menu-list">
                            <li><Link to="/tech/test1">test1</Link></li>
                            <li><Link to="/tech/test2">test2-line</Link></li>
                            <li><Link to="/tech/test3">test3-loder-fbx</Link></li>
                            <li><Link to="/tech/test4">test3-loder-svg</Link></li>
                        </ul>
                    </div>
                </Col>
                <Col span={20}>
                    <h1>Demo内容</h1>
                    <div>
                        <Switch>
                            <Route path="/tech/test1" component={Test1}></Route>
                            <Route path="/tech/test2" component={Test2}></Route>
                            <Route path="/tech/test3" component={Test3}></Route>
                            <Route path="/tech/test4" component={Test4}></Route>
                            <Redirect to='/tech/test1'/>
                        </Switch>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Tech;
