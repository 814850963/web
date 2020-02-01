<template>
    <div class="fillcontain">
        <head-top></head-top>
        <header class="admin_title">今天的考勤比例</header>
        <template>
        <ve-pie :data="chartData" :settings="chartSettings"></ve-pie>
        </template>
    </div>
</template>

<script>
	import headTop from '../components/headTop'    

    export default {
        data(){
            return {
                chartSettings: { type: 'pie' },
                chartData: {
                columns: ['key', 'value'],
                rows: []
                },

            }
        },
        mounted(){
            this.getDayCheck()  
        },
    	components: {
    		headTop,
    	},
        computed: {            
        },
        methods: {
            //获取一天考勤记录
            getDayCheck(){
                const params=new URLSearchParams()//接口定义了一些实用的方法来处理 URL 的查询字符串。                		
                let req = {
                    type:"get",
                    url:'checkList/GetDayCheck/',
                    //post请求写data get请求写params
                     params:params
                }
                this.getFN(req).then(r=>{
                    this.tableData = r.data;                           
                    this.chartData.rows.push({'key':'签到人数','value':r.good})
                    this.chartData.rows.push({'key':'未签人数','value':r.bad})
                    if (r.status == 1) {
                    this.$message({
                        type: 'success',
                        message: r.result
                    });
                    }else{
                        this.$message({
                            type: 'error',
                            message: "失败"
                        });
                    }
                })		            
            },
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .admin_title{
        text-align: center;
        font-size: 50px;
        width: 100%;
        height: auto;
    }
</style>
