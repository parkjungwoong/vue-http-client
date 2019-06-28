import jwtUtil from '@/common/jwtUtil'

describe('jwt 유틸 함수 테스트', () => {

  describe('setAccessToken 메소드 테스트', () => {
    it('set 메소드로 저장한 값이 get 메소드로 가져와져야함', async () => {
      let ex = jwtUtil.getFakeToken(false);
      jwtUtil.setAccessToken(ex);
      expect(await jwtUtil.getAccessToken()).toBe(ex);
    });
  });

  describe('getAccessToken 메소드 테스트', () => {
    it('저장된 엑세스 토큰이 없을때 exception 발생', async () => {
      try {
        await jwtUtil.getAccessToken();
      } catch (e) {
        expect(e.err).toBe('저장된 엑세스 토큰이 없습니다.');
      }
    });

    it('만료된 엑세스 토큰 get 할때 리프레시 토큰이 없을 경우 exception 발생', async () => {
      try {
        //기간 만료된 엑세스 토큰 세팅
        let ex = jwtUtil.getFakeToken(true);
        jwtUtil.setAccessToken(ex);

        await jwtUtil.getAccessToken();
      } catch (e) {
        expect(e.err).toBe('저장된 리프레시 토큰이 없습니다.');
      }
    });

    it('만료된 엑세스 토큰 get 할때 리프레시 토큰이 만료된 경우 exception 발생', async () => {
      try {
        //기간 만료된 엑세스 토큰 세팅
        let ex = jwtUtil.getFakeToken(true);
        jwtUtil.setAccessToken(ex);

        //기간 만료된 리프레시 토큰 세팅
        let r = jwtUtil.getFakeToken(true);
        jwtUtil.setRefreshToken(r);

        await jwtUtil.getAccessToken();
      } catch (e) {
        expect(e.err).toBe('토큰이 만료되었습니다.');
      }
    });

    it('만료된 엑세스 토큰일 경우 새 토큰을 발급한다.', async () => {
      //리프레시 토큰 세팅
      let r = jwtUtil.getFakeToken(false);
      jwtUtil.setRefreshToken(r);

      //유효 기간 만료된 엑세스 토큰 세팅
      let ex = jwtUtil.getFakeToken(true);
      jwtUtil.setAccessToken(ex);
      expect(await jwtUtil.getAccessToken()).not.toBe(ex);
    });
  });

  describe('setRefreshToken 메소드 테스트', () => {
    it('set 메소드로 저장한 값이 get 메소드로 가져와져야함', () => {
      let ex = jwtUtil.getFakeToken(false);
      jwtUtil.setRefreshToken(ex);
      expect(jwtUtil.getRefreshToken()).toBe(ex);
    });
  });

  describe('isExpiredToken 메소드 테스트', () => {
    it('토큰의 요효 기간이 지났을 경우 true 반환', () => {
      let token = jwtUtil.getFakeToken(true);
      let exp = jwtUtil.isExpiredToken(token);
      expect(exp).toBe(true);
    });

    it('토큰의 요효 기간이 남아있을 경우 false 반환', () => {
      let token = jwtUtil.getFakeToken(false);
      let exp = jwtUtil.isExpiredToken(token);
      expect(exp).toBe(false);
    });

    it('토큰이 빈값일 경우 true 반환', () => {
      let exp = jwtUtil.isExpiredToken('');
      expect(exp).toBe(true);
    });
  });

  describe('getPayLoad 메소드 테스트', () => {
    it('토큰이 빈값일 경우 공백 반환', () => {
      let r = jwtUtil.getPayLoad('');
      expect(r).toBe('');
    });

    it('토큰이 정상일 경우 payload값 반환', () => {
      let token = jwtUtil.getFakeToken();
      let payload = jwtUtil.getPayLoad(token);

      expect(payload.exp).not.toBeNull();
    });
  });

  describe('tokenRefresh 메소드 테스트', () => {
    it('리프레시 토큰이 없는데 갱신할려고 할 경우 exception 발생', async () => {
      try {
        await jwtUtil.tokenRefresh();
      } catch (e) {
        expect(e.err).toBe('저장된 리프레시 토큰이 없습니다.');
      }
    });

    it('리프레시 토큰이 만료되었을때 갱신할려고 할 경우 exception 발생', async () => {
      //만료된 리프레시 토큰 세팅
      jwtUtil.setRefreshToken(jwtUtil.getFakeToken(true));
      try {
        await jwtUtil.tokenRefresh();
      } catch (e) {
        expect(e.err).toBe('토큰이 만료되었습니다.');
      }
    });

    it('성공시 갱신된 엑세스 토큰 반환', async () => {
      //만료된 리프레시 토큰 세팅
      jwtUtil.setRefreshToken(jwtUtil.getFakeToken(false));
      let a = await jwtUtil.tokenRefresh();
      expect(a).not.toBeNull();
    });

    it('성공시 갱신된 엑세스 로컬에 저장', async () => {
      //만료된 리프레시 토큰 세팅
      jwtUtil.setRefreshToken(jwtUtil.getFakeToken(false));
      let a = await jwtUtil.tokenRefresh();
      expect(a).toBe(await jwtUtil.getAccessToken())
    });
  });

});
