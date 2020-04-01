<template>
  <div class="home">
    <div class="topBanner"><a href="tel:13764567708"><img src="../assets/kefu.png" alt=""></a></div>
    <div class="useMesg">
      <div class="useMesgHead"><img :src='headerUrl' alt=""></div>
      <div class="useMesgName">
        <h6 style="border-bottom:1px solid #FFEFED;padding-bottom:8px;margin-bottom:8px;">气泡ID：{{userId}}</h6>
        <h6>昵称：{{nickName}}</h6>
      </div>
    </div>

    <div class="payType">
      <div class="payTypeCon"  v-bind:class="{'payTypeClass':payType === 1 }" @click="payType = 1;">
        <img src="../assets/zhifubao.png" alt=""> 支付宝
      </div>
      <div class="payTypeCon"  v-bind:class="{'payTypeClass':payType === 2 }" @click="payType = 2">
        <img src="../assets/weixin.png" alt=""> 微信支付
      </div>
    </div>

    <div class="payType">
      <span></span>
      <p>支付金额</p>
    </div>

    <div class="payNum">
      <div class="payNumCon" v-for="(i,index) in payNum" :key='i.num1' @click="payNumCheck = index" v-bind:class="{'activeClass':payNumCheck === index }" >
        <p>{{i.num1}}金币</p>
        <h6>{{i.num2}}元</h6>
        <span v-if="hotNum.indexOf(index)>-1">热</span>
      </div>
    </div>

    <div class="payXy">
      <el-checkbox v-model="checked"></el-checkbox>
      <span @click="drawer = true">我已阅读并同意《用户充值协议》</span>
    </div>

    <div class="payBtn" @click="payBtn">立即支付 <p>充值前，请先确认您已年满18周岁</p></div>

    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      direction='btt'
      :with-header="false">
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script>

export default {
  name: "Home",
  components: {
  },
  data(){
    return{
      userId:0,
      nickName:'aaa',
      payType:1,   //1:支付宝 2:微信支付
      payNumCheck:0,
      headerUrl:'',

      payNum:[
        {num1:'60',num2:'6'},{num1:'110',num2:'11'},{num1:'120',num2:'12'},
        {num1:'130',num2:'13'},{num1:'140',num2:'14'},{num1:'150',num2:'15'},
        {num1:'160',num2:'16'},{num1:'170',num2:'17'},{num1:'180',num2:'18'},
      ],
      checked:false,
      hotNum:[1, 2 ],
      drawer:false,
    }
    },
    mounted(){
      this.initData();
    },
  methods: {
    initData(){
      if(this.$route.query.userId!=undefined){
        this.headerUrl = this.$route.query.headerUrl;
        this.nickName = this.$route.query.nickName;
        this.payNumCheck = Number(this.$route.query.goldNumber);
        this.userId = this.$route.query.userId;
        this.payType = Number(this.$route.query.payType);
      }
    },
   payBtn(){
     //支付按钮
     if(!this.checked){
       this.$message({
          message: '请阅读并同意《用户充值协议》',
          type: 'warning',
          offset:50
        });
        return;
     }
      //  this.$axios.getGift().then(data => {
    //      console.log(data)
    //     }).catch(err => {
    //       console.log('获取失败')
    //     })
     if(this.payType === 1){
       this.payZFB();
     }else{
       this.payWX();
     }
   },
   //微信支付
    payWX(){
      console.log('WX')
    },
    onBridgeReady() {
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          "appId": $("#text-appid").val(), //公众号名称，由商户传入     
          "timeStamp": $("#text-nonceStr").val(), //时间戳，自1970年以来的秒数     
          "nonceStr": $("#text-nonceStr").val(), //随机串     
          "package": "prepay_id=" + $("#text-prepayid").val(),
          "signType": "MD5", //微信签名方式：     
          "paySign": $("#text-paySign").val() //微信签名 
        },
        function (res) {
          console.log("微信支付返回值:");
          console.log(res);

          if (res.err_msg == "get_brand_wcpay_request:ok") {
              // 使用以上方式判断前端返回,微信团队郑重提示：
              //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
              alert("get_brand_wcpay_request:ok");
          }

          alert(res.err_msg);
          alert(res); // 显示是个 Object
      });
    },

    //支付宝支付
    payZFB(){
      console.log('ZFB')
      ap.tradePay({
        orderStr: 'timestamp=2016-12-27%2018%3A00%3A00&method=alipay.trade.app.pay&app_id=2014073000007292......'
      }, function(res){
        ap.alert(res.resultCode);
      });
    },

  }
};
</script>

<style scoped>  
    .home{
      width:100vw;
    }
    .topBanner{
      width: 100%;
      height: 20.3vw;
      /* background: palevioletred; */
    }
    .topBanner img{width: 100%;}
    .useMesg{
      margin:15px 15px 27.5px 15px;
      width: 86.14vw;
      height: 23.74vw;
      background:linear-gradient(-57deg,rgba(251,197,188,1),rgba(254,164,164,1));
      border-radius:30px 30px 0px 0px;
      padding:5.86vw 0 0 5.86vw;
      display:flex;
    }
    .useMesgHead{
      width: 18.1vw;
      height: 18.1vw;
      border-radius: 50%;
      background: white;
      overflow: hidden;
    }
    .useMesgHead img{width: 100%;}
    .useMesgName{
      padding-left: 5.1vw;
      width:59vw;
    }
    .useMesgName h6{
      font-size:15px;
      font-family:PingFang SC;
      font-weight:100;
      color:rgba(255,255,255,1);
      line-height:27px;
      text-align: left;
    }
    .payType{
      padding: 0 8.8vw;
      display:flex;
      justify-content: space-between;
    }
    .payTypeCon{
      width:36.5vw;
      height:15.6vw;
      line-height:15.6vw;
      color:#333333;
      background:#F3F4F5;
      border-radius:20px;
    }
    .payTypeCon img{width:5.87vw;vertical-align: sub;}
    .payType{
      padding: 0 8.8vw 5.3vw 8.8vw;
      position: relative;
    }
    .payType span{
      width: 90%;
      display:block;
      border-bottom:1px solid rgba(238,238,238,1);
      position: absolute;
      top: 11px;
      left: 5%;
      z-index: -1;
    }
    .payType p{
      width:26.6vw;
      background: white;
      margin: 0 auto;
    }
    .payTypeClass{ 
      color:#FFFFFF;
      background:linear-gradient(-57deg,rgba(251,197,188,1),rgba(254,164,164,1));
    }
    .payNum{
      padding: 0 0.8vw 0 5.3vw;
      display:flex;
      flex-wrap: wrap;
    }
    .payNumCon{
      width:26.8vw;
      height:17.6vw;
      background:#F3F4F5;
      border-radius:10px;
      margin: 0 4.5vw 3.5vw 0;
      position: relative;
    }
    .payNumCon p{font-size: 17px;color:#333333;margin: 10px 0 2px 0;}
    .payNumCon h6{font-size: 12px;color:#999999;}
    .payNumCon span{
      font-size: 12px;
      color:white;
      position: absolute;
      top:0;
      right: 0;
      width: 22px;
      height: 22px;
      border-radius: 0 10px 0 10px;
      background:linear-gradient(-57deg,rgba(251,197,188,1),rgba(254,164,164,1));
    }
    .activeClass{
      background:linear-gradient(-57deg,rgba(251,197,188,1),rgba(254,164,164,1));
    }
    .payNum .activeClass p{color:white;}
    .payNum .activeClass h6{color:white;}

    .payXy /deep/ .el-checkbox__input.is-checked .el-checkbox__inner{
      background:rgba(255,136,144,1);
      border-color: rgba(255,136,144,1);
      border-radius: 50%;
    }
    .payXy /deep/ .el-checkbox__inner{border-radius: 50%;}
    .payXy /deep/ .el-checkbox__inner:hover {
    border-color: rgba(255,136,144,1);
    border-radius: 50%;
    }
    .payXy{
      font-size: 10px;
      text-align: left;
      padding-left: 5.3vw;
    }
    .payXy span{padding-left: 5px;}

    .payBtn{
      width:100%;
      height: 11.3vw;
      position: fixed;
      bottom: 0;
      left: 0;
      background: #FF8890;
      font-size: 16px;
      color:white;
      padding-top: 2vw;
    }
    .payBtn p{
      font-size: 9px;
      color:#CCCCCC;
    }
    
</style>
