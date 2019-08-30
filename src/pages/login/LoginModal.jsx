import React from 'react';
import {Input,Icon,Button,Form} from 'antd';

import './Login.less';

class Login extends React.Component {


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    toRegister = () => {
        const {toggleIsLoginVisible,toggleIsRegisterVisible} =this.props;
        toggleIsLoginVisible(false);
        toggleIsRegisterVisible(true);
    };

    render(){
        const { getFieldDecorator } = this.props.form;
        // const {onCancel} =this.props;

        return (
            <Form onSubmit={this.handleSubmit} className="login-form-modal">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="请输入用户名"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="请输入密码"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {/*<div style={{overflow:"hidden"}}>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>记住密码</Checkbox>)}
                        <a className="login-form-forgot" href="/" style={{float:"right",paddingRight:"10px"}}>
                            忘记密码
                        </a>
                    </div>*/}

                    <Button type="primary" htmlType="submit" className="login-form-button" block>
                        登录
                    </Button>
                    <div><span onClick={this.toRegister}>注册</span></div>
                </Form.Item>
            </Form>
        );
    }
}

Login = Form.create({})(Login);

export default Login;
