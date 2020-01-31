<template>
    <div>
        <head-top></head-top>
		 <div class="table_container">
             <div> {{classname}}   {{time}}   {{place}}   {{weekday}}  {{total}}</div>
            <!-- 关键字搜索 -->
           <el-input style="width:180px" name="search" v-model="search" placeholder="按日期搜索"></el-input>
            <!-- 开启考勤 -->
            <el-popover
            placement="top"
            width="160"
            v-model="visible">
            <p>操作不可逆确定吗？</p>
            <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="visible = false,startcheck()">确定</el-button>
            </div>
            <el-button slot="reference">开启考勤</el-button>
            </el-popover>          
            <!-- 考勤信息表格 -->
           <el-table
                :data="tableData.filter(data => !search || data.time.includes(search))"
                style="width: 100%">
                <!-- 考勤日期 -->
                <el-table-column
                label="考勤时间"
                prop="time">
                </el-table-column>
                <!-- 负责教师 -->
                <el-table-column
                label="负责教师"
                prop="teachername">
                </el-table-column>
                <!-- 状态 -->
                <el-table-column
                label="状态"
                prop="status">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.status==0"  type="info">结束</el-tag>
                    <el-tag v-if="scope.row.status==1"  type="success">考勤中</el-tag>
                </template>
                </el-table-column>
                <!-- 操作专业对象 -->
                <el-table-column
                label="操作"
                >
                <template slot-scope="scope">
                    <el-dropdown split-button type="primary" @click="showstudent( scope.row)">
                    查看考勤学生
                    <el-dropdown-menu slot="dropdown">                       
                        <el-dropdown-item  @click.native="editstatus( scope.row)">查看考勤比例图表</el-dropdown-item>                    
                    </el-dropdown-menu>
                    </el-dropdown>
                </template>
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="10"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>
        </div>
        <!-- <visitor-pie :pieData="pieData"></visitor-pie> -->
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
            }
        },
    	components: {
    		headTop,
            // visitorPie,
        },
        activated() {
            //获取路由传参            
            this.classid = this.$route.query.classid
            this.getcheckList()
            this.getClassInfo()   
            console.log(this.time)         
        },
    	mounted(){
            if(!sessionStorage.getItem("authen"))
            {
                this.$router.push('/')
            }        
        },
    	methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            //当页面发生改变时
            handleCurrentChange(val) {
                this.currentPage = val;
                const params=new URLSearchParams()//接口定义了一些实用的方法来处理 URL 的查询字符串。
				params.append('page',val)				
                params.append('classid',this.classid)			
                let req = {
                    type:"get",
                    url:'checkList/',
                    //post请求写data get请求写params
                     params:params
                }
                this.getFN(req).then(r=>{
                    this.tableData = r.data;                           
                    this.count = r.len;
                    if (r.status == 1) {
                    this.$message({
                        type: 'success',
                        message: "获取考勤列表"
                    });
                    }else{
                        this.$message({
                            type: 'error',
                            message: "获取考勤列表失败"
                        });
                    }
                })		
            },
            //查看考勤学生
             showstudent(val,flag) {                             
                 console.log(val)
                 this.$router.push({path:'checkStudent',query:{checkid:val.checkid}})
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            //开启考勤
            startcheck(){
                const params=new URLSearchParams()//接口定义了一些实用的方法来处理 URL 的查询字符串。                
                params.append('classid',this.classid)			
                let req = {
                    type:"post",
                    url:'checkList/startCheck/',
                    //post请求写data get请求写params
                     data:params
                }
                this.getFN(req).then(r=>{
                    this.tableData = r.data;                           
                    this.count = r.len;
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
            //获取考勤列表
            getcheckList(){			
                const params=new URLSearchParams()//接口定义了一些实用的方法来处理 URL 的查询字符串。
                params.append('page',1)	
                params.append('classid',this.classid)			
                let req = {
                    type:"get",
                    url:'checkList/',
                    //post请求写data get请求写params
                     params:params
                }
                this.getFN(req).then(r=>{
                    this.tableData = r.data;                           
                    this.count = r.len;
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
            //获取班级信息
            getClassInfo(){
                const params=new URLSearchParams()//接口定义了一些实用的方法来处理 URL 的查询字符串。
                params.append('classid',this.classid)			
                let req = {
                    type:"get",
                    url:'classList/getClassInfo/',
                    //post请求写data get请求写params
                     params:params
                }
                this.getFN(req).then(r=>{
                    this.classname=r.classname
                    this.place = r.place
                    this.time = r.time
                    this.total = r.total
                    this.weekday = r.weekday                                                                 
                })	
            },
             // 关闭弹框的回调
            addDialogClose() {
                this.resetFields()
            },
         },
         //点击取消的时候清理表格
         clearform(){
            this.editstuTableVisible = false
            this.addstuTableVisible = false
            this.resetFields()
         },
         //重置表格
         resetFields(){

         },
    }
</script>

<style lang="less">
	@import '../style/mixin';
	
</style>
