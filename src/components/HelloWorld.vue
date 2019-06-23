<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button v-on:click="post()">post request</button>
    <button v-on:click="get()">get request</button>
    <button v-on:click="post(true)">post with jwt request</button>
    <button v-on:click="get(true)">get with jwt request</button>
    <p>response</p>
    <textarea class="result" v-model="response" rows="10" disabled></textarea>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      response: '{click button}'
    }
  },
  methods: {
    post(isJwt) {
      console.log(`post - ${isJwt}`);
    },
    get(isJwt) {
      console.log(`get - ${isJwt}`);
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
