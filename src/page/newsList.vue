<template>
    <div>
        <head-top></head-top>
		 <div class="table_container">
            <!-- 关键字搜索 -->
           <el-input style="width:180px" name="search" v-model="search" placeholder="输入要搜索新闻的信息"></el-input>
            <!-- 添加新闻 -->
            <el-button type="primary" @click="openaddcategory()">添加新闻</el-button>
            <!-- 添加新闻弹框 -->
            <el-dialog
            style="width:1050px; margin-left:20%;"            
            title="添加新闻"
            @close="addDialogClose"
            :visible.sync="addstuTableVisible"
            :close-on-click-modal="false"
            >
                <el-input style="width:100%;" v-model="theme" placeholder="请输入主题"></el-input>
                <quill-editor v-model="content"
                    style="height:auto;"
                    ref="myQuillEditor"
                    class="editer"
                    :options="editorOption"
                    @ready="onEditorReady($event)">
                </quill-editor>
                <el-button type="primary" @click="submit">确定</el-button>
            </el-dialog>
            <!-- 编辑新闻弹框 -->
            <el-dialog
            style="width:1050px; margin-left:20%;"            
            title="编辑新闻"
            @close="addDialogClose"
            :visible.sync="editstuTableVisible"
            :close-on-click-modal="false"
            >
            <!-- 编辑新闻的表单 -->
            <el-form enctype="multipart/form-data" ref="addFormRef" :rules="rulesAddUser" :model="addcategory" label-width="130px">
                <el-input style="width:100%;" v-model="addcategory.categoryname" placeholder="请输入主题"></el-input>
                <quill-editor v-model="content"
                    style="height:auto;"
                    ref="myQuillEditor"
                    class="editer"
                    :options="editorOption"
                    @ready="onEditorReady($event)">
                </quill-editor>
                <el-button type="primary" @click="changenew">确定</el-button>
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
            <!-- 新闻信息表格 -->
           <el-table
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
                <!-- 新闻标题 -->
                <el-table-column
                label="新闻标题"
                prop="name">
                </el-table-column>
                <!-- 创建时间 -->
                <el-table-column
                label="创建时间"
                prop="time">
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
                <!-- 操作新闻对象 -->
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
        </div>
        <!-- <visitor-pie :pieData="pieData"></visitor-pie> -->
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import { quillEditor } from 'vue-quill-editor'
    // import visitorPie from '@/components/visitorPie'	
    export default {
    	data(){
            return {
                //搜索状态
                searchmajor:'',
                //新闻的状态
                stustatus:'',                             
                tableData: [],
                categoryid: 0,
                editorOption: {			        
                },
                search: '',
                currentPage: 0,
                count:0,
                options: [],
                theme:'',       
                newid:'',
                content:'',
                //默认的选项
                defaultmajor:[],
                //图片的显示格式
                fit:"fill",
                //添加新闻
                addstuTableVisible:false,
                //修改新闻
                editstuTableVisible:false,
                //修改状态
                statusTableVisible:false,
                //添加新闻时的专业年级
                grade:'',
                major:'',
                // 添加新闻
                addcategory: {
                    categoryname: '',
                    info: '',                   
                },
                // 验证规则
                rulesAddUser: {
                    categoryname: [
                    { required: true, message: '请输入新闻名', trigger: 'blur' }
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
            quillEditor
        },
        computed: {
          	editor() {
	        	return this.$refs.myQuillEditor.quill
	      	}
        },
        activated() {
            //获取路由传参
            this.categoryid = this.$route.query.categoryid            
			this.getNewList();            
        },
    	mounted(){
            if(!sessionStorage.getItem("authen"))
            {
                this.$router.push('/')
			}
			this.getNewList();
        },
    	methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            //处理编辑的按钮
             handleEdit(val,flag) {   
                this.addcategory.categoryname = val.name
                this.content = val.intro
                this.newid = val.newid
                if(!flag)       
                this.editstuTableVisible = true     
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            //获取新闻列表
            getNewList(){			
                const params=new URLSearchParams()//接口定义了一些实用的方法来处理 URL 的查询字符串。
				params.append('cid',this.categoryid)				
                let req = {
                    type:"get",
                    url:'newList/',
                    //post请求写data get请求写params
                     params:params
                }
                this.getFN(req).then(r=>{
                    this.tableData = r.data;                                               
                    this.count = r.len;
                    if (r.status == 1) {
                    this.$message({
                        type: 'success',
                        message: "获取新闻列表信息"
                    });
                    }else{
                        this.$message({
                            type: 'error',
                            message: "获取新闻列表信息失败"
                        });
                    }
                })		
            },
             // 关闭弹框的回调
            addDialogClose() {
                this.resetFields()
            },
         //修改新闻状态
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
                params.append('nid',this.newid)		                
                let req = {
                    type:"post",
                    url:'newList/changeNstatus/',
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
                this.getNewList() // 重新调用，刷新表单
         },
         //点击取消的时候清理表格
         clearform(){
            this.editstuTableVisible = false
            this.addstuTableVisible = false
            this.resetFields()
         },
         //处理添加新闻点击事件
         openaddcategory(){
            this.addstuTableVisible = true
            this.resetFields()
         },        
         //重置表格
         resetFields(){
             this.addcategory.categoryname = null
             this.addcategory.info = null
             this.addcategory.password = null
             this.addcategory.file = null
             this.addcategory.email = null
             this.defaultmajor = []
         },
        onEditorReady(editor) {
		        console.log('editor ready!', editor)
		    },
		submit(){                                
                const params=new URLSearchParams()//接口定义了一些实用的方法来处理 URL 的查询字符串。
                params.append('content',this.content)	
                params.append('cid',this.categoryid)                
                if(this.theme == '')
                this.theme = '无主题'
                params.append('theme',this.theme)                
                let req = {
                    type:"post",
                    url:'newList/addNew/',
                    //post请求写data get请求写params
                        data:params
                }
                this.getFN(req).then(r=>{                                  
                    if (r.status == 1) {
                    this.$message({
                        type: 'success',
                        message: "发送消息成功"
                    });
                    }else{
                        this.$message({
                            type: 'error',
                            message: "获取班级列表信息失败"
                        });
                    }
                      location.reload()
                })
            },
        //修改内容
        changenew(){
             const params=new URLSearchParams()//接口定义了一些实用的方法来处理 URL 的查询字符串。
                params.append('content',this.content)	
                params.append('cid',this.categoryid)      
                params.append('nid',this.newid)      
                if(this.addcategory.categoryname == '')
                params.append('theme','无主题')    
                else
                params.append('theme',this.addcategory.categoryname)                
                let req = {
                    type:"post",
                    url:'newList/changeNew/',
                    //post请求写data get请求写params
                        data:params
                }
                this.getFN(req).then(r=>{                                  
                    if (r.status == 1) {
                        this.content = ''
                    this.$message({
                        type: 'success',
                        message: "发送消息成功"
                    });
                    }else{
                        this.$message({
                            type: 'error',
                            message: "获取班级列表信息失败"
                        });
                    }
                      location.reload()
                })
        },
        //修改状态
        editstatus(value){
            this.newid = value.newid
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
    .edit_container{
		padding: 40px;
		margin-bottom: 40px;
	}
	.editer{
		height: 350px;
	}
	.submit_btn{
		text-align: center;
	}
</style>
