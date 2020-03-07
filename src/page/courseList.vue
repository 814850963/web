<template>
    <div>
        <head-top></head-top>
		 <div class="table_container">
            <!-- 关键字搜索 -->
           <el-input style="width:180px" name="search" @keyup.enter.native="getCourseList" v-model="search" placeholder="输入要搜索课程的信息"></el-input>
        
            <!-- 按照状态检索 -->
            <el-cascader   
                :options="options"
                @change="handleChange"
                placeholder="请选择专业">
            </el-cascader>
            <!-- 添加课程 -->
            <el-button type="primary" @click="openaddcourse()">添加课程</el-button>
            <!-- 添加课程弹框 -->
            <el-dialog
            style="width:1050px; margin-left:20%;"            
            title="添加课程"
            @close="addDialogClose"
            :visible.sync="addstuTableVisible"
            :close-on-click-modal="false"
            >
            <!-- 添加课程的表单 -->
            <el-form enctype="multipart/form-data" ref="addFormRef" :rules="rulesAddUser" :model="addCourse" label-width="130px">
                <el-form-item prop="coursename" label="课程名称">
                    <el-input v-model="addCourse.coursename"></el-input>
                </el-form-item>
                <el-form-item prop="info" label="课程简介">
                    <el-input v-model="addCourse.info"></el-input>
                </el-form-item>
                 <el-form-item prop="major" label="专业">
                    <!-- 按照状态检索 -->
                    <el-cascader   
                        :options="options"
                        @change="handleaddusermg"                       
                        placeholder="请选择专业">
                    </el-cascader>
                </el-form-item>
                <el-form-item>
                    <el-button @click="clearform()">取消</el-button>
                    <el-button type="primary" @click="onAddCourse">确定</el-button>
                </el-form-item>
            </el-form>
            </el-dialog>
            <!-- 编辑课程弹框 -->
            <el-dialog
            style="width:1050px; margin-left:20%;"            
            title="编辑课程"
            @close="addDialogClose"
            :visible.sync="editstuTableVisible"
            :close-on-click-modal="false"
            >
            <!-- 编辑课程的表单 -->
            <el-form enctype="multipart/form-data" ref="addFormRef" :rules="rulesAddUser" :model="addCourse" label-width="130px">
                <el-form-item prop="coursename" label="课程名称">
                    <el-input v-model="addCourse.coursename"></el-input>
                </el-form-item>
                <el-form-item prop="info" label="课程简介">
                    <el-input v-model="addCourse.info"></el-input>
                </el-form-item>
                 <el-form-item prop="major" label="专业">
                    <!-- 按照状态检索 -->
                    <el-cascader   
                        :options="options"
                        @change="handleaddusermg"                       
                        placeholder="请选择专业"
                        v-model="defaultmajor">
                    </el-cascader>
                </el-form-item>
                <el-form-item>
                    <el-button @click="clearform()">取消</el-button>
                    <el-button type="primary" @click="onChangeUser">确定</el-button>
                </el-form-item>
            </el-form>
            </el-dialog>
            <!-- 状态修改页 -->
            <el-dialog
            style="width:1050px; margin-left:20%;"            
            title="修改状态"            
            :visible.sync="statusTableVisible"
            :close-on-click-modal="false"
            >
            <div style="margin-bottom:20px">
                <el-radio-group  v-model="stustatus">
                <el-radio-button  label="待开放"></el-radio-button>
                <el-radio-button  label="正常"></el-radio-button>
                <el-radio-button  label="禁用"></el-radio-button>
                <el-radio-button  label="异常"></el-radio-button>
                </el-radio-group>
            </div> 
                <el-button @click="statusTableVisible = false">取消</el-button>
                <el-button type="primary" @click="changeStatus()">确定</el-button>
            </el-dialog>                    
            <!-- 课程信息表格 -->
           <el-table
                :data="tableData"
                style="width: 100%">
                <!-- 课程姓名 -->
                <el-table-column
                label="课程名称"
                prop="name">
                </el-table-column>
                <!-- 学号 -->
                <el-table-column
                label="课程简介"
                prop="info">
                </el-table-column>
                <!-- 头像 -->
                <el-table-column
                label="所属专业"
                prop="mname">                            
                </el-table-column>
                <!-- 状态 -->
                <el-table-column
                label="状态"
                prop="status">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.status==0"  type="info">待开放</el-tag>
                    <el-tag v-if="scope.row.status==1"  type="success">正常</el-tag>
                    <el-tag v-if="scope.row.status==2"  type="warning">禁用</el-tag>
                    <el-tag v-if="scope.row.status==3"  type="danger">异常</el-tag>
                </template>
                </el-table-column>
                <!-- 操作课程对象 -->
                <el-table-column
                label="操作"
                >
                <template slot-scope="scope">
                    <el-dropdown split-button type="primary" @click="handleEdit( scope.row)">
                    编辑
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item  @click.native="showclass(scope.row)">查看班级</el-dropdown-item>                        
                        <el-dropdown-item  @click.native="editstatus( scope.row)">修改状态</el-dropdown-item>                    
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
                //搜索状态
                searchmajor:'',
                //课程的状态
                stustatus:'',                             
                tableData: [],
                courseid: 0,
                search: '',
                currentPage: 0,
                count:0,
                options: [],
                //默认的选项
                defaultmajor:[],
                //图片的显示格式
                fit:"fill",
                //添加课程
                addstuTableVisible:false,
                //修改课程
                editstuTableVisible:false,
                //修改状态
                statusTableVisible:false,
                //添加课程时的专业年级
                grade:'',
                major:'',
                // 添加课程
                addCourse: {
                    coursename: '',
                    info: '',                   
                },
                // 验证规则
                rulesAddUser: {
                    coursename: [
                    { required: true, message: '请输入课程名', trigger: 'blur' }
                    ],                                    
                    info: [
                    { required: true, message: '请输入简介', trigger: 'blur' },
                    { trigger: 'blur' }                                        
                    ],
                }
            }
        },
    	components: {
    		headTop,
            // visitorPie,
    	},
    	mounted(){
            if(!sessionStorage.getItem("authen"))
            {
                this.$router.push('/')
			}
			this.getCourseList();
            this.getAllMajor();
        },
    	methods: {
            //处理按照专业检索的请求
            handleChange(value) {
            if(value[0]==0)
            {
                this.getCourseList(); 
                this.searchmajor = null
            }                
            else
            {
                this.searchmajor = value[0]
                const params=new URLSearchParams()//接口定义了一些实用的方法来处理 URL 的查询字符串。
                params.append('major',value[0])	
                params.append('search',this.search)	
                let req = {
                    type:"get",
                    url:'courseList/',
                    //post请求写data get请求写params
                     params:params
                }
                this.getFN(req).then(r=>{
                    this.tableData = r.data;                
                    this.count = r.len;
                    if (r.status == 1) {
                    this.$message({
                        type: 'success',
                        message: "获取课程列表信息"
                    });
                    }else{
                        this.$message({
                            type: 'error',
                            message: "获取课程列表信息失败"
                        });
                    }
                })	
            }           
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            //当页面发生改变时
            handleCurrentChange(val) {
                this.currentPage = val;
                const params=new URLSearchParams()//接口定义了一些实用的方法来处理 URL 的查询字符串。
                params.append('page',val)		
                if(this.searchmajor!=null&&this.searchmajor!='')
                    params.append('major',this.searchmajor)		
                    params.append('search',this.search)	
                let req = {
                    type:"get",
                    url:'courseList/',
                    //post请求写data get请求写params
                     params:params
                }
                this.getFN(req).then(r=>{
                    this.tableData = r.data;                                
                    this.count = r.len;
                    if (r.status == 1) {
                    this.$message({
                        type: 'success',
                        message: "获取课程列表信息"
                    });
                    }else{
                        this.$message({
                            type: 'error',
                            message: "获取课程列表信息失败"
                        });
                    }
                })		
            },
            //处理编辑的按钮
             handleEdit(val,flag) {   
                this.addCourse.coursename = val.name
                this.addCourse.info = val.info   
                if(!flag)       
                this.editstuTableVisible = true
                this.courseid = val.courseid
                this.defaultmajor.push(val.major)
                this.major = val.major                
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            //获取课程列表
            getCourseList(){			
                const params=new URLSearchParams()//接口定义了一些实用的方法来处理 URL 的查询字符串。
                params.append('search',this.search)				
				params.append('page',1)				
                let req = {
                    type:"get",
                    url:'courseList/',
                    //post请求写data get请求写params
                     params:params
                }
                this.getFN(req).then(r=>{
                    this.tableData = r.data;                           
                    this.count = r.len;
                    if (r.status == 1) {
                    this.$message({
                        type: 'success',
                        message: "获取课程列表信息"
                    });
                    }else{
                        this.$message({
                            type: 'error',
                            message: "获取课程列表信息失败"
                        });
                    }
                })		
            },
            //获取所有专业详情
            getAllMajor(){
                const params=new URLSearchParams()//接口定义了一些实用的方法来处理 URL 的查询字符串。
				params.append('flag',1)	
                let req = {
                    type:"get",
                    url:'courseList/getAllMajor/',
                    //post请求写data get请求写params
                    params:params
                }
                this.getFN(req).then(r=>{                    
                    this.options = r;
                    if (r != null) {
                    this.$message({
                        type: 'success',
                        message: "获取专业信息成果"
                    });
                    }else{
                        this.$message({
                            type: 'error',
                            message: "获取专业信息失败"
                        });
                    }
                })	
            },
             // 关闭弹框的回调
            addDialogClose() {
                this.resetFields()
            },
            // 点击添加课程
            onAddCourse() {
            this.$refs.addFormRef.validate(async valid => {
                if (!valid) return null  // 如果验证失败就不往下继续执行
                const params=new FormData()//接口定义了一些实用的方法来处理 URL 的查询字符串。
				params.append('name',this.addCourse.coursename)			
				params.append('info',this.addCourse.info)		
				params.append('major',this.major)			
                let req = {
                    type:"post",
                    url:'courseList/addcourse/',
                    //post请求写data get请求写params
                    data:params,
                }
                this.postFN(req).then(r=>{                
                    if (r.status != 0) {
                    this.$message({
                        type: 'success',
                        message: r.result
                    });
                    this.addstuTableVisible = false  // 关闭弹框
                    this.resetFields()
                    this.getCourseList() // 重新调用，刷新表单
                    }else{
                        this.$message({
                            type: 'error',
                            message: r.result
                        });
                    }
                })

            })
         },
         //修改课程
         onChangeUser(){        
                this.$refs.addFormRef.validate(async valid => {
                if (!valid) return null  // 如果验证失败就不往下继续执行
                const params=new FormData()//接口定义了一些实用的方法来处理 URL 的查询字符串。
				params.append('name',this.addCourse.coursename)		
				params.append('info',this.addCourse.info)		
				params.append('major',this.major)		
                params.append('cid',this.courseid)		
                let req = {
                    type:"post",
                    url:'courseList/changecourse/',
                    //post请求写data get请求写params
                    data:params,
                }
                this.postFN(req).then(r=>{                
                    if (r.status != 0) {                    
                    this.$message({
                        type: 'success',
                        message: r.result
                    });
                    this.editstuTableVisible = false  // 关闭弹框
                    this.resetFields()
                    this.getCourseList() // 重新调用，刷新表单
                    }else{
                        this.$message({
                            type: 'error',
                            message: r.result
                        });
                    }
                })

            })
         },
         //修改课程状态
         changeStatus(){
            switch (this.stustatus)
            {
                case '待开放':
                    this.stustatus = 0
                    break;
                case '正常':
                    this.stustatus = 1
                    break;
                case '禁用':
                    this.stustatus = 2
                    break;
                case '异常':
                    this.stustatus = 3
                    break;
            }
                const params=new FormData()//接口定义了一些实用的方法来处理 URL 的查询字符串。
				params.append('status',this.stustatus)		
                params.append('courseid',this.courseid)		
                let req = {
                    type:"post",
                    url:'courseList/changeCstatus/',
                    //post请求写data get请求写params
                    data:params,
                }
                this.postFN(req).then(r=>{                
                    if (r.status != 0) {                    
                    this.$message({
                        type: 'success',
                        message: r.result
                    });
                    this.statusTableVisible = false  // 关闭弹框                
                    this.getCourseList() // 重新调用，刷新表单
                    }else{
                        this.$message({
                            type: 'error',
                            message: r.result
                        });
                    }
                })

         },
         //点击取消的时候清理表格
         clearform(){
            this.$refs.addFormRef.resetFields() // 清空表单
            this.editstuTableVisible = false
            this.addstuTableVisible = false
            this.resetFields()
         },
         //处理添加课程点击事件
         openaddcourse(){
            this.addstuTableVisible = true
            this.resetFields()
         },        
         //重置表格
         resetFields(){
             this.addCourse.coursename = null
             this.addCourse.info = null
             this.addCourse.password = null
             this.addCourse.file = null
             this.addCourse.email = null
             this.defaultmajor = []
             this.search = null
         },
         //处理添加课程的选择专业和年级
         handleaddusermg(value){           
            this.major = value[0]
            this.grade = value[1]
         },
         //处理上传图片
         uploadFile(param) {                
                this.addCourse.pic = param.file.name
                this.addCourse.stupic = param.file                                
		},
		//查看课程详情
        showclass(value){            
            console.log(value.major)
             //路由跳转
            this.$router.push({path:'/classList',query:{courseid:value.courseid,majorid:value.major}})
        },
        //修改状态
        editstatus(value){
            this.courseid = value.courseid
            switch (value.status)
            {
                case 0:
                    this.stustatus = '待开放'
                    break;
                case 1:
                    this.stustatus = '正常'
                    break;
                case 2:
                    this.stustatus = '禁用'
                    break;
                case 3:
                    this.stustatus = '异常'
                    break;
            }
            this.statusTableVisible = true      
        },
		}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	
</style>
