import util from './comUtil'
import http from './httpUtil'

const accessTokenKey = 'a';
const refreshTokenKey = 'r';
const JWT_EXP = "exp";

let jwtUtil = {
    setAccessToken(token) {
        window.localStorage.setItem(accessTokenKey,token);
    },
    async getAccessToken() {
        let token = window.localStorage.getItem(accessTokenKey);

        if(util.isEmpty(token)) throw {err:'저장된 엑세스 토큰이 없습니다.'};

        //엑세스 토큰 만료시 갱신 처리
        if(this.isExpiredToken(token)) {
            token = await this.tokenRefresh();
        }

        return token;
    },
    setRefreshToken(token) {
        window.localStorage.setItem(refreshTokenKey,token);
    },
    getRefreshToken() {
        let token = window.localStorage.getItem(refreshTokenKey);
        if(util.isEmpty(token)) throw {err:'저장된 리프레시 토큰이 없습니다.'};
        return token;
    },
    isExpiredToken(token) {
        if(util.isEmpty(token)) return true;

        let payLoad = this.getPayLoad(token);
        let exp = payLoad[JWT_EXP];
        return Math.floor(+new Date()/1000) >= exp;
    },
    getPayLoad(token) {
        return JSON.parse(window.atob(token.split('.')[1]));
    },
    async tokenRefresh() {
        let newAccessToken = '';

        try {
            let res = await http.postJwt('/post',{accessToken: this.getFakeToken()},this.getRefreshToken());
            newAccessToken = res.json.accessToken;
            this.setAccessToken(newAccessToken);
            console.log('엑세스 토큰이 갱신됨',newAccessToken);
        } catch (e) {
            throw e;
        }

        return newAccessToken;
    },

    //test code
    getFakeToken(exp) {
        let date = new Date();

        let expDate = exp ? new Date('1995-12-17T03:24:00') : date.setDate(date.getDate()+1);

        let fakePayload = {
            exp: Math.floor(+expDate/1000)
        };

        fakePayload = window.btoa(JSON.stringify(fakePayload));

        return `fakeHeader.${fakePayload}.fakeSign`
    }
};

export default jwtUtil;
