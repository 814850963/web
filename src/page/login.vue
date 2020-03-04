<template>
  	<div class="login_page fillcontain">
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer" v-show="showLogin">
		  		<div class="manage_tip">
		  			<p>东软校园智能助手后台管理系统</p>
		  		</div>
		    	<el-form :model="loginForm" :rules="rules" ref="loginForm">
					<el-form-item prop="username">
						<el-input v-model="loginForm.username" placeholder="用户名"><span>dsfsf</span></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
					</el-form-item>
					<el-form-item>
				    	<el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
				  	</el-form-item>
				</el-form>
				<p class="tip">温馨提示：</p>
				<p class="tip">能力越大，责任越大</p>
				<p class="tip">由东软YHT提供技术支持</p>
	  		</section>
	  	</transition>
  	</div>
</template>

<script>
	import {login, getAdminInfo} from '@/api/getData'
	import {mapActions, mapState} from 'vuex'

	export default {
	    data(){
			return {
				res:{},
				loginForm: {
					username: '',
					password: '',
				},
				rules: {
					username: [
			            { required: true, message: '请输入用户名', trigger: 'blur' },
			        ],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
				},
				showLogin: false,
			}
		},
		mounted(){
			this.showLogin = true;
		},
		computed: {
		
		},
		methods: {
			 submitForm(formName) {
				const params=new URLSearchParams()//接口定义了一些实用的方法来处理 URL 的查询字符串。
				params.append('name',this.loginForm.username)
				params.append('passwd',this.loginForm.password)
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
							// await this.$axios.post(`web/login`, params )
							// .then(function(response) {
							// const data = response.data;
							// console.log(data)
							// }, function(response) {});
							//发送请求
							let req = {
								type:"post",
								url:'login/',
								//post请求写data get请求写params
								data:params
							}
							this.postFN(req).then(r=>{
								this.res = r;
								if (this.res.status == 1) {
								this.$message({
									type: 'success',
									message: this.res.result
								});
								sessionStorage.setItem("authen",this.res.authen)
								this.$router.push('manage')
								}else{
									this.$message({
										type: 'error',
										message: this.res.result
									});
								}
							})									
						
					} else {
						this.$notify.error({
							title: '错误',
							message: '请输入正确的用户名密码',
							offset: 100
						});
						return false;
					}
				});
				
				
				
				
			},
		},
		watch: {
		}
	}
</script>

<style lang="less" scoped>
	@import '../style/mixin';
	.login_page{
		background-color: #324057;
	}
	.manage_tip{
		position: absolute;
		width: 100%;
		top: -100px;
		left: 0;
		p{
			font-size: 34px;
			color: #fff;
		}
	}
	.form_contianer{
		.wh(320px, 210px);
		.ctp(320px, 210px);
		padding: 25px;
		border-radius: 5px;
		text-align: center;
		background-color: #fff;
		.submit_btn{
			width: 100%;
			font-size: 16px;
		}
	}
	.tip{
		font-size: 12px;
		color: red;
	}
	.form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	}
	.form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
</style>
