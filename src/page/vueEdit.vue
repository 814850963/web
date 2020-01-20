<template>
    <div>
        <head-top></head-top>
        <div class="edit_container">
            <p>请选择需要发送信息的班级⬇</p>
            <!-- 按照状态检索 -->
            <el-cascader   
                :options="options"
                @change="handleChange"
                placeholder="请选择专业和班级">
            </el-cascader>
            <el-input v-model="theme" placeholder="请输入主题"></el-input>
        	<quill-editor v-model="content"
                ref="myQuillEditor"
                class="editer"
                :options="editorOption"
                @ready="onEditorReady($event)">
  			</quill-editor>
        </div>
        <div class="submit_btn">
  			<el-button type="primary" @click="submit">提交</el-button>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import { quillEditor } from 'vue-quill-editor'

    export default {
        data(){
            return {
                content: '<h3>文本编辑</h3>',
			    editorOption: {
			        
                },
                options: [],    
                classid:'',   
                theme:'',         
                
            }
        },
    	components: {
    		headTop,
    		quillEditor,
    	},
        computed: {
          	editor() {
	        	return this.$refs.myQuillEditor.quill
	      	}
        },
        mounted(){
            this.getAllMCC()
        },
        methods: {
		    onEditorReady(editor) {
		        console.log('editor ready!', editor)
		    },
		    submit(){
                console.log(this.content);                
                const params=new URLSearchParams()//接口定义了一些实用的方法来处理 URL 的查询字符串。
                params.append('content',this.content)	
                params.append('classid',this.classid)
                if(this.theme == '')
                this.theme = '无主题'
                params.append('theme',this.theme)
                params.append('teacherid',6)
                let req = {
                    type:"post",
                    url:'infoManage/sendMessage/',
                    //post请求写data get请求写params
                        data:params
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
            //处理按照专业检索的请求
            handleChange(value) {        
                this.classid = value[2]                       	                       
            },
        },
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
