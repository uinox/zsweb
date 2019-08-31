import React from 'react';
import {reqRegister} from "../../api";
import './Register.less'

import {
    Form,
    Input,
    Button,
    message, Spin,
} from 'antd';

class RegisterForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        loading: false,
    };



    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                this.setState({ loading: true });
                const {name,email,password} = values;
                const data={'name':name,'email':email,'password':password};

                const result = await reqRegister(data);

                if(result){
                    this.setState({ loading: false });
                    if(result.Code === "301"){
                        message.error('此用户名已存在');
                    }else if(result.Code === "304"){
                        message.error('注册失败');
                    }else if(result.Code === "200"){
                       
                        message.success('注册成功，请登录!');
                        this.props.history.replace('/login');
                    }
                }

            }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('密码不一致!');
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
                sm: { span: 24 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 24 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 24,
                    offset: 0,
                },
            },
        };

        return (
            <div className="register">
                <Form {...formItemLayout} onSubmit={this.handleSubmit} className="register-form">
                    <Form.Item
                        label={
                            <span>
                            姓名
                        </span>
                        }
                    >
                        {getFieldDecorator('name', {
                            rules: [
                                { required: true, message: '请输入您的姓名!', whitespace: true },
                                { min: 4, message: '用户名至少4位' },
                                { max: 12, message: '用户名最多12位' },
                                { pattern:/^[a-zA-Z0-9_]+$/,message:'用户名必须是英文、数字或下划线组成'},
                            ],
                        })(<Input/>)}
                    </Form.Item>
                    <Form.Item label="邮箱">
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    type: 'email',
                                    message: '邮箱格式不符!',
                                },
                                {
                                    required: true,
                                    message: '请输入您的邮箱!',
                                },
                            ],
                        })(<Input/>)}
                    </Form.Item>
                    <Form.Item label="密码" hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入您的密码!',
                                },
                                { min: 6, message: '用户名至少6位' },
                                { max: 12, message: '用户名最多12位' },
                                { pattern:/^[a-zA-Z0-9_]+$/,message:'用户名必须是英文、数字或下划线组成'},
                                {
                                    pattern:/^[a-zA-Z0-9_]+$/,
                                    message:'用户名必须是英文、数字或下划线组成'
                                },
                                {
                                    validator: this.validateToNextPassword,
                                },
                            ],
                        })(<Input.Password/>)}
                    </Form.Item>
                    <Form.Item label="确认密码" hasFeedback>
                        {getFieldDecorator('confirm', {
                            rules: [
                                {
                                    required: true,
                                    message: '请确认您的密码!',
                                },
                                {
                                    validator: this.compareToFirstPassword,
                                },
                            ],
                        })(<Input.Password onBlur={this.handleConfirmBlur}/>)}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Spin spinning={this.state.loading} delay={500}>
                            <Button type="primary" htmlType="submit" block>
                                注册
                            </Button>
                        </Spin>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const Register = Form.create({ name: 'register' })(RegisterForm);

export default Register;
