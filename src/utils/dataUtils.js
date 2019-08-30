/*
* 格式化日期
* */

export function formatDate(time){
    if(!time) return '';
    return `${time.getFullYear()}-${(time.getMonth()+1)}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
}

//字符串格式转化位日期格式
export function formatStr(str){
    if(!str) return '';
    return str.trim().substring(0,19).replace("T"," ");
}