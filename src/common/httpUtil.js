import axios from 'axios';
import util from './comUtil'
import jwtUtil from './jwtUtil'

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

    async post(url, param, newHeader) {
        let res = {};

        try {
            res = await this.init(newHeader).post(url, param);
        } catch (e) {
            throw this.httpErrHandler(e);
        }

        return this.httpSuccessHandler(res);
    },
    async get(url, param, newHeader) {
        let qs = util.jsonToQueryString(param);
        let res = {};

        try {
            res = await this.init(newHeader).get(`${url}${qs}`);
        } catch (e) {
            throw this.httpErrHandler(e);
        }

        return this.httpSuccessHandler(res);
    },
    async postJwt(url, param, token) {
        let header = await this.setAuthHeader(token);
        return await this.post(url, param, header);
    },
    async getJwt(url, param, token) {
        let header = await this.setAuthHeader(token);
        return await this.get(url, param, header);
    },
    async setAuthHeader(token) {
        let header = {
            'Content-Type' : commonHeader["Content-Type"]
        };

        //요청 인증 토큰값의 기본값은 accessToken
        let jwtToken = token ? token : await jwtUtil.getAccessToken();

        //토큰 만료일 체크
        if(jwtUtil.isExpiredToken(jwtToken)) {
            throw {err:'토큰이 만료되었습니다.'};
        }

        header['Authorization'] = `Bearer ${jwtToken}`;

        return header;
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
