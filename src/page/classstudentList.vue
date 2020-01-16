<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div style="text-align:center; ">
            <h1>{{classname}}</h1>
        </div>
        <div class="table_container">      
            <!-- 关键字搜索 -->
           <el-input style="width:180px" name="search" v-model="search" placeholder="输入要搜索学生的信息"></el-input>    
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
                <el-form-item prop="username" label="学生姓名">
                    <el-input v-model="addUser.username"></el-input>
                </el-form-item>
                <el-form-item prop="account" label="学生学号">
                    <el-input v-model="addUser.account"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="学生密码">
                    <el-input v-model="addUser.password"></el-input>
                </el-form-item>
                <el-form-item prop="email" label="学生邮箱">
                    <el-input v-model="addUser.email"></el-input>
                </el-form-item>
                 <el-form-item prop="major" label="学生专业/年级">
                    <!-- 按照状态检索 -->
                    <el-cascader   
                        :options="options"
                        @change="handleaddusermg"                       
                        placeholder="请选择专业">
                    </el-cascader>
                </el-form-item>
                <el-form-item prop="pic" label="请选择学生头像">
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
            title="编辑用户"
            @close="addDialogClose"
            :visible.sync="editstuTableVisible"
            :close-on-click-modal="false"
            >
            <!-- 编辑用户的表单 -->
            <el-form enctype="multipart/form-data" ref="addFormRef" :rules="rulesAddUser" :model="addUser" label-width="130px">
                <el-form-item prop="username" label="学生姓名">
                    <el-input v-model="addUser.username"></el-input>
                </el-form-item>
                <el-form-item prop="account" label="学生学号">
                    <el-input v-model="addUser.account"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="学生密码">
                    <el-input v-model="addUser.password"></el-input>
                </el-form-item>
                <el-form-item prop="email" label="学生邮箱">
                    <el-input v-model="addUser.email"></el-input>
                </el-form-item>
                 <el-form-item prop="major" label="学生专业/年级">
                    <!-- 按照状态检索 -->
                    <el-cascader   
                        :options="options"
                        @change="handleaddusermg"
                         v-model="defaultmajor">
                    </el-cascader>
                </el-form-item>
                <el-form-item prop="pic" label="请选择学生头像">
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
            title="用户信息"
            @close="addDialogClose"
            :visible.sync="infostuTableVisible"
            :close-on-click-modal="false"
            >
            <!-- 用户详情的表单 -->
            <el-form enctype="multipart/form-data" ref="addFormRef" :rules="rulesAddUser" :model="addUser" label-width="130px">
                <el-form-item prop="username" label="学生姓名">
                    <el-input :disabled="true" v-model="addUser.username"></el-input>
                </el-form-item>
                <el-form-item prop="account" label="学生学号">
                    <el-input :disabled="true" v-model="addUser.account"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="学生密码">
                    <el-input :disabled="true" v-model="addUser.password"></el-input>
                </el-form-item>
                <el-form-item prop="email" label="学生邮箱">
                    <el-input :disabled="true" v-model="addUser.email"></el-input>
                </el-form-item>
                 <el-form-item prop="major" label="学生专业/年级">
                    <!-- 按照状态检索 -->
                    <el-cascader 
                        :disabled="true"  
                        :options="options"
                        @change="handleaddusermg"
                         v-model="defaultmajor">
                    </el-cascader>
                </el-form-item>
                <el-form-item prop="pic" label="学生头像">
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
                <el-radio-button  label="毕业"></el-radio-button>
                <el-radio-button  label="在读"></el-radio-button>
                <el-radio-button  label="留级"></el-radio-button>
                <el-radio-button  label="处分"></el-radio-button>
                </el-radio-group>
            </div> 
                <el-button @click="statusTableVisible = false">取消</el-button>
                <el-button type="primary" @click="changeStatus()">确定</el-button>
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
                    <el-dropdown split-button type="primary" @click="handleEdit( scope.row)">
                    编辑
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item  @click.native="showinfo(scope.row)">查看详情</el-dropdown-item>
                        <el-dropdown-item  @click.native="facedata( scope.row)">面部数据</el-dropdown-item>
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
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    export default {
        data(){
            return {
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
            console.log(this.classname)
            this.getStudentList(this.classid);
            this.getAllMajor();
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
                if(this.classid!=null)
                {                    
                    params.append('classid',this.classid)			    
                }			
                let req = {
                    type:"get",
                    url:'userlist/',
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
            //处理编辑的按钮
             handleEdit(val,flag) {   
                this.addUser.username = val.name
                this.addUser.account = val.account
                this.addUser.password = val.password
                this.addUser.email = val.email
                this.addUser.stupic = val.headpic      
                if(!flag)       
                this.editstuTableVisible = true
                this.sid = val.sid
                this.defaultmajor.push(val.major)
                this.major = val.major
                switch(val.grade){
                    case 1:
                        this.defaultmajor.push('1')
                        break;
                    case 2:
                        this.defaultmajor.push('2')
                        break;
                    case 3:
                        this.defaultmajor.push('3')
                        break;
                    case 4:
                        this.defaultmajor.push('4')                                                                                                
                        break;
                }
                
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            //获取学生列表
            getStudentList(classid){			
                const params=new URLSearchParams()//接口定义了一些实用的方法来处理 URL 的查询字符串。
                params.append('page',1)	
                if(classid!=null)
                {
                    this.classid = classid
                    params.append('classid',classid)			    
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
				params.append('name',this.addUser.username)		
				params.append('password',this.addUser.password)		
				params.append('account',this.addUser.account)		
				params.append('major',this.major)		
                params.append('grade',this.grade)		
                params.append('email',this.addUser.email)
                params.append('file',this.addUser.stupic)		
                params.append('pic',this.addUser.pic)		
                let req = {
                    type:"post",
                    url:'userlist/addstudent/',
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
         //修改用户
         onChangeUser(){        
                this.$refs.addFormRef.validate(async valid => {
                console.log(this.major)
                if (!valid) return null  // 如果验证失败就不往下继续执行
                const params=new FormData()//接口定义了一些实用的方法来处理 URL 的查询字符串。
				params.append('name',this.addUser.username)		
				params.append('password',this.addUser.password)		
				params.append('account',this.addUser.account)		
				params.append('major',this.major)		
                params.append('grade',this.grade)		
                params.append('email',this.addUser.email)
                params.append('file',this.addUser.stupic)		
                params.append('pic',this.addUser.pic)
                params.append('sid',this.sid)		
                let req = {
                    type:"post",
                    url:'userlist/changestudent/',
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
                this.editstuTableVisible = false  // 关闭弹框                
                this.resetFields()
                this.getStudentList() // 重新调用，刷新表单
            })
         },
         //修改用户状态
         changeStatus(){
            switch (this.stustatus)
            {
                case '毕业':
                    this.stustatus = 0
                    break;
                case '在读':
                    this.stustatus = 1
                    break;
                case '留级':
                    this.stustatus = 2
                    break;
                case '处分':
                    this.stustatus = 3
                    break;
            }
                const params=new FormData()//接口定义了一些实用的方法来处理 URL 的查询字符串。
				params.append('status',this.stustatus)		
                params.append('sid',this.sid)		
                let req = {
                    type:"post",
                    url:'userlist/changestatus/',
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
                this.statusTableVisible = false  // 关闭弹框                
                this.getStudentList() // 重新调用，刷新表单
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
         //处理添加学生的选择专业和年级
         handleaddusermg(value){           
            this.major = value[0]
            this.grade = value[1]
         },
         //处理上传图片
         uploadFile(param) {                
                this.addUser.pic = param.file.name
                this.addUser.stupic = param.file                                
        },
        //查看学生详情
        showinfo(value){
            this.handleEdit(value,1)
            this.infostuTableVisible = true
        },
        //查看面部数据
        facedata(value){

        },
        //修改状态
        editstatus(value){
            this.sid = value.sid
            switch (value.status)
            {
                case 0:
                    this.stustatus = '毕业'
                    break;
                case 1:
                    this.stustatus = '在读'
                    break;
                case 2:
                    this.stustatus = '留级'
                    break;
                case 3:
                    this.stustatus = '处分'
                    break;
            }
            this.statusTableVisible = true      
        },
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>
