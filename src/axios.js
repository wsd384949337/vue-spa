import axios from 'axios'

axios.defaults.timeout = 5000;                        //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = 'http://mjb.yutangwl.com/api'

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
    //在发送请求之前做某件事
    const token = sessionStorage.getItem('token')
    config.headers = {
      'token': token
    }
    return config
});

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((response) =>{
    //对响应数据做些事
     // console.log(response)
  return response.data
}, (error) => {
    console.log('TCL: error', error)
    const msg = error.Message !== undefined ? error.Message : ''
    Message({
      message: '网络错误' + msg,
      type: 'error',
      duration: 3 * 1000
    })
    loadingInstance.close()
    return Promise.reject(error)
});

//返回一个Promise(发送post请求)
export function fetchPost(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                resolve(res.data);
            })
            .catch((error) => {
                reject(error.data)
            })
    })
}
////返回一个Promise(发送get请求)
export function fetchGet(url, param) {
    return new Promise((resolve, reject) => {
        axios.get(url, {params: param})
            .then(res => {
                if(res.status ==1){
                    resolve(res.data)
                }else{
                    reject(err.data)
                }
            })
            .catch((error) => {
                reject(error)
            })
    })
}
export default {
    login (data) {
        return fetchGet('/console/login', data)
    },
    getGift () {
        return fetchPost('/console/giftList')
    },
}