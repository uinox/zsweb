import React from 'react';
import {Link} from 'react-router-dom';
import {Input,Icon,Button,Form,Checkbox,message} from 'antd';

import './Login.less';
import {reqLogin} from "../../api";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";

class Login extends React.Component {

    handleSubmit = e => {
        //阻止事件默认行为
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                const {name,password} = values;
                const result = await reqLogin(name,password);
                const username = result.Name;
                if(result.Status === 200){
                    message.success('登录成功');
                    //保存data
                    memoryUtils.user={username};
                    storageUtils.saveUser({username});
                    //跳转到管理页面
                    this.props.history.replace('/')
                }else if(result.Status === 403){
                    this.props.form.setFields({
                        password: {
                          value: values.password,
                          errors: [new Error('密码错误')],
                        },
                    });
                }
            }
        });
    };
    validatePwd = (rule,value,callback)=>{
        if(!value){
            callback('密码必须输入');
        }else if(value.length<6){
            callback('密码长度不能小于6位');
        }else if(value.length>12){
            callback('密码长度不能大于12位');
        }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
            callback('密码必须是英文，数字或下划线组成');
        }else{
            callback(); //验证通过
        }
    };

    render(){
        const { getFieldDecorator } = this.props.form;
        // const {onCancel} =this.props;

        return (
            <div className="login">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('name', {
                            rules: [
                                { required: true, whitespace:true, message: '用户名必须输入!' },
                                { min: 4, message: '用户名至少4位' },
                                { max: 12, message: '用户名最多12位' },
                                { pattern:/^[a-zA-Z0-9_]+$/,message:'用户名必须是英文、数字或下划线组成'},
                            ],

                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="请输入用户名！"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    validator:this.validatePwd
                                }
                                ],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="请输入密码！"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <div style={{overflow:"hidden"}}>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>记住密码</Checkbox>)}
                            {/*<a className="login-form-forgot" href="/" style={{float:"right",paddingRight:"10px"}}>
                            忘记密码
                        </a>*/}
                        </div>

                        <Button type="primary" htmlType="submit" className="login-form-button" block>
                            登录
                        </Button>
                        <div>没有账号？请 <Link to="/register"><span>注册</span></Link> </div>
                    </Form.Item>
                </Form>
            </div>

        );
    }
}

Login = Form.create({})(Login);

export default Login;
