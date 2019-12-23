import React from 'react';
import { Link, Route,Switch,Redirect } from "react-router-dom";
import { Row, Col } from "antd";
import './Tech.less';

import Test from './test/Test';
import Test1 from './test/Test1';

function  Tech(props){
    return (
        <div className="tech">
            <Row>
                <Col span={4}>
                    <div style={{borderRight:"2px solid #f2f4f8",height:"500px"}}>
                        <h1>导航</h1>
                        <ul>
                            <li><Link to="/tech/test1">test</Link></li>
                            {/* <li><Link to="/tech/test2">阿斯顿发</Link></li>
                            <li><Link to="/tech/test3">阿斯顿发</Link></li>
                            <li><Link to="/tech/test4">阿斯顿发</Link></li>
                            <li><Link to="/tech/test5">阿斯顿发</Link></li>
                            <li><Link to="/tech/test6">阿斯顿发</Link></li>
                            <li><Link to="/tech/test7">阿斯顿发</Link></li>
                            <li><Link to="/tech/test">阿斯顿发</Link></li>
                            <li><Link to="/tech/test">阿斯顿发</Link></li>
                            <li><Link to="/tech/test">阿斯顿发</Link></li>
                            <li><Link to="/tech/test">阿斯顿发</Link></li>
                            <li><Link to="/tech/test">阿斯顿发</Link></li>
                            <li><Link to="/tech/test">阿斯顿发</Link></li>
                            <li><Link to="/tech/test">阿斯顿发</Link></li>
                            <li><Link to="/tech/test">阿斯顿发</Link></li>
                            <li><Link to="/tech/test">阿斯顿发</Link></li>
                            <li><Link to="/tech/test">阿斯顿发</Link></li>
                            <li><Link to="/tech/test">阿斯顿发</Link></li>
                            <li><Link to="/tech/test">阿斯顿发</Link></li> */}
                            <li><Link to="/tech/test">test1</Link></li>
                        </ul>
                    </div>
                </Col>
                <Col span={20}>
                    <h1>threejs-test</h1>
                    <div>
                        <Switch>
                            <Route path="/tech/test" component={Test}></Route>
                            <Route path="/tech/test1" component={Test1}></Route>
                            {/* <Route path="/tech/test2" component={Test}></Route>
                            <Route path="/tech/test3" component={Test}></Route>
                            <Route path="/tech/test4" component={Test}></Route>
                            <Route path="/tech/test5" component={Test}></Route>
                            <Route path="/tech/test6" component={Test}></Route>
                            <Route path="/tech/test7" component={Test}></Route> */}
                            <Redirect to='/tech/test'/>
                        </Switch>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Tech;
