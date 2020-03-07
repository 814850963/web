<template>
    <div>
        <head-top></head-top>
		 <div class="table_container">
            <!-- 关键字搜索 -->
           <el-input style="width:180px" name="search"  @keyup.enter.native="getCourseList"  v-model="search" placeholder="输入要搜索专业的信息"></el-input>
            <!-- 添加专业 -->
            <el-button type="primary" @click="openaddmajor()">添加专业</el-button>
            <!-- 添加专业弹框 -->
            <el-dialog
            style="width:1050px; margin-left:20%;"            
            title="添加专业"
            @close="addDialogClose"
            :visible.sync="addstuTableVisible"
            :close-on-click-modal="false"
            >
            <!-- 添加专业的表单 -->
            <el-form enctype="multipart/form-data" ref="addFormRef" :rules="rulesAddUser" :model="addCourse" label-width="130px">
                <el-form-item prop="majorname" label="专业名称">
                    <el-input v-model="addCourse.majorname"></el-input>
                </el-form-item>
                <el-form-item prop="info" label="专业简介">
                    <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                    v-model="addCourse.info">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="clearform()">取消</el-button>
                    <el-button type="primary" @click="onAddCourse">确定</el-button>
                </el-form-item>
            </el-form>
            </el-dialog>
            <!-- 编辑专业弹框 -->
            <el-dialog
            style="width:1050px; margin-left:20%;"            
            title="编辑专业"
            @close="addDialogClose"
            :visible.sync="editstuTableVisible"
            :close-on-click-modal="false"
            >
            <!-- 编辑专业的表单 -->
            <el-form enctype="multipart/form-data" ref="addFormRef" :rules="rulesAddUser" :model="addCourse" label-width="130px">
                <el-form-item prop="majorname" label="专业名称">
                    <el-input v-model="addCourse.majorname"></el-input>
                </el-form-item>
                <el-form-item prop="info" label="专业简介">
                   <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                    v-model="addCourse.info">
                    </el-input>
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
            <!-- 专业信息表格 -->
           <el-table
                :data="tableData"
                style="width: 100%">
                <!-- 专业姓名 -->
                <el-table-column
                label="专业名称"
                prop="name">
                </el-table-column>
                <!-- 学号 -->
                <el-table-column
                label="专业简介"
                prop="info">
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
                <!-- 操作专业对象 -->
                <el-table-column
                label="操作"
                >
                <template slot-scope="scope">
                    <el-dropdown split-button type="primary" @click="handleEdit( scope.row)">
                    编辑
                    <el-dropdown-menu slot="dropdown">                       
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
                //专业的状态
                stustatus:'',                             
                tableData: [],
                majorid: 0,
                search: '',
                currentPage: 0,
                count:0,
                options: [],
                //图片的显示格式
                fit:"fill",
                //添加专业
                addstuTableVisible:false,
                //修改专业
                editstuTableVisible:false,
                //修改状态
                statusTableVisible:false,
                //添加专业时的专业年级
                grade:'',
                major:'',
                // 添加专业
                addCourse: {
                    majorname: '',
                    info: '',                   
                },
                // 验证规则
                rulesAddUser: {
                    majorname: [
                    { required: true, message: '请输入专业名', trigger: 'blur' }
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
				params.append('search',this.search)				
                let req = {
                    type:"get",
                    url:'majorList/',
                    //post请求写data get请求写params
                     params:params
                }
                this.getFN(req).then(r=>{
                    this.tableData = r.data;                                
                    this.count = r.len;
                    if (r.status == 1) {
                    this.$message({
                        type: 'success',
                        message: "获取专业列表信息"
                    });
                    }else{
                        this.$message({
                            type: 'error',
                            message: "获取专业列表信息失败"
                        });
                    }
                })		
            },
            //处理编辑的按钮
             handleEdit(val,flag) {   
                this.addCourse.majorname = val.name
                this.addCourse.info = val.info   
                if(!flag)       
                this.editstuTableVisible = true
                this.majorid = val.majorid                            
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            //获取专业列表
            getCourseList(){			
                const params=new URLSearchParams()//接口定义了一些实用的方法来处理 URL 的查询字符串。
				params.append('page',1)			
				params.append('search',this.search)				
                let req = {
                    type:"get",
                    url:'majorList/',
                    //post请求写data get请求写params
                     params:params
                }
                this.getFN(req).then(r=>{
                    this.tableData = r.data;                           
                    this.count = r.len;
                    if (r.status == 1) {
                    this.$message({
                        type: 'success',
                        message: "获取专业列表信息"
                    });
                    }else{
                        this.$message({
                            type: 'error',
                            message: "获取专业列表信息失败"
                        });
                    }
                })		
            },
             // 关闭弹框的回调
            addDialogClose() {
                this.resetFields()
            },
            // 点击添加专业
            onAddCourse() {
            this.$refs.addFormRef.validate(async valid => {
                if (!valid) return null  // 如果验证失败就不往下继续执行
                const params=new FormData()//接口定义了一些实用的方法来处理 URL 的查询字符串。
				params.append('name',this.addCourse.majorname)			
                params.append('info',this.addCourse.info)
                params.append('majorid',this.majorid)								
                let req = {
                    type:"post",
                    url:'majorList/addmajor/',
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
                this.getCourseList() // 重新调用，刷新表单
            })
         },
         //修改专业
         onChangeUser(){        
                this.$refs.addFormRef.validate(async valid => {
                if (!valid) return null  // 如果验证失败就不往下继续执行
                const params=new FormData()//接口定义了一些实用的方法来处理 URL 的查询字符串。
				params.append('name',this.addCourse.majorname)		
				params.append('info',this.addCourse.info)				
                params.append('mid',this.majorid)		
                let req = {
                    type:"post",
                    url:'majorList/changemajor/',
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
                this.getCourseList() // 重新调用，刷新表单
            })
         },
         //修改专业状态
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
                params.append('mid',this.majorid)		
                let req = {
                    type:"post",
                    url:'majorList/changeMstatus/',
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
                this.getCourseList() // 重新调用，刷新表单
         },
         //点击取消的时候清理表格
         clearform(){
            this.editstuTableVisible = false
            this.addstuTableVisible = false
            this.resetFields()
         },
         //处理添加专业点击事件
         openaddmajor(){
            this.addstuTableVisible = true
            this.resetFields()
         },        
         //重置表格
         resetFields(){
             this.addCourse.majorname = null
             this.addCourse.info = null
             this.addCourse.password = null
             this.addCourse.file = null
             this.addCourse.email = null
         },
         //处理添加专业的选择专业和年级
         handleaddusermg(value){           
            this.major = value[0]
            this.grade = value[1]
         },
         //处理上传图片
         uploadFile(param) {                
                this.addCourse.pic = param.file.name
                this.addCourse.stupic = param.file                                
		},
        //修改状态
        editstatus(value){
            this.majorid = value.majorid
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
