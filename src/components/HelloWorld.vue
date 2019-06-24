<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <button v-on:click="post()">post request</button>
        <button v-on:click="get()">get request</button>
        <button v-on:click="">post with jwt request</button>
        <button v-on:click="">get with jwt request</button>
        <p>response {{procMsg}}</p>
        <textarea class="result" v-model="response" rows="25" disabled></textarea>
    </div>
</template>

<script>
    import comService from '../service/comService'

    export default {
        name: 'HelloWorld',
        props: {
            msg: String
        },
        data() {
            return {
                procMsg: '',
                response: '{click button}'
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
