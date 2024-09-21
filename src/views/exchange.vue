<template>
  <div class="exchange">
      
      <div class="address">
          <div>
              <span class="dis2">NAT网关：IP地址</span>
              <input type="text" autofocus="true"  v-model="natip"  id="input" placeholder="请输入IP地址" @blur="setvalue"/>
          </div>
          <div>
              <span>端口号</span>
              <input type="text" autofocus="true"  v-model="natport"  id="input" placeholder="请输入端口号" @blur="setvalue"/>
          </div>
      </div>
      
      <div class="content">
          <div class="content1">
              <div  class="text" v-for="(item,index) in messages"  >{{item}}</div>
              
          </div>
      </div>
      <div class="mybutton">
        <div >
              <button class="mybutton1"  @click="sendMessage">开始工作</button>
        </div>
        <div >
            <button  @click="fetchData('http://localhost:7778/client/closeExchange')">关闭</button>
        </div>
      </div>

      <!-- <div class="button" @click="fetchData('http://localhost:7777/client/openClient')">
              <button>客户端</button>
      </div>
      <div class="button" @click="fetchData('http://localhost:7777/client/openExchange')">
              <button>exchange</button>
      </div>
      <div class="button" @click="fetchData('http://localhost:7777/client/openNat')">
              <button>nat</button>
      </div>
      <div class="button" @click="fetchData('http://localhost:7777/client/openServer')">
              <button>服务端</button>
      </div> -->
  </div>
</template>
 
<script>
import axios from 'axios';
export default {
  name: "exchange",
  data(){
      return{
          selected: '',
          options: [
          { value: 'option1', text: 'A' },
          { value: 'option2', text: 'B' },
          { value: 'option3', text: 'C' }
          ],
          checkedValues: [],
          messages:[],
          natip:"",
          natport:"",
          storeData:"" 

      }
      
  },
  setup(){
        const Store=window.require('electron-store');
        const fileStore= new Store({"name":"filesInfo"});

        return{
            fileStore
        }
        

    },
  mounted(){

        this.storeData=this.fileStore.get('exchange');
        console.log(this.storeData);
        if(this.storeData)
        {
          this.natip=this.storeData.natip;
          this.natport=this.storeData.natport;
        }
        

      this.getMessage1();

  },
  updated(){
    // this.getMessage1();
  },
  methods:{
      fetchData(url) {
          axios.get(url)
          .then(response => {
              // 处理返回的数据
              console.log(response.data);
          })
          .catch(error => {
              // 处理错误
              console.error(error);
          });
      },
      getMessage1()
      {
        axios.get("http://localhost:7778/client/getMessage1")
          .then(response => {
              // 处理返回的数据
              console.log(response.data);
              if(response.data)
              {
                // let info1="收到："+response.data.content;    
                
                for(let i in response.data)
                {
                  this.messages[i]=response.data[i].content;
                }
              }
              
          })
          .catch(error => {
              // 处理错误
              console.error(error);
          });
      },
      sendMessage(){
            let data={
                    
                exchangeport:8066,
                natip:this.natip,
                natport:this.natport
            }

            this.fileStore.set('exchange',data);

            /*
            let data={
                
                exchangeport:8076,
                natip:"127.0.0.2",
                natport:8077
            }
            */
            axios.post('http://localhost:7778/client/openExchange', data)
                .then(response => {
                    // 处理返回的数据
                    console.log(response.data);
                    // let info="向Server请求报文："+response.data.content;    
                    // this.messages.push(info);
                })
                .catch(error => {
                    // 处理错误
                    console.error(error);
                });
            // let info="向Server请求报文："+data    
            // this.messages.push()    

        }
  }
};
</script>

<style scoped lang="scss">

.exchange{
  // height: 100%;
  width: 100%;
  background-color: #faf8f8;
  display: flex;
  flex-wrap: wrap;
  color: #000;
  padding-left: 30px;
  padding-top: 5px;
  font-size: 17px;
  align-content: flex-start;
  box-sizing: border-box;
  padding-bottom: 30px;

  

}

.address{
  margin-top: 15px;
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  font-weight: bold;
}

.content{
  width: 100%;
  // background-color: #4183c4;
  height: 100%;
  display: flex;
  align-items: flex-start;
  
  margin-bottom: 10px;
}
.content1{
  background-color: #fff;
  width:calc(100% - 80px);
  height:calc(100vh - 200px);
  margin-right: 30px;
  display: flex;
  padding: 15px;
  margin-bottom: 15px;
  
  border-radius: 10px;
  
  font-size: 16px;
  flex-wrap: wrap;
  align-content: flex-start;
  box-shadow: 2px 3px 5px 0px rgba(0,0,0,0.5);
  overflow-x: hidden;
  overflow-y: hidden;
  &:hover{
    overflow-y: overlay;
  }
  
}

.text{
  background-color: #fffcfc;
  width: calc(100% - 20px);
  word-wrap:break-word; 
  text-align: left;
  margin-bottom: 5px;
  padding:10px 10px;
  border-radius: 5px;
  
  // white-space: pre-;

}
.mybutton{
  display: flex;
  // background-color: #ff0;
  width: 100%;
  justify-content: center;
}
.mybutton1{
  margin-right: 60px;
}
input{
border:none;
border-radius: 4px;
width:180px;
height:30px;
margin-left: 10px;
margin-right: 25px;
box-sizing: border-box;
&:focus {
  border: 1px solid #4183c4; 
      outline: none; 
      // height:28px;
      // width:178px;
}
padding-left:10px;
&::-webkit-input-placeholder{
  font-size: 15px;
}
}
.dis1{
  margin-right: 44px;
}
.dis2{
  margin-right: 10px;
}
.dis3{
  margin-right: 62px;
}
button{
  border: none;
  font-size: 15px;
  background-color: #0591e8;
  width: 90px;
  height:34px;
  border-radius: 5px;
  color: #fff;
  padding: 5px;
  &:active{
      background-color: #23abffc7;
  }
  

}
</style>
