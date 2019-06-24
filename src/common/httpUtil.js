import axios from 'axios';
import util from './comUtil'

const commonHeader = {
    'Content-Type':'application/json;charset=UTF-8'
};
const host = 'https://httpbin.org';
const rootUrl = '/';

let httpUtil = {
    init(newHeader){
        let headers = newHeader ? newHeader : commonHeader;
        return axios.create({
            baseURL: `${host}${rootUrl}`
            ,timeout: 5000
            ,headers: headers
        });
    },

    async post(url, param) {
        let res = {};

        try {
            res = await this.init().post(url, param);
        } catch (e) {
            throw this.httpErrHandler(e);
        }

        return this.httpSuccessHandler(res);
    },
    async get(url, param) {
        let qs = util.jsonToQueryString(param);
        let res = {};

        try {
            res = await this.init().get(`${url}${qs}`);
        } catch (e) {
            throw this.httpErrHandler(e);
        }

        return this.httpSuccessHandler(res);
    },

    httpSuccessHandler(res) {
        //todo: api 성공 응답시 공통 처리할 부분을 여기에 작성
        return res.data;
    },
    httpErrHandler(err) {
        //todo: api 실패 응답시 공통 처리할 부분을 여기에 작성
        return err;
    }

};

export default httpUtil;
