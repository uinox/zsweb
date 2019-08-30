/*
*
* 能发送ajax的函数模块
* 封装了axios库
* 函数的返回值是promise对象
*
*
* */
import axios from 'axios';
import {message} from "antd";

export default function ajax(url,data={},type='GET'){
    return new Promise((resolve,reject)=>{
      let promise;
      if(type==='GET'){ //发GET请求
          promise = axios.get(url,{//配置参数
              params:data //制定请求参数
          });
      }else{
          promise = axios.post(url,data);
      }

      promise.then(response=>{
          resolve(response.data)
      }).catch(error=>{
          message.error(`请求出错:${error.message}`);
      })
    })
}