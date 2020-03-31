<template>
  <div class="home">
    <div class="topBox">
      <img class="bannerT" src="../assets/bannerT.png" alt="">
    
      <img class="gifT" src="../assets/top.gif" v-on:click="greet" alt="">
    </div>
    <img class="banner" src="../assets/banner.png" alt="">

     <el-button >Button</el-button>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
  },
  methods: {
    greet: function () {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      if(isiOS){
        console.log('iOS')
        this.$router.push({name:'About'});
      }else if(isAndroid){
        console.log('Android')
        // window.open("你的url")
      }
    }
  }
};
</script>

<style scoped>  
    .home{
      width:100VW;
    }
    .topBox{
      position: relative;
      display: flex;
      background: #252225;
    }  
    .bannerT{        
        /* width:100%; */
        height: 80px;
    }
    .gifT{
      width:24vw;
      position: absolute;
      top:20px;
      right: 8.4vw;
    }
    .banner{        
        width:100VW;
    }
</style>
