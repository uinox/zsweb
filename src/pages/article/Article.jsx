import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {Card, Table,Button,Icon} from "antd";
import LinkButton from "../../component/link-button";
import {reqGetTopics,reqDeleteTopic} from "../../api/index";

import './Article.less'

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

    deleteTopic = async (id) => {
        const result = await reqDeleteTopic(id);
        if(result.Code === "200"){
            this.getTopics();
        }
    };

    componentDidMount = () => {
        this.getTopics();
    };

    render(){
        const topics = this.state.topics;

        return (
            <Card className="article-card" title="文章列表" extra={
                <Button type="primary">
                    <Link to="/article/add">
                        <Icon type="plus" />新增
                    </Link>

                </Button>
            }>
                <div style={{width:'100%',overflow:'auto'}}>
                    <Table className="article-card-table"
                           bordered
                           align="center"
                           dataSource={topics}
                           rowKey={record => record.Id}
                    >
                        <Column align="center" title="#" dataIndex="Id" key="Id"
                                render={(text,record,index)=>`${index+1}`}
                        />
                        <Column align="center" title="标题" dataIndex="Title" key="action1"
                                render = {(dataIndex,content)=>(
                                    <Link to={`/article/view?tid=${content.Id}`}>
                                        {dataIndex}
                                    </Link>
                                )}
                        />
                        <Column align="center" title="更新时间" dataIndex="Updated" key="Updated"/>
                        <Column align="center" title="浏览数" dataIndex="Views" key="Views"/>
                        <Column align="center" title="评论数" dataIndex="ReplyCount" key="ReplyCount"/>
                        <Column align="center" title="最后评论时间" dataIndex="ReplyTime" key="ReplyTime"/>
                        <Column align="center" title="操作" key="action"
                                render={(dataIndex,context) => (
                                    <div>
                                        <Link to={`/article/edit?tid=${context.Id}`} style={{marginRight:'20px'}}>
                                            编辑
                                        </Link>
                                        <LinkButton onClick={()=>this.deleteTopic(context.Id)}>
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
