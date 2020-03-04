import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const teacherLIst = r => require.ensure([], () => r(require('@/page/teacherLIst')), 'teacherLIst');
const studentList = r => require.ensure([], () => r(require('@/page/studentList')), 'studentList');
const classstudentList = r => require.ensure([], () => r(require('@/page/classstudentList')), 'classstudentList');
const courseList = r => require.ensure([], () => r(require('@/page/courseList')), 'courseList');
const classList = r => require.ensure([], () => r(require('@/page/classList')), 'classList');
const messageList = r => require.ensure([], () => r(require('@/page/messageList')), 'messageList');
const vueEdit = r => require.ensure([], () => r(require('@/page/vueEdit')), 'vueEdit');
const checkscale = r => require.ensure([], () => r(require('@/page/checkscale')), 'checkscale');
const newsList = r => require.ensure([], () => r(require('@/page/newsList')), 'newsList');
const categoryList = r => require.ensure([], () => r(require('@/page/categoryList')), 'categoryList');
const majorList = r => require.ensure([],()=> r(require('@/page/majorList')),'majorList');
const checkingList = r =>require.ensure([],()=>r(require('@/page/checkingList')),'checkingList');
const checkStudent = r =>require.ensure([],()=>r(require('@/page/checkStudent')),'checkStudent');

const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '',
			component: home,
			meta: [],
		},{
			path: '/teacherLIst',
			component: teacherLIst,
			meta: ['教师管理', '教师列表'],
		},{
			path: '/studentList',
			component: studentList,
			meta: ['学生管理 ', '学生列表'],
		},{
			path: '/classstudentList',
			component: classstudentList,
			meta: ['班级管理 ', '学生列表'],
		},{
			path: '/checkingList',
			component: checkingList,
			meta: ['课程管理', '班级列表', '考勤列表'],
		},{
			path: '/checkStudent',
			component: checkStudent,
			meta: ['课程管理', '班级列表', '考勤列表','考勤学生'],
		},{
			path: '/courseList',
			component: courseList,
			meta: ['课程管理', '课程列表'],
		},{
			path: '/classList',
			component: classList,
			meta: ['课程管理', '班级列表'],
		},{
			path: '/majorList',
			component: majorList,
			meta: ['课程管理', '专业列表'],
		},{
			path: '/messageList',
			component: messageList,
			meta: ['消息管理', '消息列表'],
		},{
			path: '/vueEdit',
			component: vueEdit,
			meta: ['消息管理', '发送消息'],
		},{
			path: '/checkscale',
			component: checkscale,
			meta: ['考勤管理', '考勤列表'],
		},{
			path: '/categoryList',
			component: categoryList,
			meta: ['新闻管理', '新闻种类'],
		},{
			path: '/newsList',
			component: newsList,
			meta: ['新闻管理','新闻种类', '新闻列表']
		}]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
