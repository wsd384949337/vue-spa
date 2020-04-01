<template>
  <div class="home">
    <img src="../assets/wancheng.png" alt="">
    <p>充值完成</p>
    <div>完成</div>
  </div>
</template>

<script>

export default {
  name: "Success",
  components: {
  },
  data(){
    return{
      
    }
  },
  created(){
  },
  methods: {
   
  }
};
</script>

<style scoped>  
   .home img{
     width: 21.9vw;
     margin:37.2vw 0 8.9vw 0;
   }
   .home p{
     font-size: 18px;
     color:#FDAAA8;
     margin-bottom: 34.3vw;
   }
   .home div{
      width:73.7vw;
      height:13.5vw;
      background:linear-gradient(75deg,rgba(251,197,188,1),rgba(254,164,164,1));
      border-radius:6.75vw;
      margin: 0 auto;
      line-height: 13.5vw;
      color: white;
   }
</style>
