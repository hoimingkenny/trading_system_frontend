import router from '../router'

// let a = {name: hello , age : 10}
// qs.Stringify(a)
// name=hello&age=13 (to URL parameter)
import Qs from 'qs';

// 包裝了ajax ，方便http調用
import axios from 'axios';

// common method (with callback)
// method: POST, GET
// baseUrl: current service
// url: target
export const reqRealEndAsync = (method, baseUrl,
                                url, params, callback) => {

    params.token = sessionStorage.getItem('token');

    return axios({
        timeout: 5000,
        baseURL: baseUrl,
        url: url,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        data: Qs.stringify(params),

        // default value: false
        // false -- split
        // true -- List<String>
        traditional: true
    }).then(res => {
        let result = res.data;
        // {code: 0 -- Success; code: 1/2/other -- Fail, message: , data:{{}}}

        if (result.code === 1){
            // verification failed -> redirect
            router.replace({
                path: "login",
                query: {
                    msg: result.message
                }
            });
        } else if (result.code === 0) {
            // success -> callback
            if (callback !== undefined) {
                callback(result.code, result.message, result.data);
                console.log(result.data);
            }
        } else {
            console.error(result);
        }
    });
};

// common method (without callback)
export const reqRealEnd = (method, baseUrl,
                           url, params) => {
    return axios({
        timeout: 5000,
        baseURL: baseUrl,
        method: method,
        url: url,
        headers:{
            'Content-type': 'application/x-www-form-urlencoded',
        },
        data: Qs.stringify(params),

        //false -- split
        //true -- List<String>
        traditional: true,
    });
}