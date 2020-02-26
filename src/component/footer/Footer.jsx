import React from 'react';
import {Row, Col} from 'antd';

import "./Footer.less";

function Footer() {
    return (
        <footer className="footer">
                <Row className="foot">
                    <Col xs={24} sm={5} md={5} lg={5} xl={5} xxl={5}>
                        <p>@2017-2019</p>
                    </Col>
                    <Col xs={24} sm={14} md={14} lg={14} xl={14} xxl={14}>
                        <a href="http://www.beian.miit.gov.cn">京ICP备案17049124号-1</a>
                    </Col>
                    <Col xs={24} sm={5} md={5} lg={5} xl={5} xxl={5}>
                        <p>版权所有</p>
                    </Col>
                </Row>
        </footer>
    );
}

export default Footer;
