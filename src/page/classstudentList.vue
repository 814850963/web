<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div style="text-align:center; ">
            <h1>{{classname}}</h1>
        </div>
        <div class="table_container">      
            <!-- 关键字搜索 -->
           <el-input style="width:180px" name="search" @keyup.enter.native="getStudentList"  v-model="search" placeholder="输入要搜索学生的信息"></el-input>    
            <!-- 添加学生 -->
            <el-button type="primary" @click="openadduser()">添加学生</el-button>
            <!-- 添加用户弹框 -->
            <el-dialog
            style="width:1050px; margin-left:20%;"            
            title="添加用户"
            @close="addDialogClose"
            :visible.sync="addstuTableVisible"
            :close-on-click-modal="false"
            >
            <!-- 添加用户的表单 -->
            <el-form enctype="multipart/form-data" ref="addFormRef" :rules="rulesAddUser" :model="addUser" label-width="130px">
                 <el-form-item prop="teacher" label=学生学号/名称>
                  <el-select
                    v-model="value"
                    :multiple-limit=1
                    filterable
                    remote
                    reserve-keyword
                    placeholder="请输入学号or名称"
                    :remote-method="remoteMethod"
                    :loading="loading">
                    <el-option
                    v-for="item in students"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                   </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="clearform()">取消</el-button>
                    <el-button type="primary" @click="onAddUser">确定</el-button>
                </el-form-item>
            </el-form>
            </el-dialog>                    
            <!-- 学生信息表格 -->
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
                        :fit="fit"/>                                        
                </template>
                
                </el-table-column>
                 <!-- 专业 -->
                <el-table-column
                label="专业"
                prop="mname">
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
                    <el-tag v-if="scope.row.status==0"  type="info">毕业</el-tag>
                    <el-tag v-if="scope.row.status==1"  type="success">在读</el-tag>
                    <el-tag v-if="scope.row.status==2"  type="warning">留级</el-tag>
                    <el-tag v-if="scope.row.status==3"  type="danger">处分</el-tag>
                </template>
                </el-table-column>
                <!-- 操作学生对象 -->
                <el-table-column
                label="操作"
                >
                <template slot-scope="scope">
                    <el-button type="danger" @click="onRemoveUser(scope.row)">移除该生</el-button>                                        
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
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    export default {
        data(){
            return {
                //所有的学生们
                students:[],
                value: [],
                list: [],
                loading: false,
                //课程id
                classid:'',
                //课程名称
                classname:'',
                //学生的状态
                stustatus:'',                             
                tableData: [],
                sid: 0,
                search: '',
                currentPage: 0,
                count:0,
                options: [],
                //默认的选项
                defaultmajor:[],
                //图片的显示格式
                fit:"fill",
                //添加用户
                addstuTableVisible:false,
                //修改用户
                editstuTableVisible:false,
                //用户信息
                infostuTableVisible:false,
                //修改状态
                statusTableVisible:false,
                //添加用户时的专业年级
                grade:'',
                major:'',
                // 添加用户
                addUser: {
                    username: '',
                    password: '',
                    email: '',
                    account: '',                   
                    pic:'',
                    stupic:'',
                },
                // 验证规则
                rulesAddUser: {
                    username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                    { required: true, message: '请输入用户密码', trigger: 'blur' }
                    ],
                    email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    {
                        type: 'email',
                        message: '请输入正确的邮箱地址',
                        trigger: ['blur', 'change']
                    }
                    ],
                    account: [
                    { required: true, message: '请输入学号', trigger: 'blur' },
                    { trigger: 'blur' }
                    ],
                     pic:[
                    { required: true, message: '', trigger: 'blur' },
                    { trigger: 'blur' }
                    ],
                    stupic:[
                    { required: true, message: '', trigger: 'blur' },
                    { trigger: 'blur' }
                    ],
                }

            }
        },
    	components: {
            headTop,
            
        },
        activated(){
            //获取路由传参
            this.classid = this.$route.query.classid
            this.classname = this.$route.query.classname            
            this.getStudentList();
                     
        },
        mounted(){
            if(!sessionStorage.getItem("authen"))
            {
                this.$router.push('/')
            }
            this.getAllMajor();   
            this.getAllStudents();        
        },
        methods: {         
            //获取所有的学生
            getAllStudents(){
                let req = {
                    type:"get",
                    url:'userlist/getAllStudents/',
                    //post请求写data get请求写params
                    params:null
                }
                this.getFN(req).then(r=>{  
                    console.log(r)            
                    this.list  = r;
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
            //处理老师检索信息
            remoteMethod(query) {                
                if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.students = this.list.filter(item => {
                    return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
                });
                }, 200);
                } else {
                this.students = [];
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
                params.append('search',this.search)
                if(this.classid!=null)
                {                    
                    params.append('classid',this.classid)			    
                }
                
                let req = {
                    type:"get",
                    url:'userclasslist/',
                    //post请求写data get请求写params
                     params:params
                }
                this.getFN(req).then(r=>{
                    this.tableData = r.data;                                
                    this.count = r.len;
                    if (r.status == 1) {
                    this.$message({
                        type: 'success',
                        message: "获取学生列表信息"
                    });
                    }else{
                        this.$message({
                            type: 'error',
                            message: "获取学生列表信息失败"
                        });
                    }
                })		
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            //获取学生列表
            getStudentList(classid){			
                const params=new URLSearchParams()//接口定义了一些实用的方法来处理 URL 的查询字符串。
                params.append('page',1)	
                params.append('search',this.search)
                if(this.classid!=null)
                {                    
                    params.append('classid',this.classid)			    
                }
                
                let req = {
                    type:"get",
                    url:'userclasslist/',
                    //post请求写data get请求写params
                     params:params
                }
                this.getFN(req).then(r=>{
                    this.tableData = r.data;                           
                    this.count = r.len;
                    console.log(r.data)
                    if (r.status == 1) {
                    this.$message({
                        type: 'success',
                        message: "获取学生列表信息"
                    });
                    }else{
                        this.$message({
                            type: 'error',
                            message: "获取学生列表信息失败"
                        });
                    }
                })		
            },
            //获取所有专业详情
            getAllMajor(){
                let req = {
                    type:"get",
                    url:'userlist/getAllMajor/',
                    //post请求写data get请求写params
                    //  params:params
                }
                this.getFN(req).then(r=>{                    
                    this.options = r;
                    if (r != null) {
                    this.$message({
                        type: 'success',
                        message: "获取专业信息"
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
            // 点击添加用户
            onAddUser() {
            this.$refs.addFormRef.validate(async valid => {
                if (!valid) return null  // 如果验证失败就不往下继续执行
                const params=new FormData()//接口定义了一些实用的方法来处理 URL 的查询字符串。
				params.append('classid',this.classid)		
				params.append('studentid',this.value)							
                let req = {
                    type:"post",
                    url:'classList/addstudentTclass/',
                    //post请求写data get请求写params
                    data:params,
                }
                this.postFN(req).then(r=>{                
                    if (r.status != 0) {
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
                this.addstuTableVisible = false  // 关闭弹框                
                this.resetFields()
                this.getStudentList() // 重新调用，刷新表单
            })
         },
         //点击取消的时候清理表格
         clearform(){
            this.editstuTableVisible = false
            this.infostuTableVisible = false
            this.addstuTableVisible = false
            this.resetFields()
         },
         //处理添加用户点击事件
         openadduser(){
            this.addstuTableVisible = true            
            this.resetFields()
         },        
         //重置表格
         resetFields(){             
             this.addUser.username = null
             this.addUser.account = null
             this.addUser.password = null
             this.addUser.file = null
             this.addUser.email = null
             this.defaultmajor = []
         },
        //移除该生
        onRemoveUser(value){
            const params=new URLSearchParams()//接口定义了一些实用的方法来处理 URL 的查询字符串。
                params.append('classid',this.classid)	
                params.append('studentid',value.sid)	                
                let req = {
                    type:"post",
                    url:'classList/removeclassstudent/',
                    //post请求写data get请求写params
                     data:params
                }
                this.getFN(req).then(r=>{                                        
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
                    this.getStudentList()
                })		
        }
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>
