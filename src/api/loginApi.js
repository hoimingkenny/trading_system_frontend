import { reqRealEndAsync, reqRealEnd } from "@/api/axiosCommon";

import { config } from "@/api/frontConfig";


export const queryCaptcha = (callback) => {
    return reqRealEndAsync("post", config.real_domain, "/login/captcha", {}, callback);
}

export const login = (params, callback) => {
    return reqRealEndAsync("post", config.real_domain,
        "/login/userlogin", params, callback);
};