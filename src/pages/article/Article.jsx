import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {Card, Table,Button,Icon, Modal, message} from "antd";
import LinkButton from "../../component/link-button";
import {reqGetTopics,reqDeleteTopic} from "../../api/index";
import {formatStr} from '../../utils/dataUtils';

import './Article.less'
import memoryUtils from "../../utils/memoryUtils";
const { confirm } = Modal;

const { Column} = Table;

class Article extends Component {

    state = {
        topics:[],
    };

    getTopics = async ()=>{
        const result = await reqGetTopics();
        if (result) {
            this.setState({topics: result.reverse()});
        }
    };

    deleteTopic = async (id,author) => {
        const {username} = memoryUtils.user;
        if(!username){
            this.goLogin()
        }else if(username !== author){
            message.error("您非作者本人，没有操作权限")
        }else{
            const result = await reqDeleteTopic(id);
            if(result.Code === "200"){
                this.getTopics();
            }
        }

    };

    addTopic = () => {
        const {username} = memoryUtils.user;
        if(!username){
            this.goLogin()
        }else{
            this.props.history.push('/article/add')
        }


    };
    editTopic = (id,author) => {
        const {username} = memoryUtils.user;
        console.log(id);
        if (!username) {
            this.goLogin()
        } else if (username !== author) {
            message.error("您非作者本人，没有权限")
        }else{
            this.props.history.push(`/article/edit?tid=${id}`)
        }
    };

    componentDidMount = () => {
        this.getTopics();
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

    render(){
        const topics = this.state.topics;

        return (
            <Card className="article-card" title="文章列表" extra={
                <Button type="primary" onClick={this.addTopic}>
                    <Icon type="plus" />新增
                </Button>
            }>
                <div style={{width:'100%',overflow:'auto'}}>
                    <Table className="article-card-table"
                           // bordered
                           align="center"
                           dataSource={topics}
                           rowKey={record => record.Id}
                    >
                        <Column width="10%" align="center" title="#" dataIndex="Id" key="Id"
                                render={(text,record,index)=>`${index+1}`}
                        />
                        <Column width="25%" align="left" title="标题" dataIndex="Title" key="action1"
                                render = {(dataIndex,content)=>(
                                    <Link to={`/article/view?tid=${content.Id}`}>
                                        {dataIndex}
                                    </Link>
                                )}
                        />
                        <Column width="25%" align="center" title="更新时间" dataIndex="Updated" key="Updated"
                            render = {(dataIndex,content)=>(
                                <span>{formatStr(content.Updated)}</span>
                            )}
                        />
                        <Column width="10%" align="center" title="浏览数" dataIndex="Views" key="Views"/>
                        <Column width="10%" align="center" title="评论数" dataIndex="ReplyCount" key="ReplyCount"/>
                       {/* <Column width="20%" align="center" title="最后评论时间" dataIndex="ReplyTime" key="ReplyTime"
                            render = {(dataIndex,content)=>(
                                <span>{formatStr(content.ReplyTime)}</span>
                            )}
                        />*/}
                        <Column width="20%" align="center" title="操作" key="action"
                                render={(dataIndex,context) => (
                                    <div>
                                        <LinkButton onClick={()=>this.editTopic(context.Id,context.Author)}>
                                            编辑
                                        </LinkButton>&nbsp;
                                        <LinkButton onClick={()=>this.deleteTopic(context.Id,context.Author)}>
                                            删除
                                        </LinkButton>
                                    </div>
                                )}
                        />
                    </Table>
                </div>

            </Card>
        );
    }
}

export default Article;
