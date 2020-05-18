<template>
    <div>
        <head-top></head-top>
		<section class="data_section">
			<header class="section_title">欢迎使用本系统</header>
            <!-- <el-main>
            <el-row :gutter="20"  style="margin-bottom: 10px;">
                <el-col :span="4"><div class="data_list today_head"><span class="data_num head">当日考勤数据：</span></div></el-col>
				<el-col :span="4"><div class="data_list"><span class="data_num">{{checkpeople}}</span> 考勤人数：</div></el-col>
				<el-col :span="4"><div class="data_list"><span class="data_num">{{uncheckpeople}}</span> 未考勤人数：</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num"></span> 自动考勤状态： <el-tag v-if="checkstatus==false" type="primary">已关闭</el-tag> <el-tag v-if="checkstatus==true" type="danger">已开启</el-tag></div></el-col><el-switch v-model="checkstatus" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
			</el-row>
            <el-row :gutter="20"  style="margin-bottom: 10px;">
                <el-col :span="4"><div class="data_list all_head"><span class="data_num head">当日天气数据：</span></div></el-col>
				<el-col :span="4"><div class="data_list"><span class="data_num">{{temp}}</span> 温度：</div></el-col>
				<el-col :span="4"><div class="data_list"><span class="data_num">{{intro}}</span> 详情：</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num"></span> 获取天气状态： <el-tag v-if="weatherstatus==false" type="primary">已关闭</el-tag> <el-tag  v-if="weatherstatus==true" type="danger">已开启</el-tag></div></el-col><el-switch @change="changeWeather()" v-model="weatherstatus"  active-color="#13ce66" inactive-color="#ff4949"></el-switch>
			</el-row>
            </el-main> -->
		</section>
		
    </div>
</template>

<script>
	import headTop from '../components/headTop'
	import tendency from '../components/tendency' 
    export default {
    	data(){
    		return {
    			userCount: null,
    			orderCount: null,
                checkstatus: null,
                allUserCount: null,
                allOrderCount: null,
                allAdminCount: null,
                weatherstatus:false,
                checkstatus:false,
                checkpeople:null,
                uncheckpeople:null,
                temp:null,
                intro:null,
    		}
    	},
    	components: {
    		headTop,
    		tendency,
    	},
    	mounted(){
    		
    	},
        computed: {

        },
    	methods: {
            changeWeather(){
                const params=new URLSearchParams()//接口定义了一些实用的方法来处理 URL 的查询字符串。                
                console.log(this.weatherstatus)
                if(this.weatherstatus==false)
                    params.append('flag',1)
                else
                    params.append('flag',1)		
                let req = {
                    type:"get",
                    url:'Controller/weatherControl/',
                    //post请求写data get请求写params
                     params:params
                }
                this.getFN(req).then(r=>{
                    if(r.data==1)
                    this.weatherstatus = true;
                    else
                    this.weatherstatus = false;                                
                    if (r.status == 1) {
                    this.$message({
                        type: 'success',
                        message: r.result
                    });
                    }else{
                        this.$message({
                            type: 'error',
                            message: r.result
                        });
                    }
                })	
            },

		}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.data_section{
		padding: 20px;
		margin-bottom: 40px;
		.section_title{
			text-align: center;
			font-size: 30px;
			margin-bottom: 10px;
		}
		.data_list{
			text-align: center;
			font-size: 14px;
			color: #666;
            border-radius: 6px;
            background: #E5E9F2;
            .data_num{
                color: #333;
                font-size: 26px;

            }
            .head{
                border-radius: 6px;
                font-size: 22px;
                padding: 4px 0;
                color: #fff;
                display: inline-block;
            }
        }
        .today_head{
            background: #FF9800;
        }
        .all_head{
            background: #20A0FF;
        }
	}
    .wan{
        .sc(16px, #333)
    }
</style>
