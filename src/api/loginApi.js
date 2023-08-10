import { reqRealEndAsync, reqRealEnd } from "@/api/axiosCommon";

import { config } from "@/api/frontConfig";

// request verification code
export const queryCaptcha = (callback) => {
    return reqRealEndAsync("post", config.real_domain, "/login/captcha", {}, callback);
}

// login
export const login = (params, callback) => {
    return reqRealEndAsync("post", config.real_domain,
        "/login/userlogin", params, callback);
};