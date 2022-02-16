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
    width:90%;
    padding:40px;
  }
}
@media screen and (max-width : 767px){
  .wrap{
    width:90%;
    padding:20px;
  }
}
.loading{
    display:block;
    width:100%;
    height:40px;
    margin-top:10px;
    animation : shimmer 2s infinite linear;
    background: linear-gradient(to right, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%);
    background-size: 1000px 100%;
    border-radius:10px;
}
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}
</style>