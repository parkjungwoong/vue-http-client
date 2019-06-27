import comUtil from '@/common/comUtil'

describe('공통 유틸 함수 테스트', () => {
  describe('jsonToQueryString 메소드 테스트', () => {

    describe('입력값이 비어있는 경우 [?]문자만 반환한다.', () => {
      it('입력값이 문자열 길이가 0인경우', () => {
        let qs = comUtil.jsonToQueryString('');
        expect(qs).toBe('?');
      });
      it('입력값이 공백 문자', () => {
        let qs = comUtil.jsonToQueryString(' ');
        expect(qs).toBe('?');
      });
      it('입력값이 null 문자열', () => {
        let qs = comUtil.jsonToQueryString('null');
        expect(qs).toBe('?');
      });
      it('입력값이 null 값', () => {
        let qs = comUtil.jsonToQueryString(null);
        expect(qs).toBe('?');
      });
      it('입력값이 undefined 문자열', () => {
        let qs = comUtil.jsonToQueryString('undefined');
        expect(qs).toBe('?');
      });
      it('입력값이 undefined', () => {
        let qs = comUtil.jsonToQueryString();
        expect(qs).toBe('?');
      });
      it('입력값이 빈 json', () => {
        let qs = comUtil.jsonToQueryString({});
        expect(qs).toBe('?');
      });
    });

    describe('입력값이 json 아닐경우 [?입력값]으로 반환한다.', () => {
      it('입력값이 string', () => {
        const json = 'string문자열';
        let qs = comUtil.jsonToQueryString(json);
        expect(qs).toBe(`?${json}`);
      });
      it('입력값이 number', () => {
        const json = 12345;
        let qs = comUtil.jsonToQueryString(json);
        expect(qs).toBe(`?${json}`);
      });
    });

    describe('입력값이 json 형태이면 ?key=value&key=value 쿼리 스트링형식으로 반환한다.', () => {
      it('value값이 string형', () => {
        const json = {
          key : 'value',
          key2 : 'value2'
        };

        let qs = comUtil.jsonToQueryString(json);
        expect(qs).toBe(`?key=${json.key}&key2=${json.key2}`);
      });
      it('value값이 number형', () => {
        const json = {
          key : 123,
          key2 : 456
        };

        let qs = comUtil.jsonToQueryString(json);
        expect(qs).toBe(`?key=${json.key}&key2=${json.key2}`);
      });
      it('value값이 arry', () => {
        const json = {
          key : [1,2,3,4,5],
          key2 : 456
        };

        let qs = comUtil.jsonToQueryString(json);
        expect(qs).toBe(`?key=${json.key}&key2=${json.key2}`);
      });
      it('value값 중 빈값이 있으면', () => {
        const json = {
          key : '',
          key2 : '1234'
        };

        let qs = comUtil.jsonToQueryString(json);
        expect(qs).toBe(`?key=${json.key}&key2=${json.key2}`);
      });
    });

  });

  describe('isEmpty 메소드 테스트', () => {
    describe('true 판단 테스트', () => {
      it('입력값이 문자열 길이가 0인경우', () => {
        let value = comUtil.isEmpty('');
        expect(value).toBe(true);
      });
      it('입력값이 공백 문자', () => {
        let value = comUtil.isEmpty(' ');
        expect(value).toBe(true);
      });
      it('입력값이 null 문자열', () => {
        let value = comUtil.isEmpty('null');
        expect(value).toBe(true);
      });
      it('입력값이 null 값', () => {
        let value = comUtil.isEmpty(null);
        expect(value).toBe(true);
      });
      it('입력값이 undefined 문자열', () => {
        let value = comUtil.isEmpty('undefined');
        expect(value).toBe(true);
      });
      it('입력값이 undefined', () => {
        let value = comUtil.isEmpty();
        expect(value).toBe(true);
      });
    });

    describe('false 판단 테스트', () => {
      it('string형', () => {
        let value = comUtil.isEmpty('string');
        expect(value).toBe(false);
      });
      it('number형', () => {
        let value = comUtil.isEmpty(1234);
        expect(value).toBe(false);
      });
      it('json', () => {
        let value = comUtil.isEmpty({key:'value'});
        expect(value).toBe(false);
      });
    });
  });

  describe('isJson 메소드 테스트', () => {
    describe('true 판단 테스트', () => {
      it('json', () => {
        let value = comUtil.isJson({key:'value'});
        expect(value).toBe(true);
      });
    });

    describe('false 판단 테스트', () => {
      it('string형', () => {
        let value = comUtil.isJson('string');
        expect(value).toBe(false);
      });
      it('number형', () => {
        let value = comUtil.isJson(1234);
        expect(value).toBe(false);
      });
    });
  });

});

