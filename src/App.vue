<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    Header,
  }
}
</script>

<style lang="scss">
// reset CSS
html, body, h1, h2, h3, ul, ol, li, dl, dt, dd, input, main, header, legend, figure, div{margin:0; padding:0; box-sizing:border-box; font-family: 'Noto Sans KR', sans-serif;}
li{list-style:none;}
button{padding:0; background:none; border:none; cursor:pointer}
a{color:inherit; text-decoration:none;}

html{height:100vh;}
.wrap{
  width:1080px;
  margin:0 auto;
  padding:20px;
}

// Scroll Bar
::-webkit-scrollbar {
    width: 10px;
}
::-webkit-scrollbar-thumb {
    background-color: #2f3542;
    border-radius: 10px;
}
::-webkit-scrollbar-track {
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
}
@media screen and (min-width : 768px) and (max-width : 1200px) {
  .wrap{
    width:100%;
    padding:40px;
  }
}
@media screen and (max-width : 767px){
  .wrap{
    width:100%;
    padding:20px;
  }
}
</style>