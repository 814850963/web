/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
import router from '@/router'
import Vue from 'vue'
// 环境的切换
//开发环境和部署环境
// const url = process.env.NODE_ENV === 'development' ? "http://168.0.0.119:8080" : "";
// axios.defaults.baseURL = url;
// axios.defaults.withCredentials = true; //让axios携带cookie
// 创建axios实例
var BaseUrl="http://localhost:8000/web/";
//var BaseUrl="http://cd.dryht.cn:25200/web/";
function requestFN(o) {
    //基础请求方法
    //o.type //请求类型
    //o.url //请求路径
    var a = o.headers
    if(a!=null)
    {
        var obj = {
            method: o.type, //请求的类型        
            url: BaseUrl + o.url, //请求地址
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    }
    else
    {
        var obj = {
            method: o.type, //请求的类型        
            url: BaseUrl + o.url, //请求地址
        }
    }
    
    if (o.hasOwnProperty("params")) {
        obj.params = o.params; //url后面带参数 如 https://echarts.baidu.com/examples/a?test="1"
    } else if (o.hasOwnProperty("data")) {
        obj.data = o.data; // data 带参数
    }
    // 这里做好多事情比如说有没有携带token cookie这类没用肯定要dosoming的啦，
    // 根据你的业务需要自己加吧，我这里就不写了，如有疑问可以留言我
    //返回axios的基础方法
    return axios(obj).then(r => {
        return r.data; //方法请求的数据
    })}
async function getFN(o) {
    //get方法
    var result = await requestFN(o);
    return result;
}

async function postFN(o) {
    //get方法
    var result = await requestFN(o);
    return result;
}

axios.defaults.timeout = 10000;

const install = () => {
    Vue.prototype.getFN = getFN; //GET方法
    Vue.prototype.postFN = postFN; //POST方法
}
export default install;

axios.interceptors.response.use(
    response => {
      //成功请求的状态码
      //注意状态码是根据后端返回给我的,要自己根据业务需求去写我这里只是做实例
        if (response.status == 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        //失败请求的状态码
        if (error.response) {
            switch (error.response.status) {
                case 40103:
                    router.replace({ path: '/login' });
                    localStorage.removeItem("tokenValue");
                    break;
            }
            return Promise.reject(error.response.data)
        }
    });