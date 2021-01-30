<!---进度条组件---> 
<template>
    <div class="progress_jlschart">
        <div class="progress_t">{{item.name}}</div>
        <div class="progressContainer">
            <div :class="'progress '+item.color"  :style="{width:item.width+ '%' }" ></div>
        </div>
        <div class="progress_center" v-if="item.type==1">
            <p>{{item.min}}</p>
            <p>{{item.value?item.value:0}}</p>
            <p>{{item.max}}</p>
        </div>
    </div>
</template>
<script >
export default {
    name:"proess",
    props:{
        item:Object,
        onOrOff:[String, Number],
        inder:[String,Number]  
    },
    data(){
        return {
        }
    },
    methods:{
       
    },
    mounted(){
    },
    created(){
      console.log(this.item,555555555)
    }
}
</script>

<style scoped lang="less">
    .progress_jlschart {
        width: 187px;
        height:53px;
        background: rgba(26, 72, 150, 0.4);
        margin-left: 10px;
        .progress_t{
            font-size: 12px;
            font-weight: 400;
            color: #FFFFFF;
            padding-top:5px;
            padding-left:5px;
            padding-bottom:4px;
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
                 background: linear-gradient(-90deg, #3A5DFF, #2FCED6);
            }
            .col0{
                background: #D4AB1B;
            }
            .col7{
                background: #FF0000;
            }

        }
        .progress_center {
            display: flex;
            flex: 1;
            padding:0 10px;
            justify-content: space-between;
            font-size: 12px;
            color: #ffffff;
        }
    }
</style>
