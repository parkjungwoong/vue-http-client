import util from './comUtil'

const accessTokenKey = 'a';
const refreshTokenKey = 'r';

let jwtUtil = {
    setAccessToken(token) {
        window.localStorage.setItem(accessTokenKey,token);
    },
    getAccessToken() {
        let token = window.localStorage.getItem(accessTokenKey);
        if(util.isEmpty(token)) throw {err:'저장된 엑세스 토큰이 없습니다.'};
        return token;
    },
    setRefreshToken(token) {
        window.localStorage.setItem(refreshTokenKey,token);
    },
    getRefreshToken() {
        let token = window.localStorage.getItem(refreshTokenKey);
        if(util.isEmpty(token)) throw {err:'저장된 리프레시 토큰이 없습니다.'};
        return token;
    }
};

export default jwtUtil;
