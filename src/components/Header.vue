<template>
  <header class="wrap">
    <h1>해외여행 정보 제공</h1>
    <p>출처 정보 : 외교부, 대한무역투자진흥공사</p>
  </header>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style lang="scss" scoped>
  header{
    overflow:hidden;
    h1{
      font-size:25px;
      height:50px;
      line-height:50px;
      float:left;
    }
    p{
      float:right;
      font-size:12px;
      color:#777;
    }
  }
   @media screen and (min-width : 768px) and (max-width : 1024px) {
    header{width:100%;}
  }
  @media screen and (max-width : 767px){
    header{width:100%;}
  }
</style>
