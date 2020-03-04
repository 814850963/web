<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
					<el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-document"></i>学生管理</template>
						<el-menu-item index="studentList">学生列表</el-menu-item>																		
					</el-submenu>
					<el-submenu index="3">
						<template slot="title"><i class="el-icon-plus"></i>教师管理</template>
						<el-menu-item index="teacherList">教师列表</el-menu-item>						
					</el-submenu>
					<el-submenu index="4">
						<template slot="title"><i class="el-icon-star-on"></i>课程管理</template>
						<el-menu-item index="courseList">课程列表</el-menu-item>
						<el-menu-item index="classList">班级列表</el-menu-item>
						<el-menu-item index="majorList">专业列表</el-menu-item>
					</el-submenu>
					<el-submenu index="5">
						<template slot="title"><i class="el-icon-edit"></i>通知管理</template>
						<el-menu-item index="messageList">消息列表</el-menu-item>
						<el-menu-item index="vueEdit">发送消息</el-menu-item>
					</el-submenu>
					<el-submenu index="6">
						<template slot="title"><i class="el-icon-setting"></i>考勤管理</template>
						<el-menu-item index="checkscale">查看考勤比例</el-menu-item>
						<!-- <el-menu-item index="sendMessage">发送通知</el-menu-item> -->
					</el-submenu>
					<el-submenu index="7">
						<template slot="title"><i class="el-icon-warning"></i>新闻管理</template>					
						<el-menu-item index="categoryList">新闻列表</el-menu-item>						
					</el-submenu>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
    export default {
		computed: {
			data(){
				return{
					
				}
			},
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
		mounted(){
			if(!sessionStorage.getItem("authen"))
            {
                this.$router.push('/')
            }
		},
		methods(){

		},
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
	.manage_page{
		
	}
</style>
