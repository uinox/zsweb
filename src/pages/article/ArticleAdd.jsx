import React, {Component} from "react";
import {Form,Input,Select,Button,Spin} from 'antd';
import './ArticleAdd.less';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css'
import {reqCategories} from "../../api";

const { Option } = Select;

class ArticleAdd extends Component {

    state = {
        categories:[],
        loading: false
    };
    getCategories = async ()=>{
        const result = await reqCategories();
        if (result) {
            this.setState({categories: result});
        }
    };

    componentDidMount () {
        //获取分类列表
        this.getCategories();

        // 异步设置编辑器内容
        setTimeout(() => {
            this.props.form.setFieldsValue({
                content: BraftEditor.createEditorState('')
            })
        }, 1000);

    }

    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({loading:true});
                let formData = new FormData();
                formData.append('attachment',this.refs.attachment.files[0]);
                formData.append('title',values.title);
                formData.append('category',values.select);
                formData.append('content',values.content.toHTML());
                formData.append('label',values.label);

                fetch("/apis/topicat/add",{
                    method:"POST",
                    body:formData

                }).then(res=>res.json())
                .then(result=>{
                    if(result.Code === "200"){
                        this.props.history.push('/article');
                    }
                });
            }
        });
    };

    myUploadFn = (param) => {

        const serverURL = '/apis/upload';
        const xhr = new XMLHttpRequest();
        const fd = new FormData();

        const successFn = (response) => {
            // 假设服务端直接返回文件上传后的地址
            // 上传成功后调用param.success并传入上传后的文件地址
            param.success({
                url: JSON.parse(xhr.responseText),
                /*meta: {
                    id: 'xxx',
                    title: 'xxx',
                    alt: 'xxx',
                    loop: true, // 指定音视频是否循环播放
                    autoPlay: true, // 指定音视频是否自动播放
                    controls: true, // 指定音视频是否显示控制栏
                    // poster: 'http://xxx/xx.png', // 指定视频播放器的封面
                    poster: /attachment/+xhr.responseText.Message, // 指定视频播放器的封面
                }*/
            });
        };

        const progressFn = (event) => {
            // 上传进度发生变化时调用param.progress
            param.progress(event.loaded / event.total * 100)
        };

        const errorFn = (response) => {
            // 上传发生错误时调用param.error
            param.error({
                msg: 'unable to upload.'
            })
        };

        xhr.upload.addEventListener("progress", progressFn, false);
        xhr.addEventListener("load", successFn, false);
        xhr.addEventListener("error", errorFn, false);
        xhr.addEventListener("abort", errorFn, false);

        fd.append('attachment', param.file);
        xhr.open('POST', serverURL, true);
        xhr.send(fd)

    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const {categories} = this.state;

        const controls = [

            'undo', 'redo', 'separator',
            'font-size', 'line-height', 'letter-spacing', 'separator',
            'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
            'superscript', 'subscript', 'remove-styles', 'emoji',  'separator', 'text-indent', 'text-align', 'separator',
            'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
            'link', 'separator', 'hr', 'separator',
            'media', 'separator',
            'clear'
            // ,

           /* 'bold', 'italic', 'underline', 'text-color', 'separator',
            'link', 'separator', 'media'*/
        ];

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                md: { span: 24  },
            },
            wrapperCol: {
                xs: { span: 24 },
                md: { span: 24 },
            },
        };

        return (
            <div className="article-add">
                <Spin spinning={this.state.loading} size="large">
                    <h3 style={{textAlign:'center'}}>添加文章</h3>
                    <Form className="article-add-form" {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item label="标题" >
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: '请输入标题!', whitespace: true }],
                            })(<Input placeholder="请输入标题!"/>)}
                        </Form.Item>
                        <Form.Item label="分类" hasFeedback>
                            {getFieldDecorator('select', {
                                rules: [{ required: true, message: 'Please select your country!' }],
                            })(
                                <Select
                                    showSearch
                                    placeholder="请选择分类"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {
                                        categories.map((cate)=>{
                                            return (
                                                <Option key={cate.Id} value={cate.Title} >{cate.Title}</Option>
                                            )
                                        })
                                    }
                                </Select>,
                            )}
                        </Form.Item>
                        <Form.Item label="标签" >
                            {getFieldDecorator('label', {
                                rules: [{ required: true, message: '请输入标签!' }],
                            })(<Input placeholder="请输入标签!"/>)}
                        </Form.Item>
                        <Form.Item  label="文章正文">
                            {getFieldDecorator('content', {
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: true,
                                    validator: (_, value, callback) => {
                                        if (value.isEmpty()) {
                                            callback('请输入正文内容')
                                        } else {
                                            callback()
                                        }
                                    }
                                }],
                            })(
                                <BraftEditor
                                    className="my-editor"
                                    controls={controls}
                                    placeholder="请输入正文内容"
                                    media={{uploadFn: this.myUploadFn}}
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="文件" >

                            <input className="article-add-file" type="file" ref="attachment"/>
                        </Form.Item>
                        <Form.Item style={{textAlign:"center"}}>
                            <Button type="primary" htmlType="submit" block>
                                添加文章
                            </Button>
                        </Form.Item>

                    </Form>
                </Spin>
            </div>
        )
    }
}

const WrappedArticleAdd = Form.create({ name: 'validate_other' })(ArticleAdd);

export default WrappedArticleAdd;