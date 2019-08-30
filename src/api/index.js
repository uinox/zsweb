/*
* 包含应用中所有接口请求函数的模块
*
*
* */

import ajax from './ajax';
import jsonp from 'jsonp';
import {message} from "antd";

//登录
export const reqLogin = (name,password) => ajax('/apis/loginat',{name,password},'POST');

//注册
export const reqRegister = (user) => ajax('/apis/register',user,'POST');

//获取分类列表
export const reqCategories = () => ajax('/apis/categoryAt',{},'POST');

//添加分类
export const reqAddCategories = (cate,type) => ajax('/apis/categoryAt',{'Name': cate,'Op':type},'POST');

//删除分类
export const reqRemoveCategories = (id,type) => ajax('/apis/categoryAt',{'Id': id,'Op':type},'POST');

//获取文章列表
export const reqGetTopics = () => ajax('/apis/topicat',{},);


//添加文章
// export const reqAddTopic = (topic) => ajax('/apis/topicat/add',{topic},'POST');

//获取文章和评论
export const reqViewTopic = (tid) => ajax(`/apis/topicat/view/${tid}`);

//编辑文章
export const reqEditTopic = (tid) => ajax(`/apis/topicat/edit?tid=${tid}`);

//删除文章
export const reqDeleteTopic = (id) => ajax(`/apis/topicat/delete?tid=${id}`,{},'POST');

//添加评论
export const reqAddReply = (reply) => ajax('/apis/replyat/add',reply,'POST');

//删除评论
export const reqDeleteReply = (tid,rid) => ajax(`/apis/replyat/delete?tid=${tid}&rid=${rid}`);





/*
* json请求接口函数
* jsonp解决ajax跨域问题的原理
* 1).jsonp只能解决GET类型的ajax请求跨域问题
* 2).jsonp请求不是ajax请求，而是一般的get请求
* 3).基本原理
*   浏览器端：
*       动态生成<script>来请求后台借口(src就是接口的url)
*       定义好用于接收相应数据的函数，并将函数名通过请求参数提交给后台（如：callback=fn)
*   服务器端：
*       接收到请求处理产生结果数据后，返回一个函数调用的js代码，并将结果数据作为实参传入函数调用
*   浏览器端：
*       收到响应自动执行函数调用的js代码，也就执行了提前定义好的回调函数，并得到了需要的结果数据
* */
export const reqWeather = (city)=>{
    return new Promise((resolve,reject) => { //返回一个promise对象
        const url =`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        //发送jsonp请求
        jsonp(url,{},(err,data)=>{
            console.log('jsonp',err,data);
            //如果成功
            if(!err && data.status==='success'){
                //取出需要的数据
                const {dayPictureUrl,weather} =data.results[0].weather_data[0];
                resolve({dayPictureUrl,weather})
            }else{
                //如果失败了
                message.error('获取天气信息失败')
            }
        })
    })

};

// reqWeather('北京');