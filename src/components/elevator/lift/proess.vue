<!---进度条组件--->
<template>
    <div class="progress_jlschart">
        <div class="progress_t">{{item.name}}</div>
        <div class="progressContainer">
            <div class="progress" :class="getColor()" :style="{width: (inder * 1 > 4 ? '100%' : (item.value)/(item.max)*100 + '%' )}" ></div>
        </div>
        <div class="progress_center">
            <p>{{inder>4 ? '' : 0}}</p>
            <p>{{ inder>4 ? '' : item.value }}</p>
            <p>{{ inder>4 ? '' : item.max}}</p>
        </div>
    </div>
</template>
<script >

export default {
    name:"proess",
    props:{
        item:{
            type:Object,
            default:{}
        },
        onOrOff:[String, Number],
        inder:[String,Number]
    },
    data(){
        return {
        }
    },
    methods:{   
       // 前俩个狂的判断是，0 是蓝色，1是红色
       // 第三个是。1是蓝色，0是空色
       getColor: function(){
           if (this.item.color && this.onOrOff != 2){
               if(this.inder > 4 &&  this.inder < 7 && this.item.value == 0){
                   return 'col5'
               }else if(this.inder > 4 &&  this.inder < 7 &&  this.item.value == 1){
                   return 'col7'
               }else if(this.inder == 7 && this.item.value == 0){
                   return 'col7'
               }else if(this.inder == 7 && this.item.value == 1){
                   return 'col5'
               }
               return `${this.item.color}`
           }else{
               return 'col8'
           }
       }
    },
    mounted(){
    },
    created(){

    }
}
</script>

<style scoped lang="less">
    .progress_jlschart {
        height: 84px;
        background: rgba(26, 72, 150, 0.4);
        margin-left: 10px;
        margin-top: 20px;
        .progress_t{
            font-size: 12px;
            font-weight: 400;
            color: #FFFFFF;
            padding: 10px 0 10px 10px;
        }
        .progressContainer {
            position: relative;
            overflow: hidden;
            height: 8px;
            width: 96%;
            border-radius: 10px;
            background-color: #374789;
            margin-left: 2%;
            .progress{
                height: 100%;
                border-radius: 10px;
                background: #374789;
            }
            .col0{
                background: #D4AB1B;
            }
            .col1{
                background: linear-gradient(-90deg, #3A5DFF, #2FCED6);
            }
            .col2{
                background: linear-gradient(-90deg, #3A5DFF, #2FCED6);
            }
            .col3{
                background: linear-gradient(-90deg, #3A5DFF, #2FCED6);
            }
            .col4{
                background: linear-gradient(-90deg, #3A5DFF, #2FCED6);
            }
            .col5{
                background: linear-gradient(-90deg, #3A5DFF, #2FCED6);
            }
            .col6{
                background: linear-gradient(-90deg, #3A5DFF, #2FCED6);
            }
            .col7{
                background: #FF0000;
            }
            .col8{
                background: #BCBCBC;
            }

        }
        .progress_center {
            display: flex;
            flex: 1;
            padding:0 10px;
            justify-content: space-between;
            font-size: 12px;
            color: #ffffff;
            padding-top: 10px;
        }
    }
</style>
