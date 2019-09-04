import React, {Component} from 'react';
import {Button, Form, Input, Table, Icon, Row, Col, Modal} from 'antd';
import {reqCategories,reqAddCategories,reqRemoveCategories} from '../../api/index';
import LinkButton from "../../component/link-button";
import memoryUtils from "../../utils/memoryUtils";
import './Category.less';
const { Column} = Table;
const { confirm } = Modal;

class Category extends Component{

    state={
      categories:[],
      time:Date.now(),
      getCate:false,
    };

    getCategories =async ()=>{
        const result =await reqCategories();
        if (result){
            this.setState({categories:result});
        }
    };

    addCategories = async (cate,type) => {
        const result = await reqAddCategories(cate,type);
        if (result) {
            this.setState({categories: result});
        }
    };
    deleteCategories =async (cateId,type) =>{
        const result = await reqRemoveCategories(cateId,type);
        if (result) {
            this.setState({categories: result});
        }
    };
    goLogin(){
        confirm({
            title: '提示',
            okText:'登录',
            cancelText:'取消',
            content: '请先登录！',
            onOk: ()=> {

                this.props.history.replace("/login")
            },
            onCancel() {
                // console.log('取消');
            },
        });

    }
    handleDeleteCate = (id)=>{
        const {username} = memoryUtils.user;
        if(!username){
            this.goLogin()
        }else {
            this.deleteCategories(String(id), 'del');
        }
    };

    handleSubmit =(e)=>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {cate} = values;
                const {username} = memoryUtils.user;
                if(!username){
                    this.goLogin()
                }else {
                    this.addCategories(cate, 'add');
                }
            }
        });
    };

    componentDidMount =() =>{
        this.getCategories();

    };

    render(){
        const { getFieldDecorator } = this.props.form;
        const {categories} = this.state;

        return (
            <div className="category">
                <Form onSubmit={this.handleSubmit} className='category-form'>
                    <Form.Item className='category-form-item'>
                        <Row>
                            <Col span={15}>
                                {getFieldDecorator('cate', {
                                    rules: [
                                        { required: true, message: '请输入类名!' },
                                        { min:2,message:'类名至少两位'},
                                        { max:10,message:'类名至多十位'},
                                        { pattern:/[\u4e00-\u9fa5]/,message:'用户名必须是中文'}
                                    ],
                                })(
                                    <Input
                                        className='category-form-item-input'
                                        placeholder="请输入类名"
                                    />,
                                )}
                            </Col>
                            <Col span={9}  className="category-form-col">
                                <Button type="primary" htmlType="submit" className="category-form-col-button">
                                    <Icon type='plus' />添加
                                </Button>
                            </Col>
                        </Row>

                    </Form.Item>
                </Form>

                <Table
                    align="center"
                    dataSource={categories}
                    rowKey={record => record.Id}
                >
                    <Column align="center" title="序号" dataIndex="Id" key="Id"
                        render={(text,record,index)=>`${index+1}`}
                    />
                    <Column align="center" title="类名" dataIndex="Title" key="Title" />
                    <Column align="center" title="文章总数" dataIndex="TopicCount" key="TopicCount"/>
                    <Column align="center" title="操作" key="action"
                        render={(dataIndex) => (
                            <LinkButton onClick={()=>this.handleDeleteCate(dataIndex.Id)}>
                                删除
                            </LinkButton>
                        )}
                    />
                </Table>

            </div>
        );
    }
}
Category = Form.create({})(Category);

export default Category;
