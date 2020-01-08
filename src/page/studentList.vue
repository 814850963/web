<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <!-- 关键字搜索 -->
           <el-input style="width:180px" name="search" v-model="search" placeholder="输入要搜索学生的信息"></el-input>
        
            <!-- 按照状态检索 -->
            <el-cascader   
                :options="options"
                @change="handleChange">
            </el-cascader>
            <!-- 添加学生 -->
            <el-button type="primary" @click="addstuTableVisible = true">添加用户</el-button>
            <!-- 添加用户弹框 -->
            <el-dialog
            style="width:1000px; margin-left:20%;"            
            title="添加用户"
            @close="addDialogClose"
            :visible.sync="addstuTableVisible"
            :close-on-click-modal="false"
            >
            <!-- 添加用户的表单 -->
            <el-form enctype="multipart/form-data" ref="addFormRef" :rules="rulesAddUser" :model="addUser" label-width="120px">
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
                        @change="handleaddusermg">
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
                    <el-button @click="addstuTableVisible = false">取消</el-button>
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
                        style="width: 100px; height: 100px"
                        :src="scope.row.headpic"
                        :fit="fit"/>                                        
                </template>
                
                </el-table-column>
                 <!-- 专业 -->
                <el-table-column
                label="专业"
                prop="major">
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
                    <el-tag v-if="scope.row.status===0"  type="info">毕业</el-tag>
                    <el-tag v-if="scope.row.status===1"  type="success">在读</el-tag>
                    <el-tag v-if="scope.row.status===2"  type="warning">留级</el-tag>
                    <el-tag v-if="scope.row.status===3"  type="danger">处分</el-tag>
                </template>
                </el-table-column>
                <!-- 操作学生对象 -->
                <el-table-column
                label="操作"
                >
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                </template>
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="20"
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
                tableData: [                    
                ],
                search: '',
                currentPage: 0,
                count:0,
                options: [],
                //图片的显示格式
                fit:"fill",
                addstuTableVisible:false,
                // 添加用户
                addUser: {
                    username: '',
                    password: '',
                    email: '',
                    account: '',
                    grade:'',
                    major:'',
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
                    ]
                }

            }
        },
    	components: {
            headTop,
            
    	},
        mounted(){
            this.getStudentList();
            this.getAllMajor();
        },
        methods: {
            //处理按照专业检索的请求
            handleChange(value) {                
            const params=new URLSearchParams()//接口定义了一些实用的方法来处理 URL 的查询字符串。
                params.append('major',value[0])
                params.append('grade',value[1])				
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
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
            },
             handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            //获取学生列表
            getStudentList(){			
                const params=new URLSearchParams()//接口定义了一些实用的方法来处理 URL 的查询字符串。
				params.append('page',1)				
                let req = {
                    type:"get",
                    url:'userlist/',
                    //post请求写data get请求写params
                     params:params
                }
                this.getFN(req).then(r=>{
                    this.tableData = r.data;  
                    console.log(r.data)              
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
            //获取所有专业详情
            getAllMajor(){
                let req = {
                    type:"get",
                    url:'userlist/getAllMajor/',
                    //post请求写data get请求写params
                    //  params:params
                }
                this.getFN(req).then(r=>{
                    console.log(r)
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
            this.$refs.addFormRef.resetFields() // 清空表单
            },
            // 点击添加用户
            onAddUser() {
            this.$refs.addFormRef.validate(async valid => {
                if (!valid) return null  // 如果验证失败就不往下继续执行
                const params=new FormData()//接口定义了一些实用的方法来处理 URL 的查询字符串。
				params.append('name',this.addUser.username)		
				params.append('password',this.addUser.password)		
				params.append('account',this.addUser.account)		
				params.append('major',this.addUser.major)		
				params.append('grade',this.addUser.grade)		
				params.append('pic',this.addUser.pic)		
				params.append('file',this.addUser.stupic)		
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
    //             let config = {  

    //             // 配置请求头

    //                 headers: {'Content-Type': 'multipart/form-data'}

    //             }
    //             this.$axios.post('http://localhost:8000/web/userlist/addstudent/',params,{
    //                         'Content-Type':'multipart/form-data'
    //                     }).then(res=>{
            
    //                     })
                           
                this.addstuTableVisible = false  // 关闭弹框
                this.$refs.addFormRef.resetFields() // 清空表单
                this.getStudentList() // 重新调用，刷新表单
            })
         },
         //处理添加学生的选择专业和年级
         handleaddusermg(value){
            this.addUser.major = value[0]
            this.addUser.grade = value[1]
         },
         //处理上传图片
         uploadFile(param) {                
                this.addUser.pic = param.file.name
                this.addUser.stupic = param.file                                
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
