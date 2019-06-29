import httpUtil from '@/common/httpUtil'
import jwtUitl from '@/common/jwtUtil'

describe('httpUtil 함수 테스트', () => {
  describe('init 메소드 테스트', () => {
    it('파라미터가 없으면 기본 해더값의 axios 객체 반환', () => {
      let axiosInit = httpUtil.init();
      expect(axiosInit.defaults.headers["Content-Type"]).toBe('application/json;charset=UTF-8');
    });

    it('파라미터가 있으면 파라미터에 값으로 해더 정보가 변경되어 반환됨', () => {
      let header = {'Content-Type':'application/json;charset=EUC-KR'};
      let axiosInit = httpUtil.init(header);
      expect(axiosInit.defaults.headers["Content-Type"]).toBe(header["Content-Type"]);
    });
  });

  describe('post 메소드 테스트', () => {
    it('http 요청 메소드가 post', async () => {
      await httpUtil.post('/post');
      //post 로 요청했을때 405 오류가 안나면 정상임
    });

    it('두번째 파라미터는 요청데이터', async () => {
      let res = await httpUtil.post('/post',{test:'test'});
      expect(res.json.test).toBe('test');
    });
  });

  describe('get 메소드 테스트', () => {
    it('http 요청 메소드가 get', async () => {
      await httpUtil.get('/get');
      //get 로 요청했을때 405 오류가 안나면 정상임
    });

    it('두번째 파라미터는 요청데이터', async () => {
      let res = await httpUtil.get('/get',{test:'test'});
      expect(res.args.test).toBe('test');
    });
  });

  describe('postJwt 메소드 테스트', () => {
    it('엑세스토큰이 없이 요청시 exception', async () => {
      try {
        let res = await httpUtil.postJwt('/post');
      } catch (e) {
        expect(e.err).toBe('저장된 엑세스 토큰이 없습니다.');
      }
    });

    it('엑세스토큰은 있고 리프레시 토큰없이 요청시 exception', async () => {
      //엑세스 토큰 세팅
      let token = jwtUitl.getFakeToken(false);
      jwtUitl.setAccessToken(token);

      try {
        let res = await httpUtil.postJwt('/post');
      } catch (e) {
        expect(e.err).toBe('저장된 리프레시 토큰이 없습니다.');
      }
    });

    it('엑세스토큰은 있고 만료된 리프레시토큰일 경우 요청시 exception', async () => {
      //엑세스 토큰 세팅
      jwtUitl.setAccessToken(jwtUitl.getFakeToken(false));
      //리프레시 토큰 세팅
      jwtUitl.setRefreshToken(jwtUitl.getFakeToken(true));

      try {
        let res = await httpUtil.postJwt('/post');
      } catch (e) {
        expect(e.err).toBe('토큰이 만료되었습니다.');
      }
    });

    it('엑세스토큰이 만료되었을 경우 리프레시 토큰으로 자동 갱신 후 요청 처리 성공', async () => {
      //엑세스 토큰 세팅 (만료)
      jwtUitl.setAccessToken(jwtUitl.getFakeToken(true));
      //리프레시 토큰 세팅 (정상)
      jwtUitl.setRefreshToken(jwtUitl.getFakeToken(false));

      await httpUtil.postJwt('/post');
    });

    it('엑세스, 리프레시 토큰 모두 정상일 경우 성공', async () => {
      //엑세스 토큰 세팅
      jwtUitl.setAccessToken(jwtUitl.getFakeToken(false));
      //리프레시 토큰 세팅
      jwtUitl.setRefreshToken(jwtUitl.getFakeToken(false));

      let res = await httpUtil.postJwt('/post',{test:'test'});
      expect(res.json.test).toBe('test');
    });
  });

  describe('getJwt 메소드 테스트', () => {
    it('엑세스토큰이 없이 요청시 exception', async () => {
      try {
        let res = await httpUtil.getJwt('/get');
      } catch (e) {
        expect(e.err).toBe('저장된 엑세스 토큰이 없습니다.');
      }
    });

    it('엑세스토큰은 있고 리프레시 토큰없이 요청시 exception', async () => {
      //엑세스 토큰 세팅
      let token = jwtUitl.getFakeToken(false);
      jwtUitl.setAccessToken(token);

      try {
        let res = await httpUtil.getJwt('/get');
      } catch (e) {
        expect(e.err).toBe('저장된 리프레시 토큰이 없습니다.');
      }
    });

    it('엑세스토큰은 있고 만료된 리프레시토큰일 경우 요청시 exception', async () => {
      //엑세스 토큰 세팅
      jwtUitl.setAccessToken(jwtUitl.getFakeToken(false));
      //리프레시 토큰 세팅
      jwtUitl.setRefreshToken(jwtUitl.getFakeToken(true));

      try {
        let res = await httpUtil.getJwt('/get');
      } catch (e) {
        expect(e.err).toBe('토큰이 만료되었습니다.');
      }
    });

    it('엑세스토큰이 만료되었을 경우 리프레시 토큰으로 자동 갱신 후 요청 처리 성공', async () => {
      //엑세스 토큰 세팅 (만료)
      jwtUitl.setAccessToken(jwtUitl.getFakeToken(true));
      //리프레시 토큰 세팅 (정상)
      jwtUitl.setRefreshToken(jwtUitl.getFakeToken(false));

      await httpUtil.getJwt('/get');
    });

    it('엑세스, 리프레시 토큰 모두 정상일 경우 성공', async () => {
      //엑세스 토큰 세팅
      jwtUitl.setAccessToken(jwtUitl.getFakeToken(false));
      //리프레시 토큰 세팅
      jwtUitl.setRefreshToken(jwtUitl.getFakeToken(false));

      let res = await httpUtil.getJwt('/get',{test:'test'});
      expect(res.args.test).toBe('test');
    });
  });

  describe('setAuthHeader 메소드 테스트', () => {
    it('파라미터값이 있으면 해더에 인증 토큰값으로 파라미터값이 세팅됨', async () => {
      //토큰 생성
      let token = jwtUitl.getFakeToken(false);

      let header = await httpUtil.setAuthHeader(token);

      expect(header['Authorization']).toBe(`Bearer ${token}`);
    });

    it('파라미터값이 없으면 저장된 엑세스 토큰으로 반환', async () => {
      //엑세스 토큰 세팅
      let token = jwtUitl.getFakeToken(false);
      jwtUitl.setAccessToken(token);

      let header = await httpUtil.setAuthHeader();

      expect(header['Authorization']).toBe(`Bearer ${token}`);
    });

    it('파라미터값의 토큰이 만료되었으면 exception', async () => {
      //엑세스 토큰 세팅
      let token = jwtUitl.getFakeToken(false);

      try {
        await httpUtil.setAuthHeader(token);
      } catch (e) {
        expect(e.err).toBe('토큰이 만료되었습니다.');
      }
    });

    it('엑세스토큰도 없고, 파라미터도 없으면 exception', async () => {
      try {
        await httpUtil.setAuthHeader();
      } catch (e) {
        expect(e.err).toBe('저장된 엑세스 토큰이 없습니다.');
      }
    });
  });
});
