# vue-http-client
axios를 패키징하여 서비스 로직에서 사용하기 편하도록 만들어봤습니다.\
특히 jwt 토큰을 이용하는 서비스에 대응할 수 있도록 만들어졌습니다.
### Project setup
```
git clone ~
npm install
```

### Run dev server
```
npm run serve
```

### 구성
vue-cli를 이용한 기본 예제 프로젝트 기반으로 만들어졌습니다.
```
└─src
    ├─assets
    ├─common     // 공통 유틸리티 메소드
    ├─components // 뷰 컴포넌트
    └─service    // 서비스 로직
```

### 호출방식
Vue 컴포넌트에서 service 로직을 호출하여 사용합니다.
```javascript
import exService from '../service/exService'

export default {
        name: 'HelloWorld',
        ... 생략
        
        methods: {
            test() {
                let result = exService.somethig();
                //import한 서비스의 함수를 호출하여 사용한다.
            }
        }
}
```





