import React,{Component} from "react";
import {Tooltip,Icon,Comment,Avatar,Row,Col,Card,Button,Calendar,List,Input,Form} from "antd";
import './ArticleView.less';
import memoryUtils from "../../utils/memoryUtils";
import LinkButton from "../../component/link-button";
import {reqViewTopic,reqAddReply,reqDeleteReply} from "../../api";
import {formatStr} from '../../utils/dataUtils';

// import moment from 'moment';

const { TextArea } = Input;




class ArticleView extends Component {

    state = {
        topic:{},
        tid:null,
        replies:[],
        username:null,
        submitting: false,
        value: '',
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

    //获取文章和评论
    getTopicView = async (tid) =>{
        const result = await reqViewTopic(tid);
        if(result){
            this.setState({topic:result.Topic});
            this.setState({replies:result.Replies.reverse()});
        }
    };

    //添加评论
    addReply = async (reply) =>{
        const result = await reqAddReply(reply);
        if(result){
            this.setState({replies:result.reverse()})
        }
    };

    //删除评论
    deleReply = async (tid,rid) =>{
        const result = await reqDeleteReply(tid,rid);
        if(result){
            this.setState({replies:result.reverse()});
        }
    };


    componentDidMount = () => {
        //获取文章
        const tid = this.getParam("tid");
        this.setState({tid:tid});

        this.getTopicView(tid);

        //获取用户名
        const {username} = memoryUtils.user;
        this.setState({username:username})
    };


    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }

        const reply = {
            "tid":this.state.topic.Id,
            "nickname":this.state.username,
            "content":this.state.value,
        };

        this.addReply(reply);

        this.setState({
            value: null,
        });

    };

    handleChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        const { topic,replies, submitting, value,username } = this.state;
        return (
            <Row>
                <Col xs={0} md={8} lg={6}>
                    <Card  className="article-view-user" title={
                        <div>
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <LinkButton style={{marginLeft:"10px"}}>{username}</LinkButton>
                        </div>

                    } extra={<Button type="primary" style={{ height:"20px",lineHeight:"18px" }}>关注</Button>}>
                        <ul className="article-view-user-basic" style={{display:"flex",alignItems:"center",}}>
                            <li>
                                <LinkButton style={{width:"14px"}}>博文</LinkButton>
                                <p style={{fontSize:"12px"}}>10</p>
                            </li>
                            <li>
                                <LinkButton style={{width:"14px"}}>粉丝</LinkButton>
                                <p style={{fontSize:"12px"}}>10</p>
                            </li>
                            <li>
                                <LinkButton style={{width:"14px"}}>喜欢</LinkButton>
                                <p style={{fontSize:"12px"}}>10</p>
                            </li>
                            <li>
                                <LinkButton style={{width:"14px"}}>评论</LinkButton>
                                <p style={{fontSize:"12px"}}>10</p>
                            </li>
                        </ul>
                    </Card>
                    <div className="article-view-calendar">
                        <Calendar fullscreen={false} />
                    </div>
                </Col>
                <Col xs={24} md={16} lg={18}>
                    <div className="article-view-topic">
                        <div className="article-view-main-title">
                            <h2><Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{marginRight:"10px"}}/>{topic.Title}</h2>
                            <p style={{fontSize:"12px"}}><span>{formatStr(topic.Created)}</span>&nbsp;&nbsp;<LinkButton>{username}</LinkButton>&nbsp;&nbsp;<span>浏览数：{topic.Views}</span></p>
                        </div>
                        <div className="article-view-main-title-content">
                            <div dangerouslySetInnerHTML={{__html:topic.Content}} />
                        </div>
                        <div>
                            {
                                replies.length > 0 &&
                                <List
                                    className="comment-list"
                                    header={`${replies.length} 回复`}
                                    itemLayout="horizontal"
                                    dataSource={replies}
                                    pagination={{
                                        onChange: page => {

                                        },
                                        pageSize: 5,
                                        showQuickJumper:true
                                    }}
                                    renderItem={item => (
                                        <li>
                                            <Comment
                                                actions={
                                                    <span key="comment-list-reply-to-0">Reply to</span>
                                                }
                                                author={item.Name}
                                                avatar={'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}
                                                content={
                                                    <div style={{display:"flex",alignItems:"center"}}>
                                                        <p style={{flex:1,marginLeft:"20px"}}>{item.Content}</p>
                                                        <LinkButton style={{textAlign:"right"}} onClick={()=>this.deleReply(topic.Id,item.Id)}>删除</LinkButton>
                                                    </div>
                                                }
                                                datetime={
                                                    <Tooltip
                                                        title={formatStr(item.Created)}
                                                    >
                                                <span>
                                                  {formatStr(item.Created)}
                                                </span>
                                                    </Tooltip>
                                                }
                                            />
                                        </li>
                                    )}
                                />
                            }
                            <Comment
                                className="article-comment"
                                avatar={
                                    <Avatar
                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                        alt="Han Solo"
                                    />
                                }
                                content={
                                    <Form>
                                        <Form.Item>
                                            <TextArea rows={4} onChange={this.handleChange} value={value} />
                                        </Form.Item>
                                        <Form.Item>
                                            <Button htmlType="submit" loading={submitting} onClick={this.handleSubmit} type="primary">
                                                添加评论
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                }
                            />
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default ArticleView;
