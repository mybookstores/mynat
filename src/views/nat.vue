<template>
  <div class="nat">
      
      <div class="address">
          <div>
              <span class="dis2">服务器进程：IP地址</span>
              <input type="text" autofocus="true"  v-model="serverip"  id="input" placeholder="请输入IP地址" @blur="setvalue"/>
          </div>
          <div>
              <span>端口号</span>
              <input type="text" autofocus="true"  v-model="serverport"  id="input" placeholder="请输入端口号" @blur="setvalue"/>
          </div>
      </div>
      <div class="mybutton">
        <div >
              <button class="mybutton1"  @click="sendMessage">开始工作</button>
        </div>
        <div >
            <button  @click="fetchData('http://localhost:7778/client/closeNat')">关闭</button>
        </div>
      </div>
      <table>
 				<tr>
 					<th>协议</th>
 					<th>内网IP</th>
 					<th>内网端口</th>
 					<th>公网IP</th>
 					<th>公网端口</th>
 					<th>剩余时间</th>
 				</tr>
 				<tr v-for="(item,index) in transitions">
 					<td>{{item.protocal==0 ? 'TCP' : 'UDP'}}</td>
 					<td>{{item.sorip}}</td>
 					<td>{{item.sorport}}</td>
 					<td>{{item.publicip}}</td>
 					<td>{{item.publicport}}</td>
 					<td>{{5-item.passbytime}}天</td>
 					</tr>
           <tr v-for="n in (4-transitions.length)">
 					<td></td>
 					<td></td>
 					<td></td>
 					<td></td>
 					<td></td>
 					<td></td>
 					</tr>
 			</table>

      <div class="content">
          <div class="content1">
              <div  class="text" v-for="(item,index) in messages"  >{{item}}</div>
              
          </div>
      </div>


  </div>
</template>
 
<script>
import axios from 'axios';
export default {
  name: "nat",
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
          transitions: [],
          serverip:"",
          serverport:"",
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
        this.storeData=this.fileStore.get('nat');
        console.log(this.storeData);
        if(this.storeData)
        {
          this.serverip=this.storeData.serverip;
          this.serverport=this.storeData.serverport;
        }

    this.getMessage2();
    this.getTransition();
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
      sendMessage(){
            let data={
                innerport:8077,
                serverip:this.serverip,
                serverport:this.serverport,
                exteriorip:"128.0.0.9",
                exteriorport:6099
            }

            this.fileStore.set('nat',data);

            /*
            let data={
                innerport:8077,
                serverip:"127.0.0.3",
                serverport:8078,
                exteriorip:"128.0.0.9",
                exteriorport:6099
            }
            */
            axios.post('http://localhost:7778/client/openNat', data)
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

        },
        getTransition()
        {
            axios.get("http://localhost:7778/client/getTransition")
            .then(response => {
                // 处理返回的数据
                console.log(response.data);
                this.transitions=response.data;
                
                
            })
            .catch(error => {
                // 处理错误
                console.error(error);
            });
        },
        getMessage2()
      {
        axios.get("http://localhost:7778/client/getMessage2")
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
      }

  }
};
</script>

<style scoped lang="scss">

.nat{
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
  padding-bottom: 10px;

  

}

.address{
  margin-top: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-weight: bold;
}

.content{
  width: 100%;
  // background-color: #4183c4;
  height: 100%;
  display: flex;
  align-items: flex-start;
  
  
}
.content1{
  background-color: #fff;
  width:calc(100% - 80px);
  height:calc(100vh - 320px);
  margin-right: 30px;
  display: flex;
  padding: 15px;
  // margin-bottom: 15px;
  
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
  // justify-content: center;
  margin-bottom: 15px;
}
.mybutton1{
  margin-right: 30px;
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
table{
    // width: 90%;
    width:calc(100% - 50px);
  // height:calc(100vh - 200px);
    margin-bottom: 15px;
    border-collapse: collapse;
}

td {
  padding: 7px 10px;
  font-size: 15px;
  // font-family: Verdana;
  font-weight: bold;
  height: 15px;
}
th {
  
  padding: 7px 10px;
  font-size: 15px;
  background-color: #0591e8;
  font-weight: bold;
  color: #fff;
}
// tr:nth-child(even) {
//     background-color: antiquewhite;
// }
tr{
  border:1px solid #0591e8;
}
</style>
