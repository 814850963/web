<template>
    <div>
        <head-top></head-top>
		 <div class="table_container">
            <!-- 关键字搜索 -->
           <el-input style="width:180px" name="search" v-model="search" placeholder="输入要搜索班级的信息"></el-input>
        
            <!-- 按照状态检索 -->
            <el-cascader   
                :options="options"
                @change="handleChange"
                placeholder="请选择专业和班级">
            </el-cascader>
            <el-button type="primary" @click="getAllMessage">查看所有消息</el-button>
            <!-- 查看信息弹框 -->
            <el-dialog
            style="width:100%; "            
            title="查看内容"
            @close="addDialogClose"
            :visible.sync="TableVisible"
            :close-on-click-modal="false"
            >
            <!-- 查看通知的表单 -->
            <el-form style="width:70%;margin-left:15%" enctype="multipart/form-data" ref="addFormRef" :model="infoform" label-width="130px">
                    <div v-html="infoform.intro"></div>
                <el-form-item  style="margin-left:0px;margin-top:20px">
                    <el-button type="primary" @click="TableVisible=false">确定</el-button>
                </el-form-item>
            </el-form>
            </el-dialog>                   
            <!-- 班级信息表格 -->
           <el-table
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
                <!-- 主题 -->
                <el-table-column
                label="标题"
                prop="name">                            
                </el-table-column>
                <!-- 班级名称 -->
                <el-table-column
                label="班级名称"
                prop="classname">
                </el-table-column>
                <!-- 教师名称 -->
                <el-table-column
                label="发布老师"
                prop="teachername">
                </el-table-column>
                <!-- 发布时间 -->
                <el-table-column
                label="发布时间"
                prop="time">
                </el-table-column>
                <!-- 操作班级对象 -->
                <el-table-column
                label="操作"
                >
                <template slot-scope="scope">
                    <el-button split-button type="primary" @click="handleEdit( scope.row)">查看</el-button>
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
                value: [],
                loading: false,
                //班级的状态
                stustatus:'',                             
                tableData: [],
                classid: null,
                search: '',
                currentPage: 1,
                count:0,
                options: [],
                classid:'',
                //默认的选项
                defaultmajor:[],
                blankmajor:[],
                //图片的显示格式
                fit:"fill",
                //修改班级
                TableVisible:false,
                //修改状态
                statusTableVisible:false,
                //添加班级时的专业年级
                courseid:'',
                major:'',
                course:'',
                // 添加班级
                infoform: {
                    classname: '',
                    teachername: '',      
                    name:'',
                    intro:'',
                },
            }
        },
    	components: {
    		headTop,
            // visitorPie,
        },
        activated() {          
        },
    	mounted(){
            if(!sessionStorage.getItem("authen"))
            {
                this.$router.push('/')
            }                        
            this.getMessage()
            this.getAllMCC()
        },
    	methods: {
            //获取所有专业详情
            getAllMCC(){
                let req = {
                    type:"get",
                    url:'MCCList/',
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
            //获取所有消息
            getAllMessage(){
                const params=new URLSearchParams()//接口定义了一些实用的方法来处理 URL 的查询字符串。
                params.append('page',1)	                
                this.classid==null
                let req = {
                    type:"get",
                    url:'infoManage/getMessage/',
                    //post请求写data get请求写params
                    params:params
                }
                this.getFN(req).then(r=>{                    
                    this.tableData  = r.data;
                    this.currentPage = r.page
                    this.count = r.len
                    console.log(r)
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
            //获取所有的消息
            getMessage(){
                const params=new URLSearchParams()//接口定义了一些实用的方法来处理 URL 的查询字符串。
                params.append('page',this.currentPage)	                
                if(this.classid!=null&&this.classid!='')
                    params.append('classid',this.classid)	
                let req = {
                    type:"get",
                    url:'infoManage/getMessage/',
                    //post请求写data get请求写params
                    params:params
                }
                this.getFN(req).then(r=>{                    
                    this.tableData  = r.data;
                    this.currentPage = r.page
                    this.count = r.len
                    console.log(r)
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
            //处理按照专业检索的请求
            handleChange(value) {
                this.classid = value[2]
                this.getMessage()
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            //当页面发生改变时
            handleCurrentChange(val) {
                this.currentPage = val;
                const params=new URLSearchParams()//接口定义了一些实用的方法来处理 URL 的查询字符串。
                params.append('page',val)	
                if(this.classid!=null&&this.classid!='')
                    params.append('classid',this.classid)
                let req = {
                    type:"get",
                    url:'infoManage/getMessage/',
                    //post请求写data get请求写params
                    params:params
                }
                this.getFN(req).then(r=>{                    
                    this.tableData  = r.data;
                    this.currentPage = r.page
                    this.count = r.len
                    console.log(r)
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
            //处理编辑的按钮
             handleEdit(val,flag) {        
                console.log(val)
                this.infoform.intro = val.intro
                this.TableVisible = true
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            //获取所有专业详情
            getAllMajor(){
                const params=new URLSearchParams()//接口定义了一些实用的方法来处理 URL 的查询字符串。				
                let req = {
                    type:"get",
                    url:'classList/getAllMajor/',
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
                this.infoform.intro = null
                this.TableVisible = false    
            },
         },
         //处理上传图片
         uploadFile(param) {                
                this.infoform.pic = param.file.name
                this.infoform.stupic = param.file                                
		},
		//查看班级详情
        showinfo(value){
            //路由跳转
            this.$router.push({path:'classstudentList',query:{classid:value.classid,classname:value.name}})
        },
		
    }
</script>

<style lang="less">
	@import '../style/mixin';
	
</style>
