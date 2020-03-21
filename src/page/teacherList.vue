<template>
    <div>
        <head-top></head-top>
		<div class="table_container">
            <!-- 关键字搜索 -->
           <el-input style="width:180px"  @keyup.enter.native="getTeacherList" name="search" v-model="search" placeholder="输入要搜索教师的名字"></el-input>
        
            <!-- 按照状态检索 -->
            <el-cascader   
                :options="options"
                @change="handleChange"
                placeholder="请选择专业">
            </el-cascader>
            <!-- 添加教师 -->
            <el-button type="primary" @click="openadduser()">添加教师</el-button>
            <!-- 添加用户弹框 -->
            <el-dialog
            style="width:1050px; margin-left:20%;"            
            title="添加教师"
            @close="addDialogClose"
            :visible.sync="addstuTableVisible"
            :close-on-click-modal="false"
            >
            <!-- 添加用户的表单 -->
            <el-form enctype="multipart/form-data" ref="addFormRef" :rules="rulesAddUser" :model="addUser" label-width="130px">
                <el-form-item prop="username" label="教师姓名">
                    <el-input v-model="addUser.username"></el-input>
                </el-form-item>
                <el-form-item prop="account" label="教师学号">
                    <el-input v-model="addUser.account"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="教师密码">
                    <el-input v-model="addUser.password"></el-input>
                </el-form-item>
                <el-form-item prop="email" label="教师邮箱">
                    <el-input v-model="addUser.email"></el-input>
                </el-form-item>
                 <el-form-item prop="major" label="教师专业">
                    <!-- 按照状态检索 -->
                    <el-cascader   
                        :options="options"
                        @change="handleaddusermg"                       
                        placeholder="请选择专业">
                    </el-cascader>
                </el-form-item>
                <el-form-item prop="pic" label="请选择头像">
                    <el-upload
                            action=""
                            class="upload-demo"
                            ref="upload"
                            name="file"
                            :show-file-list="false"
                            :auto-upload="true"
                            :http-request="uploadFile">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button @click="clearform()">取消</el-button>
                    <el-button type="primary" @click="onAddUser">确定</el-button>
                </el-form-item>
            </el-form>
            </el-dialog>
            <!-- 编辑用户弹框 -->
            <el-dialog
            style="width:1050px; margin-left:20%;"            
            title="编辑教师"
            @close="addDialogClose"
            :visible.sync="editstuTableVisible"
            :close-on-click-modal="false"
            >
            <!-- 编辑用户的表单 -->
            <el-form enctype="multipart/form-data" ref="addFormRef" :rules="rulesAddUser" :model="addUser" label-width="130px">
                <el-form-item prop="username" label="教师姓名">
                    <el-input v-model="addUser.username"></el-input>
                </el-form-item>
                <el-form-item prop="account" label="教师学号">
                    <el-input v-model="addUser.account"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="教师密码">
                    <el-input v-model="addUser.password"></el-input>
                </el-form-item>
                <el-form-item prop="email" label="教师邮箱">
                    <el-input v-model="addUser.email"></el-input>
                </el-form-item>
                 <el-form-item prop="major" label="教师专业">
                    <!-- 按照状态检索 -->
                    <el-cascader   
                        :options="options"
                        @change="handleaddusermg"
                         v-model="defaultmajor">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="请选择头像">
                    <el-upload
                            action=""
                            class="upload-demo"
                            ref="upload"
                            name="file"
                            :show-file-list="false"
                            :auto-upload="true"
                            :http-request="uploadFile">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button @click="clearform()">取消</el-button>
                    <el-button type="primary" @click="onChangeUser">确定</el-button>
                </el-form-item>
            </el-form>
            </el-dialog>
            <!-- 用户详情弹框 -->
            <el-dialog
            style="width:1050px; margin-left:20%;"            
            title="教师信息"
            @close="addDialogClose"
            :visible.sync="infostuTableVisible"
            :close-on-click-modal="false"
            >
            <!-- 用户详情的表单 -->
            <el-form enctype="multipart/form-data" ref="addFormRef" :rules="rulesAddUser" :model="addUser" label-width="130px">
                <el-form-item prop="username" label="教师姓名">
                    <el-input :disabled="true" v-model="addUser.username"></el-input>
                </el-form-item>
                <el-form-item prop="account" label="教师学号">
                    <el-input :disabled="true" v-model="addUser.account"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="教师密码">
                    <el-input :disabled="true" v-model="addUser.password"></el-input>
                </el-form-item>
                <el-form-item prop="email" label="教师邮箱">
                    <el-input :disabled="true" v-model="addUser.email"></el-input>
                </el-form-item>
                 <el-form-item prop="major" label="教师专业">
                    <!-- 按照状态检索 -->
                    <el-cascader 
                        :disabled="true"  
                        :options="options"
                        @change="handleaddusermg"
                         v-model="defaultmajor">
                    </el-cascader>
                </el-form-item>
                <el-form-item prop="pic" label="教师头像">
                    <div class="block">                        
                        <img style="width:50%" :src="addUser.stupic"/>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button @click="infostuTableVisible = false">取消</el-button>
                    <el-button type="primary" @click="infostuTableVisible = false">确定</el-button>
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
                <el-radio-button  label="离职"></el-radio-button>
                <el-radio-button  label="在岗"></el-radio-button>
                <el-radio-button  label="请假"></el-radio-button>
                <el-radio-button  label="处分"></el-radio-button>
                </el-radio-group>
            </div> 
                <el-button @click="statusTableVisible = false">取消</el-button>
                <el-button type="primary" @click="changeStatus()">确定</el-button>
            </el-dialog>                    
            <!-- 教师信息表格 -->
           <el-table
                :data="tableData"
                style="width: 100%">
                <!-- 教师姓名 -->
                <el-table-column
                label="姓名"
                prop="name">
                </el-table-column>
                <!-- 学号 -->
                <el-table-column
                label="账号"
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
                <!-- 状态 -->
                <el-table-column
                label="状态"
                prop="status">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.status==0"  type="info">离职</el-tag>
                    <el-tag v-if="scope.row.status==1"  type="success">在岗</el-tag>
                    <el-tag v-if="scope.row.status==2"  type="warning">请假</el-tag>
                    <el-tag v-if="scope.row.status==3"  type="danger"> 处分</el-tag>
                </template>
                </el-table-column>
                <!-- 操作教师对象 -->
                <el-table-column
                label="操作"
                >
                <template slot-scope="scope">
                    <el-dropdown split-button type="primary" @click="handleEdit( scope.row)">
                    编辑
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item  @click.native="showinfo(scope.row)">查看详情</el-dropdown-item>                        
                        <el-dropdown-item  @click.native="editstatus( scope.row)">修改状态</el-dropdown-item>        
						<el-dropdown-item  @click.native="classinfo( scope.row)">查看班级</el-dropdown-item>                    
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
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    export default {
        data(){
            return {
                //搜索状态
                searchmajor:'',
                //教师的状态
                stustatus:'',                             
                tableData: [],
                tid: 0,
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
                //添加用户时的专业                
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
        mounted(){
            if(!sessionStorage.getItem("authen"))
            {
                this.$router.push('/')
            }
            this.getTeacherList();
            this.getAllMajor();
        },
        methods: {
            //处理按照专业检索的请求
            handleChange(value) {
            if(value[0]==0){
                this.getTeacherList(); 
                this.searchmajor=null
            }
            else
            {
                this.searchmajor = value[0]
                
                const params=new URLSearchParams()//接口定义了一些实用的方法来处理 URL 的查询字符串。
                params.append('major',value[0])		
                params.append('search',this.search)					
                let req = {
                    type:"get",
                    url:'teacherList/',
                    //post请求写data get请求写params
                     params:params
                }
                this.getFN(req).then(r=>{
                    this.tableData = r.data;                
                    this.count = r.len;
                    if (r.status == 1) {
                    this.$message({
                        type: 'success',
                        message: "获取教师列表信息"
                    });
                    }else{
                        this.$message({
                            type: 'error',
                            message: "获取教师列表信息失败"
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
                    url:'teacherList/',
                    //post请求写data get请求写params
                     params:params
                }
                this.getFN(req).then(r=>{
                    this.tableData = r.data;                                
                    this.count = r.len;
                    if (r.status == 1) {
                    this.$message({
                        type: 'success',
                        message: "获取教师列表信息"
                    });
                    }else{
                        this.$message({
                            type: 'error',
                            message: "获取教师列表信息失败"
                        });
                    }
                })		
            },
            //处理编辑的按钮
             handleEdit(val,flag) {   
                this.addUser.username = val.name
                this.addUser.account = val.account
                this.addUser.email = val.email
                this.addUser.stupic = val.headpic      
                if(!flag)       
                this.editstuTableVisible = true
                this.tid = val.tid
				this.defaultmajor.push(val.major)     
				this.major = val.major       
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            //获取教师列表
            getTeacherList(){			
                const params=new URLSearchParams()//接口定义了一些实用的方法来处理 URL 的查询字符串。
                params.append('search',this.search)				
				params.append('page',1)				
                let req = {
                    type:"get",
                    url:'teacherList/',
                    //post请求写data get请求写params
                     params:params
                }
                this.getFN(req).then(r=>{
                    this.tableData = r.data;                           
                    this.count = r.len;
                    if (r.status == 1) {
                    this.$message({
                        type: 'success',
                        message: "获取教师列表信息"
                    });
                    }else{
                        this.$message({
                            type: 'error',
                            message: "获取教师列表信息失败"
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
                    url:'teacherList/getAllMajor/',
                    //post请求写data get请求写params
                      params:params
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
            //this.$refs.addFormRef.resetFields() // 清空表单
            },
            // 点击添加用户
            onAddUser() {
            this.$refs.addFormRef.validate(async valid => {
                if (!valid) return null  // 如果验证失败就不往下继续执行
                const params=new FormData()//接口定义了一些实用的方法来处理 URL 的查询字符串。
                if(this.major==null||this.major==""||this.major==0)
                {
                    this.open4()
                    return null
                }
				params.append('name',this.addUser.username)		
				params.append('password',this.addUser.password)		
				params.append('account',this.addUser.account)		
				params.append('major',this.major)		                	
                params.append('email',this.addUser.email)
                params.append('file',this.addUser.stupic)		
                params.append('pic',this.addUser.pic)		
                let req = {
                    type:"post",
                    url:'teacherList/addteacher/',
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
                    //this.$refs.addFormRef.resetFields() // 清空表单
                    this.getTeacherList() // 重新调用，刷新表单
                    this.resetFields()
                    }else{
                        this.$message({
                            type: 'error',
                            message: r.result
                        });
                    }
                })

            })
         },
         //修改用户
         onChangeUser(){        
                this.$refs.addFormRef.validate(async valid => {
                if (!valid) return null  // 如果验证失败就不往下继续执行
                const params=new FormData()//接口定义了一些实用的方法来处理 URL 的查询字符串。
                if(this.major==null||this.major==""||this.major==0)
                {
                    this.open4()
                    return null
                }
				params.append('name',this.addUser.username)		
				params.append('password',this.addUser.password)		
				params.append('account',this.addUser.account)		
				params.append('major',this.major)		                	
                params.append('email',this.addUser.email)
                params.append('file',this.addUser.stupic)		
                params.append('pic',this.addUser.pic)
				params.append('tid',this.tid)		
                let req = {
                    type:"post",
                    url:'teacherList/changeteacher/',
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
                    //this.$refs.addFormRef.resetFields() // 清空表单
                    this.getTeacherList() // 重新调用，刷新表单
                    this.resetFields()
                    }else{
                        this.$message({
                            type: 'error',
                            message: r.result
                        });
                    }
                })

            })
         },
         //修改用户状态
         changeStatus(){
            switch (this.stustatus)
            {
                case '离职':
                    this.stustatus = 0
                    break;
                case '在岗':
                    this.stustatus = 1
                    break;
                case '请假':
                    this.stustatus = 2
                    break;
                case '处分':
                    this.stustatus = 3
                    break;
            }
                const params=new FormData()//接口定义了一些实用的方法来处理 URL 的查询字符串。
				params.append('status',this.stustatus)		
                params.append('tid',this.tid)		
                let req = {
                    type:"post",
                    url:'teacherList/changeTstatus/',
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
                    this.getTeacherList() // 重新调用，刷新表单
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
            this.editstuTableVisible = false
            this.infostuTableVisible = false
            this.addstuTableVisible = false            
            this.resetFields()
         },
         //处理添加用户点击事件
         openadduser(){
            this.addstuTableVisible = true
            this.$refs.addFormRef.resetFields() // 清空表单
            this.resetFields()
         },        
         //重置表格
         resetFields(){
             this.$refs.addFormRef.resetFields() // 清空表单
             this.addUser.username = null
             this.addUser.account = null
             this.addUser.password = null
             this.addUser.file = null
             this.addUser.email = null
            this.addUser.email =null
            this.addUser.stupic = null      
             this.defaultmajor = []
          
         },
         //处理添加教师的选择专业和年级
         handleaddusermg(value){  			         
			this.major = value[0]  		          
         },
         //处理上传图片
         uploadFile(param) {                this.addUser.pic = param.file.name
                this.addUser.stupic = param.file                                
        },
        //查看教师详情
        showinfo(value){
            this.handleEdit(value,1)
            this.infostuTableVisible = true
        },
        //修改状态
        editstatus(value){
            this.tid = value.tid
            switch (value.status)
            {
                case 0:
                    this.stustatus = '离职'
                    break;
                case 1:
                    this.stustatus = '在岗'
                    break;
                case 2:
                    this.stustatus = '请假'
                    break;
                case 3:
                    this.stustatus = '处分'
                    break;
            }
            this.statusTableVisible = true      
		},
		//获取老师所带班级信息
		classinfo(){

        },
         open4() {
        this.$notify.error({
          title: '错误',
          message: '没有选择专业'
        });
         }
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.button_submit{
		text-align: center;
	}
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
	    border-color: #20a0ff;
	}
	.avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 120px;
	    height: 120px;
	    line-height: 120px;
	    text-align: center;
	}
	.avatar {
	    width: 120px;
	    height: 120px;
	    display: block;
	}
	.el-table .info-row {
	    background: #c9e5f5;
	}

	.el-table .positive-row {
	    background: #e2f0e4;
	}
</style>
