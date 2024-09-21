<template>
    <div class="client">
        <div class="select">
            <span class="dis1">本进程标识</span>
            <select  v-model="selectedValue">
                <option v-for="option in options" :value="option.text"  >
                    {{ option.text }}
                </option>
            </select>
        </div>
        <div class="address">
            <div>
                <span class="dis2">交换机：IP地址</span>
                <input type="text" autofocus="true"  v-model="exchangeip"  id="input" placeholder="请输入IP地址" @blur="setvalue"/>
            </div>
            <div>
                <span>端口号</span>
                <input type="text" autofocus="true"  v-model="exchangeport"  id="input" placeholder="请输入端口号" @blur="setvalue"/>
            </div>
        </div>
        <div class="message">
            <div>
                <span class="dis3">发送内容</span>
                <input type="text" autofocus="true"  v-model="content"  id="input" placeholder="请输入要发送的内容" @blur="setvalue"/>
                <button @click="sendMessage">发送</button>
            </div>
        </div>
        <div class="content">
            <div class="content1">
                <div  class="text" v-for="(item,index) in messages"  >{{item}}</div>
                
            </div>
            <div class="content2">
                <button  @click="fetchData('http://localhost:7778/client/closeClient')">关闭</button>
            </div>
        </div>
    </div>
  </template>
   
<script>
import axios from 'axios';
export default {
    name: "client",
    data(){
        return{
            selectedValue:"",
            selected: '',
            options: [
            { value: 'option1', text: 'A' },
            { value: 'option2', text: 'B' },
            { value: 'option3', text: 'C' }
            ],
            checkedValues: [],
            messages:[],
            exchangeip:"",
            exchangeport:"",
            content:"",
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
        this.storeData=this.fileStore.get('client');
        console.log(this.storeData);
        this.selectedValue=this.storeData.name;
        this.exchangeip=this.storeData.exchangeip;
        this.exchangeport=this.storeData.exchangeport;
        this.content=this.storeData.message.content;
        
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
        setvalue(e)
        {
            console.log(e.target.value)
            console.log("bbbbbbbbb")
            console.log(this.exchangeip)


        },
        sendMessage(){
            
            /*
            let data={
                name:"A",
                exchangeip:"127.0.0.1",
                exchangeport:8076,
                message:{
                    sorip:"10.0.0.1",
                    sorport:"9187",
                    desip:"127.0.0.3",
                    desport:8078,
                    content:"你好吗，我是客户端" 
                }   
            }
            */
            let data={
                name:this.selectedValue,
                exchangeip:this.exchangeip,
                exchangeport:this.exchangeport,
                message:{
                    sorip:"10.0.0.1",
                    sorport:"9187",
                    desip:"127.0.0.3",
                    desport:8079,
                    content:this.content
                }   
            }

            this.fileStore.set('client',data);

            let info="向Server请求报文："+data.message.content;    
            this.messages.push(info);
            axios.post('http://localhost:7778/client/openClient', data)
                .then(response => {
                    // 处理返回的数据
                    console.log(response.data);
                    let info1="收到："+response.data;    
                    this.messages.push(info1);
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

.client{
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
    

    

}
.select{
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 15px;
    font-weight: bold;
}
.address{
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    font-weight: bold;
}
.message{
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
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
    width:calc(100% - 160px);
    height:calc(100vh - 200px);
    margin-right: 30px;
    display: flex;
    padding: 15px;
    margin-bottom: 5px;
    
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
.content2{
    
    height:calc(100vh - 170px);
    // margin-bottom: 110px;
    display: flex;
    align-items: flex-end;


}
.text{
    background-color: #fffcfc;
    width: calc(100% - 20px);
    word-wrap:break-word; 
    text-align: left;
    margin-bottom: 5px;
    padding:10px 10px;
    border-radius: 5px;
    font-size:17px;
    

}
select  {
    
    background-color: #fff; /* 背景颜色 */
    border: none; /* 边框 */
    border-radius: 2px; /* 边框圆角 */
    padding: 5px; /* 内边距 */
    font-size: 16px; /* 字体大小 */
    color: #555; /* 文本颜色 */
    margin: 3px 10px;
    width: 60px;
    &:focus {
        outline: none; /* 去除默认的蓝色轮廓 */
    }
}
option{
        background-color: #fff; /* 选项的背景颜色 */
        padding: 3px; /* 选项的内边距 */
        border: none; /* 选项的边框 */
}

// option:checked {
//   background-color: #4350b1;
//   color: #000;
// }
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
  font-size: 15px;
//   &::-webkit-input-placeholder{
//     font-size: 15px;
//   }

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
    width: 70px;
    height:30px;
    border-radius: 5px;
    color: #fff;
    &:active{
        background-color: #23abffc7;
    }
    

}
</style>
