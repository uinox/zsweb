import React, {Component} from "react";
import {Form, Input, Select, Button, Spin} from 'antd';
import './ArticleEdit.less';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css'
import {reqCategories,reqEditTopic} from "../../api";

const { Option } = Select;

class ArticleAdd extends Component {

    state = {
        categories:[],
        topic:{},
        tid:null,
        loading: false
    };
    //获取参数
    getParam(name){
        const namestr = name.trim();
        const res = new RegExp("[\\?&]"+namestr+"=([^&#]*)").exec(this.props.location.search);
        if(res == null){
            return "";
        }else{
            return res[1];
        }
    }
    //获取分类列表
    getCategories =async ()=>{
        const result =await reqCategories();
        if (result) {
            this.setState({categories: result});
        }
    };

    //获取文章
    getTopicEdit = async (tid) =>{
       const result = await reqEditTopic(tid);
        if (result) {
            this.setState({topic: result});
        }
    };

    componentDidMount () {
        //获取分类列表
        this.getCategories();

        //获取文章
        const tid = this.getParam("tid");
        this.setState({tid:tid});

        this.getTopicEdit(tid);

        // 异步设置编辑器内容
        setTimeout(() => {
            this.props.form.setFieldsValue({
                content: BraftEditor.createEditorState(this.state.topic.Content)
            })
        }, 300)
        // this.setState({
        //     editorState:BraftEditor.createEditorState(topic.Content)
        // })


    }

    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({loading:true});
                let formData = new FormData();

                formData.append('tid',this.state.tid);
                formData.append('attachment',this.refs.attachment.files[0]);
                formData.append('title',values.title);
                formData.append('category',values.select);
                formData.append('content',values.content.toHTML());
                formData.append('label',values.label);
                fetch("/apis/topicat/edit",{
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


    render() {
        const { getFieldDecorator } = this.props.form;
        const {categories} = this.state;
        const {Labels,Title,Content,Category,Attachment} = this.state.topic;

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
                    <h3 style={{textAlign:'center'}}>修改文章</h3>
                    <Form className="article-add-form" {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item label="标题" >
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: '请输入标题!', whitespace: true }],
                                initialValue:Title
                            })(<Input placeholder="请输入标题"/>)}
                        </Form.Item>
                        <Form.Item label="分类" hasFeedback>
                            {getFieldDecorator('select', {
                                rules: [{ required: true, message: 'Please select your country!' }],
                                initialValue:[Category]
                            })(
                                <Select
                                    // defaultValue="前端"
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
                                initialValue:Labels
                            })(<Input  placeholder='请输入标签!'/>)}
                        </Form.Item>
                        <Form.Item  label="文章内容">
                            {getFieldDecorator('content', {
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: true,
                                    validator: (_, value, callback) => {
                                        if (value.isEmpty()) {
                                            callback('请输入内容')
                                        } else {
                                            callback()
                                        }
                                    }
                                }],
                                initialValue:{Content}
                            })(
                                <BraftEditor
                                    className="my-editor"
                                    controls={controls}
                                    placeholder="请输入内容！"
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="文件" >
                            {Attachment&& <img src={`/attachment/${Attachment}`} style={{width:"100px"}} alt=""/>}
                            <input className="article-edit-file" type="file" ref="attachment"/>
                        </Form.Item>
                        <Form.Item style={{textAlign:"center"}}>
                            <Button type="primary" htmlType="submit">
                                修改
                            </Button>
                        </Form.Item>
                        <div>
                        </div>
                    </Form>
                </Spin>
            </div>
        )
    }
}

const WrappedArticleAdd = Form.create({ name: 'validate_other' })(ArticleAdd);

export default WrappedArticleAdd;