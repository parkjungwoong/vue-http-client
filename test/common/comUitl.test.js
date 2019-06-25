//import util from '@/common/comUtil.js'
let util = require('../../src/common/comUtil');
//todo: jest 하는거 찾아보기,... 후움
describe('comUtil 전체 테스트', () => {

    describe('jsonToQueryString 메소드 테스트', () => {
        it('key와 value값이 있는 json값이 주어졌을 때', () => {
            let json = {};
            util.jsonToQueryString(json);
        });
    });
});
