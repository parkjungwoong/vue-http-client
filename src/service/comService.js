import http from '../common/httpUtil'

let service = {
    async postExample(param) {
        let res = {};
        try {
            res = await http.post('/post',param);
        } catch (e) {
            throw e;
        }
        return res;
    },

    async getExample(param) {
        let res = {};
        try {
            res = await http.get('/get',param);
        } catch (e) {
            throw e;
        }
        return res;
    },

    async postJwtExample(param) {
        let res = {};
        try {
            res = await http.postJwt('/post',param);
        } catch (e) {
            throw e;
        }
        return res;
    },

    async getJwtExample(param) {
        let res = {};
        try {
            res = await http.getJwt('/get',param);
        } catch (e) {
            throw e;
        }
        return res;
    }
};

export default service;
