import React, {useEffect} from 'react';
import {Row,Col,Carousel, List, Avatar,Icon} from 'antd';
import URI from 'urijs';
import {Link} from "react-router-dom";
import {formatStr} from '../../utils/dataUtils';

import './Home.less';
import {connect} from "react-redux";
import {setCategories, setTopics} from "../../redux/actions";
import ff1 from '../../assets/images/ff1.png';
import ff2 from '../../assets/images/ff2.png';
import ff3 from '../../assets/images/ff3.png';
import ff4 from '../../assets/images/ff4.png';


function Home(props) {
    const {
        categories,
        topics,
        dispatch,
    } = props;

    useEffect(()=>{
        fetch('/homeat')
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
                            <img src={ff1} style={{width:'100%',height:'100px'}} alt=""/>
                        </div>
                        <div>
                            <img src={ff2} style={{width:'100%',height:'100px'}} alt=""/>
                        </div>
                        <div>
                            <img src={ff3} style={{width:'100%',height:'100px'}} alt=""/>
                        </div>
                        <div>
                            <img src={ff4} style={{width:'100%',height:'100px'}} alt=""/>
                        </div>
                    </Carousel>
                    <List
                        bordered
                        style={{marginTop:'20px'}}
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
                                    avatar={<Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />}
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
    function mapStateToProps(state) {
        return state;
    },
    function mapDispatchToProps(dispatch) {
        return { dispatch };
    }
)(Home);
