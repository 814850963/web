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
            <!-- 添加班级 -->
            <el-button type="primary" @click="openaddclass()">添加班级</el-button>
            <!-- 添加班级弹框 -->
            <el-dialog
            style="width:1050px; margin-left:20%;"            
            title="添加班级"
            @close="addDialogClose"
            :visible.sync="addclaTableVisible"
            :close-on-click-modal="false"
            >
            <!-- 添加班级的表单 -->
            <el-form enctype="multipart/form-data" ref="addFormRef" :rules="rulesAddUser" :model="addClass" label-width="130px">
                <el-form-item prop="classname" label="班级名称">
                    <el-input v-model="addClass.classname"></el-input>
                </el-form-item>
                <el-form-item prop="info" label="班级简介">
                    <el-input v-model="addClass.info"></el-input>
                </el-form-item>
                <el-form-item prop="place" label="地点">
                    <el-input v-model="addClass.place"></el-input>
                </el-form-item>
                <el-form-item prop="time" label="时间">
                    <el-input v-model="addClass.time"></el-input>
                </el-form-item>
                <el-form-item prop="count" label="节数">
                    <el-input v-model="addClass.count"></el-input>
                </el-form-item>
                <el-form-item prop="weekday" label="平日(如有一周多日的情况请加'/'间隔)">
                    <el-input v-model="addClass.weekday"></el-input>
                </el-form-item>
                <el-form-item prop="total" label="周数(第一周到最后一周请加'/'间隔)">
                    <el-input v-model="addClass.total"></el-input>
                </el-form-item>
                <el-form-item prop="teacher" label=任课教师>
                  <el-select
                    v-model="value"
                    :multiple-limit=1
                    filterable
                    remote
                    reserve-keyword
                    placeholder="请输入教师名称"
                    :remote-method="remoteMethod"
                    :loading="loading">
                    <el-option
                    v-for="item in teachers"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                   </el-select>
                </el-form-item>
                 <el-form-item  label="专业">
                    <!-- 按照状态检索 -->
                    <el-cascader   
                        :options="options"
                        @change="handleaddusermg"                       
                        placeholder="请选择专业"
                        v-model="blankmajor">
                    </el-cascader>
                </el-form-item>
                <el-form-item>
                    <el-button @click="clearform()">取消</el-button>
                    <el-button type="primary" @click="onAddClass">确定</el-button>
                </el-form-item>
            </el-form>
            </el-dialog>
            <!-- 编辑班级弹框 -->
            <el-dialog
            style="width:1050px; margin-left:20%;"            
            title="编辑班级"
            @close="addDialogClose"
            :visible.sync="editclaTableVisible"
            :close-on-click-modal="false"
            >
            <!-- 编辑班级的表单 -->
            <el-form enctype="multipart/form-data" ref="addFormRef" :rules="rulesAddUser" :model="addClass" label-width="130px">
                <el-form-item prop="classname" label="班级名称">
                    <el-input v-model="addClass.classname"></el-input>
                </el-form-item>
                <el-form-item prop="tname" label="任课老师">
                    <el-input v-model="addClass.tname"></el-input>
                </el-form-item>
                <el-form-item prop="place" label="地点">
                    <el-input v-model="addClass.place"></el-input>
                </el-form-item>
                <el-form-item prop="time" label="时间">
                    <el-input v-model="addClass.time"></el-input>
                </el-form-item>
                <el-form-item prop="count" label="节数">
                    <el-input v-model="addClass.count"></el-input>
                </el-form-item>
                <el-form-item prop="weekday" label="平日(如有一周多日的情况请加'/'间隔)">
                    <el-input v-model="addClass.weekday"></el-input>
                </el-form-item>
                <el-form-item prop="total" label="周数(第一周到最后一周请加'/'间隔)">
                    <el-input v-model="addClass.total"></el-input>
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
                    <el-button type="primary" @click="onChangeClass">确定</el-button>
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
                </el-radio-group>
            </div> 
                <el-button @click="statusTableVisible = false">取消</el-button>
                <el-button type="primary" @click="changeStatus()">确定</el-button>
            </el-dialog>                    
            <!-- 班级信息表格 -->
           <el-table
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
                <!-- 班级姓名 -->
                <el-table-column
                label="班级名称"
                prop="name">
                </el-table-column>
                <!-- 学号 -->
                <el-table-column
                label="任课老师"
                prop="tname">
                </el-table-column>
                <!-- 专业 -->
                <el-table-column
                label="所属专业"
                prop="mname">                            
                </el-table-column>
                <!-- 课程 -->
                <el-table-column
                label="所属课程"
                prop="coursename">                            
                </el-table-column>
                <!-- 地点 -->
                <el-table-column
                label="地点"
                prop="place">                            
                </el-table-column>
                <!-- 时间 -->
                <el-table-column
                label="时间"
                prop="time">                            
                </el-table-column>
                <!-- 平日 -->
                <el-table-column
                label="平日"
                prop="weekday">                            
                </el-table-column>
                <!-- 节数 -->
                <el-table-column
                label="节数"
                prop="count">                            
                </el-table-column>
                <!-- 周数 -->
                <el-table-column
                label="周数"
                prop="total">                            
                </el-table-column>
                <!-- 状态 -->
                <el-table-column
                label="状态"
                prop="status">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.status==0"  type="info">待开放</el-tag>
                    <el-tag v-if="scope.row.status==1"  type="success">正常</el-tag>
                    <el-tag v-if="scope.row.status==2"  type="warning">禁用</el-tag>                
                </template>
                </el-table-column>
                <!-- 操作班级对象 -->
                <el-table-column
                label="操作"
                >
                <template slot-scope="scope">
                    <el-dropdown split-button type="primary" @click="handleEdit( scope.row)">
                    编辑
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item  @click.native="showstu(scope.row)">查看学生</el-dropdown-item>                        
                        <el-dropdown-item  @click.native="editstatus(scope.row)">修改状态</el-dropdown-item>                    
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
                //所有的老师们
                teachers:[],
                value: [],
                list: [],
                loading: false,
                //班级的状态
                stustatus:'',                             
                tableData: [],
                classid: 0,
                search: '',
                currentPage: 0,
                count:0,
                options: [],
                //默认的选项
                defaultmajor:[],
                blankmajor:[],
                //图片的显示格式
                fit:"fill",
                //添加班级
                addclaTableVisible:false,
                //修改班级
                editclaTableVisible:false,
                //修改状态
                statusTableVisible:false,
                //添加班级时的专业年级
                courseid:'',
                major:'',
                course:'',
                // 添加班级
                addClass: {
                    classname: '',
                    info: '',      
                    place:'',
                    time:'',
                    count:'',
                    tname:'',             
                    weekday:'',
                    total:'',
                },
                // 验证规则
                rulesAddUser: {
                    classname: [
                    { required: true, message: '请输入班级名', trigger: 'blur' }
                    ],                                    
                    info: [
                    { required: true, message: '请输入简介', trigger: 'blur' },
                    { trigger: 'blur' }                                        
                    ],
                    place: [
                    { required: true, message: '请输入地点', trigger: 'blur' },
                    { trigger: 'blur' }                                        
                    ],
                    time: [
                    { required: true, message: '请输入上课时间', trigger: 'blur' },
                    { trigger: 'blur' }                                        
                    ],
                    count: [
                    { required: true, message: '请输入节数', trigger: 'blur' },
                    { trigger: 'blur' }                                        
                    ],
                    tname: [
                    { required: true, message: '请输入教师', trigger: 'blur' },
                    { trigger: 'blur' }                                        
                    ],
                    weekday: [
                    { required: true, message: '请输入上课平日', trigger: 'blur' },
                    { trigger: 'blur' }                                        
                    ],
                    total: [
                    { required: true, message: '请输入总课时数', trigger: 'blur' },
                    { trigger: 'blur' }                                        
                    ],
                }
            }
        },
    	components: {
    		headTop,
            // visitorPie,
        },
        activated() {
            //获取路由传参
            this.courseid = this.$route.query.courseid
            this.major = this.$route.query.majorid
			this.getClassList(this.courseid,this.major);            
        },
    	mounted(){
            if(!sessionStorage.getItem("authen"))
            {
                this.$router.push('/')
            }            
            this.getAllTeacher()
            this.getAllMajor();
        },
    	methods: {
            //获取所有的老师
            getAllTeacher(){
                let req = {
                    type:"get",
                    url:'classList/getAllTeacher/',
                    //post请求写data get请求写params
                    params:null
                }
                this.getFN(req).then(r=>{                    
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
                    this.teachers = this.list.filter(item => {
                    return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
                });
                }, 200);
                } else {
                this.teachers = [];
                }
            },
            //处理按照专业检索的请求
            handleChange(value) {
            if(value[0]==0)
                this.getClassList(); 
            else
            {
                const params=new URLSearchParams()//接口定义了一些实用的方法来处理 URL 的查询字符串。
                params.append('major',value[0])	
                params.append('course',value[1])			
                let req = {
                    type:"get",
                    url:'classList/',
                    //post请求写data get请求写params
                     params:params
                }
                this.getFN(req).then(r=>{                    
                    this.tableData = r.data;                
                    this.count = r.len;
                    if (r.status == 1) {
                    this.$message({
                        type: 'success',
                        message: "获取班级列表信息"
                    });
                    }else{
                        this.$message({
                            type: 'error',
                            message: "获取班级列表信息失败"
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
                if(this.courseid!=null&&this.majorid!=null)
                {
                    params.append('course',this.courseid)	
                    params.append('major',this.majorid)	
                }			
                let req = {
                    type:"get",
                    url:'classList/',
                    //post请求写data get请求写params
                     params:params
                }
                this.getFN(req).then(r=>{
                    this.tableData = r.data;                                
                    this.count = r.len;
                    if (r.status == 1) {
                    this.$message({
                        type: 'success',
                        message: "获取班级列表信息"
                    });
                    }else{
                        this.$message({
                            type: 'error',
                            message: "获取班级列表信息失败"
                        });
                    }
                })		
            },
            //处理编辑的按钮
             handleEdit(val,flag) {        
                this.addClass.classname = val.name
                this.addClass.info = val.info   
                if(!flag)       
                this.editclaTableVisible = true
                this.courseid = val.courseid
                this.defaultmajor.push(val.major)
                this.major = val.major    
                this.defaultmajor.push(val.course)
                this.classid = val.classid           
                this.courseid = val.course 
                this.addClass.place = val.place
                this.addClass.time = val.time
                this.addClass.count = val.count
                this.addClass.tname = val.tname
                this.addClass.weekday = val.weekday
                this.addClass.total = val.total
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            //获取班级列表
            getClassList(courseid,majorid){			
                const params=new URLSearchParams()//接口定义了一些实用的方法来处理 URL 的查询字符串。
                params.append('page',1)	
                if(courseid!=null&&majorid!=null)
                {
                    this.courseid=courseid
                    this.majorid = majorid
                    params.append('course',this.courseid)	
                    params.append('major',this.majorid)	
                }
                let req = {
                    type:"get",
                    url:'classList/',
                    //post请求写data get请求写params
                     params:params
                }
                this.getFN(req).then(r=>{
                    this.tableData = r.data;                           
                    this.count = r.len;
                    if (r.status == 1) {
                    this.$message({
                        type: 'success',
                        message: "获取班级列表信息"
                    });
                    }else{
                        this.$message({
                            type: 'error',
                            message: "获取班级列表信息失败"
                        });
                    }
                })		
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
                this.resetFields()
            },
            // 点击添加班级
            onAddClass() {
            this.$refs.addFormRef.validate(async valid => {
                if (!valid) return null  // 如果验证失败就不往下继续执行
                const params=new FormData()//接口定义了一些实用的方法来处理 URL 的查询字符串。
				params.append('name',this.addClass.classname)			
				params.append('info',this.addClass.info)		
				params.append('place',this.addClass.place)		
				params.append('time',this.addClass.time)		
				params.append('count',this.addClass.count)		
                params.append('course',this.courseid)		
                params.append('teacherid',this.value)	
                params.append('total',this.total)	
                params.append('weekday',this.weekday)	                
                let req = {
                    type:"post",
                    url:'classList/addclass/',
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
                this.addclaTableVisible = false  // 关闭弹框
                this.resetFields()
                this.getClassList() // 重新调用，刷新表单
            })
         },
         //修改班级
         onChangeClass(){        
                this.$refs.addFormRef.validate(async valid => {

                if (!valid) return null  // 如果验证失败就不往下继续执行
                const params=new FormData()//接口定义了一些实用的方法来处理 URL 的查询字符串。
				params.append('name',this.addClass.classname)		
                params.append('info',this.addClass.info)	
                params.append('place',this.addClass.place)		
				params.append('time',this.addClass.time)		
				params.append('count',this.addClass.count)	
				params.append('course',this.courseid)		
                params.append('classid',this.classid)
                params.append('total',this.total)	
                params.append('weekday',this.weekday)		
                let req = {
                    type:"post",
                    url:'classList/changeclass/',
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
                this.editclaTableVisible = false  // 关闭弹框
                this.resetFields()
                this.getClassList() // 重新调用，刷新表单
            })
         },
         //修改班级状态
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
            }
                const params=new FormData()//接口定义了一些实用的方法来处理 URL 的查询字符串。
				params.append('status',this.stustatus)		
                params.append('classid',this.classid)		                
                let req = {
                    type:"post",
                    url:'classList/changeCstatus/',
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
                this.getClassList() // 重新调用，刷新表单
         },
         //点击取消的时候清理表格
         clearform(){
            this.editclaTableVisible = false
            this.addclaTableVisible = false
            this.resetFields()
         },
         //处理添加班级点击事件
         openaddclass(){
            this.addclaTableVisible = true
            this.resetFields()
         },        
         //重置表格
         resetFields(){
             this.addClass.classname = null
             this.addClass.info = null
             this.addClass.password = null
             this.addClass.file = null
             this.addClass.email = null
             this.addClass.place = null
             this.addClass.count = null
             this.addClass.time = null
             this.defaultmajor = []
             this.major = null
             this.courseid = null
             this.addClass.tname = null
             this.addClass.weekday = null
             this.addClass.total = null
         },
         //处理添加班级的选择专业和年级
         handleaddusermg(value){           
            this.major = value[0]
            this.courseid = value[1]
         },
         //处理上传图片
         uploadFile(param) {                
                this.addClass.pic = param.file.name
                this.addClass.stupic = param.file                                
		},
		//查看班级详情
        showstu(value){
            //路由跳转
            this.$router.push({path:'classstudentList',query:{classid:value.classid,classname:value.name}})
        },
        //修改状态
        editstatus(value){
            this.classid = value.classid            
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
            }
            this.statusTableVisible = true      
        },
		}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	
</style>
