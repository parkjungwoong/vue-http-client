<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <h3>저장된 jwt 토큰 확인 방법</h3>
        <p>jwt 토큰은 크롬기준, F12(개발자도구) -> Application탭 -> Storage/local Storage에 저장 확인 가능 </p>
        <hr>
        <button v-on:click="post()">post request</button>
        <button v-on:click="get()">get request</button>
        <button v-on:click="postJwt()" style="margin-left: 10px">post with jwt request</button>
        <button v-on:click="getJwt()">get with jwt request</button>
        <hr>
        <button v-on:click="saveToken(false)">saveAccessToken</button>
        <button v-on:click="saveToken(true)">saveRefreshToken</button>
        <button v-on:click="saveToken(false,true)" style="margin-left: 10px">saveExpiredAccessToken</button>
        <button v-on:click="saveToken(true,true)">saveExpiredRefreshToken</button>
        <p>accessToken : {{aTokenState}} / reFreshToken : {{rTokenState}}</p>
        <hr>
        <p>response {{procMsg}}</p>
        <textarea class="result" v-model="response" rows="25" disabled></textarea>
    </div>
</template>

<script>
    import comService from '../service/comService'
    import jwtUtil from '../common/jwtUtil'

    export default {
        name: 'HelloWorld',
        created() {
            //로컬 데이터 초기화
            localStorage.clear();
        },
        props: {
            msg: String
        },
        data() {
            return {
                procMsg: '',
                response: '{click button}',
                aTokenState: 'empty',
                rTokenState: 'empty'
            }
        },
        methods: {
            async post() {
                this.procMsg = '요청중...';
                try {
                    let res = await comService.postExample({sendData: 'POST 테스트'});
                    this.response = JSON.stringify(res, null, 2);

                } catch (e) {
                    this.response = e;
                    alert(e);
                }
                this.procMsg = '';
            },
            async get() {
                this.procMsg = '요청중...';
                try {
                    let res = await comService.getExample({sendData: 'get 테스트',data3:'1234'});
                    this.response = JSON.stringify(res, null, 2);

                } catch (e) {
                    this.response = e;
                    alert(e);
                }
                this.procMsg = '';
            },
            async postJwt() {
                this.procMsg = '요청중...';
                try {
                    let res = await comService.postJwtExample({sendData: 'postJwt 테스트',data3:'1234'});
                    this.response = JSON.stringify(res, null, 2);

                } catch (e) {
                    this.response = JSON.stringify(e, null, 2);
                    alert(this.response);
                }
                this.procMsg = '';
            },
            async getJwt() {
                this.procMsg = '요청중...';
                try {
                    let res = await comService.getJwtExample({sendData: 'postJwt 테스트',data3:'1234'});
                    this.response = JSON.stringify(res, null, 2);

                } catch (e) {
                    this.response = JSON.stringify(e, null, 2);
                    alert(this.response);
                }
                this.procMsg = '';
            },
            saveToken(isRefresh,exp) {
                let fakeToken = jwtUtil.getFakeToken(exp);
                if(isRefresh) {
                    jwtUtil.setRefreshToken(fakeToken);
                    this.rTokenState = `ready`;
                } else {
                    jwtUtil.setAccessToken(fakeToken);
                    this.aTokenState = `ready`;
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    .result {
        width: 500px;
    }
</style>
