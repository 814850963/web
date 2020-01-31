<template>
    <div>
        <head-top></head-top>
		 <div class="table_container">
              <el-table
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
                <!-- 学生姓名 -->
                <el-table-column
                label="姓名"
                prop="name">
                </el-table-column>
                <!-- 学号 -->
                <el-table-column
                label="学号"
                prop="account">
                </el-table-column>
                <!-- 头像 -->
                <el-table-column
                label="头像"
                prop="headpic">
                <template slot-scope="scope">
                    <img
                        style="width: 60px; height: 70px"
                        :src="scope.row.headpic"
                        />                                        
                </template>
                </el-table-column>
                <!-- 年级 -->
                <el-table-column
                label="年级"
                prop="grade">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.grade===1"  type="info">大一</el-tag>
                    <el-tag v-if="scope.row.grade===2"  type="success">大二</el-tag>
                    <el-tag v-if="scope.row.grade===3"  type="warning">大三</el-tag>
                    <el-tag v-if="scope.row.grade===4"  type="danger">大四</el-tag>
                </template>
                </el-table-column>
                <!-- 状态 -->
                <el-table-column
                label="状态"
                prop="status">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.status==0"  type="danger">未打卡</el-tag>
                    <el-tag v-if="scope.row.status==1"  type="success">已打卡</el-tag>                    
                </template>
                </el-table-column>
            </el-table>
        </div>
        <template>
        <ve-pie :data="chartData" :settings="chartSettings"></ve-pie>
        </template>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
    // import visitorPie from '@/components/visitorPie'	
    export default {
    	data(){
            return {                             
                tableData: [],
                classid: 0,
                search: '',
                currentPage: 0,
                count:0,
                options: [],
                classname:'',
                time:'',
                place:'',
                weekday:'',
                total:'',   
                visible:'',  
                addUser: {
                username: '',
                password: '',
                email: '',
                account: '',                   
                pic:'',
                stupic:'',
                },
                chartSettings: { type: 'pie' },
                chartData: {
                columns: ['key', 'value'],
                rows: []
                }           
            }
        },
    	components: {
    		headTop,
            // visitorPie,
        },
        activated() {
            //获取路由传参            
            this.checkid = this.$route.query.checkid            
            this.getStudentChecked()                        
        },
    	mounted(){
            if(!sessionStorage.getItem("authen"))
            {
                this.$router.push('/')
            }        
        },
    	methods: {
            //获取考勤数据
            getStudentChecked(){
                const params=new URLSearchParams()//接口定义了一些实用的方法来处理 URL 的查询字符串。                
                params.append('checkid',this.checkid)			
                let req = {
                    type:"get",
                    url:'checkList/GetClassCheck/',
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
            }
        }
    }
</script>

<style lang="less">
	@import '../style/mixin';
	
</style>
