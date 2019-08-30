import React from 'react';
import './Register.less'

import {
    Form,
    Input,
    Button,
} from 'antd';

class RegisterForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                this.toLogin()
            }
        });
    };
    toLogin = () => {
        const {toggleIsLoginVisible,toggleIsRegisterVisible} =this.props;
        toggleIsLoginVisible(true);
        toggleIsRegisterVisible(false);
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    handleWebsiteChange = value => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 18,
                    offset: 3,
                },
            },
        };

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit} className="register-form-modal">
                <Form.Item
                    label={
                        <span>
                            姓名
                        </span>
                    }
                >
                    {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                    })(<Input style={{width:'80%'}}/>)}
                </Form.Item>
                <Form.Item label="邮箱">
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ],
                    })(<Input style={{width:'80%'}}/>)}
                </Form.Item>
                <Form.Item label="密码" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                validator: this.validateToNextPassword,
                            },
                        ],
                    })(<Input.Password style={{width:'80%'}}/>)}
                </Form.Item>
                <Form.Item label="确认密码" hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            {
                                validator: this.compareToFirstPassword,
                            },
                        ],
                    })(<Input.Password onBlur={this.handleConfirmBlur} style={{width:'80%'}}/>)}
                </Form.Item>
                <Form.Item label="手机号码">
                    {getFieldDecorator('phone', {
                        rules: [{ required: false, message: 'Please input your phone number!' }],
                    })(<Input style={{width:'80%'}}/>)}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" block>
                        注册
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const Register = Form.create({ name: 'register' })(RegisterForm);

export default Register;
