import React, {useEffect} from 'react';
import {Row,Col,Carousel, List, Avatar,Icon} from 'antd';
import URI from 'urijs';
import {Link} from "react-router-dom";
import {formatStr} from '../../utils/dataUtils';

import './Home.less';
import {connect} from "react-redux";
import {setCategories, setTopics} from "../../redux/actions";


function Home(props) {
    const {
        categories,
        topics,
        dispatch,
    } = props;


    useEffect(()=>{
        fetch('/apis/homeat')
            .then(res=>res.json())
            .then(result=>{
                const {Categories,Topics} = result;
                dispatch(setTopics(Topics));
                dispatch(setCategories(Categories));
            });

    },[dispatch]);


    const selectTopics =(type,value) =>{
        let url;
        switch (type) {
            case 'cate':
                url =`/home?cate=${value}`;
                break;
            case 'label':
                url=`/home?label=${value}`;
                break;
            default:
        }
        props.history.replace(url);
    };

    const queries = URI.parseQuery(window.location.search);
    const {cate,label} = queries;

    let filterTopics;

    if(topics && cate){
        filterTopics = topics.filter(topic => topic.Category===cate);
    }else if(topics && label){
        filterTopics = topics.filter(topic => topic.Labels.match(/[^#$]+/g)[0]===label);
    }else{
        filterTopics = topics;
    }


    const IconText = ({ type, text }) => (
        <span>
            <Icon type={type} style={{ marginRight: 8 }} />
                    {text}
          </span>
    );

    return (
        <Row>
            <Col xs={0} sm={6} md={4}>
                <nav>
                    <ul>
                        {
                            categories &&
                            categories.map((cate,index)=>{
                                return (
                                    <li key={index}>
                                        <span onClick={()=>selectTopics('cate',cate.Title)}>{cate.Title}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>
            </Col>
            <Col xs={24} sm={18} md={20}>
                <main>
                    <Carousel className="main-carousel" autoplay>
                        <div>
                            <img src="/apis/attachment/ff1.png" style={{width:'100%',height:'100px'}} alt=""/>
                        </div>
                        <div>
                            <img src="/apis/attachment/ff2.png" style={{width:'100%',height:'100px'}} alt=""/>
                        </div>
                        <div>
                            <img src="/apis/attachment/ff3.png" style={{width:'100%',height:'100px'}} alt=""/>
                        </div>
                        <div>
                            <img src="/apis/attachment/ff4.png" style={{width:'100%',height:'100px'}} alt=""/>
                        </div>
                    </Carousel>
                    <List
                        className="main-topics"
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            onChange: page => {
                                // console.log(page);
                            },
                            pageSize: 5,
                        }}
                        dataSource={filterTopics}
                        renderItem={item => (
                            <List.Item
                                key={item.title}
                                actions={[
                                    <IconText type="clock-circle-o" text={formatStr(item.Created)} key="list-vertical-star-o" />,
                                    <IconText type="star-o" text={`${item.Views}`} key="list-vertical-like-o" />,
                                    <IconText type="message-o" text={`${item.ReplyCount}`} key="list-vertical-message" />,
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src='/apis/attachment/user.png' />}
                                    title={<Link to={`/article/view?tid=${item.Id}`}>{item.Title}</Link>}
                                    description={<a href="##" onClick={()=>selectTopics('label',item.Labels.match(/[^#$]+/g)[0])}>{item.Labels.match(/[^#$]+/g)[0]}</a>}
                                />
                            </List.Item>
                        )}
                    />
                </main>
            </Col>
        </Row>

    );
}

// export default Home;
export default connect(
    (state)=> {
        return state;
    },
   (dispatch)=> {
        return { dispatch };
    }
)(Home);
