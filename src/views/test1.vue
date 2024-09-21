<template>
    <div class="layout">
      <div class="left" >
        <!-- 侧边栏 -->
            <div  :class="['list',{active:activeItem=='client'}]"  @click="changeSidebar('client')">
                <img src="../assets/icon/client.png" class="img">
                <span>客户端</span>
            </div>
            <div  :class="['list',{active:activeItem=='exchange'}]"   @click="changeSidebar('exchange')">
                <img src="../assets/icon/exchange.png" class="img">
                <span>交换机</span>
            </div>
            <div  :class="['list',{active:activeItem=='nat'}]"   @click="changeSidebar('nat')">
                <img src="../assets/icon/router.png" class="img">
                <span>路由器</span>
            </div>
            <div   :class="['list',{active:activeItem=='server'}]"   @click="changeSidebar('server')">
                <img src="../assets/icon/server.png" class="img">
                <span>服务端</span>
            </div>
        </div>
        <div class="right">
            <!-- 右侧的视图核心 -->
            <router-view></router-view>
        </div>
    </div>
  </template>
  <script>


  export default {
    name: "test1",
    data() {
      return {
        activeItem:""
      };
    },
    mounted() {
    //   this.sidebarItem = this.$route.name;
    },
    methods: {
      changeSidebar(name) {
        // this.sidebarItem = name;
        this.$router.push({
          path: name,
        });
        this.activeItem=name;
      },
      gopage1(url)
      {
        
        this.$router.push(url)
      }
    },
  };
  </script>

<style scoped lang="scss">
*{
    padding:0;
    margin: 0;
    
}

:root{
    height: 100%;
    /* background-color: blue; */
}
.img{
    width:25px;
    height:25px;
    margin-right: 15px;
}
.layout{
    
    top:0;
    width: 100%;
    height: 100vh; /*设置高度无效*/
    
    display: flex;
    padding:0;
    margin-top: -60px;
    box-sizing: border-box;
    color: #000;
}
.left{
    position: relative;
    width: 200px;
    height:100%;
    background-color: #fff;
    color: #000;

}
.right{
    width: calc(100% - 200px);
    height:100%;
    background-color:#fff;
    
}
.list{
    background-color: #fafafa;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    border-bottom: 1px solid #fff; 

}
.active{
    background-color: #e8f6ff;
}
</style>


  
   