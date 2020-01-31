import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const teacherLIst = r => require.ensure([], () => r(require('@/page/teacherLIst')), 'teacherLIst');
const addGoods = r => require.ensure([], () => r(require('@/page/addGoods')), 'addGoods');
const studentList = r => require.ensure([], () => r(require('@/page/studentList')), 'studentList');
const classstudentList = r => require.ensure([], () => r(require('@/page/classstudentList')), 'classstudentList');
const faceInfo = r => require.ensure([], () => r(require('@/page/faceInfo')), 'faceInfo');
const foodList = r => require.ensure([], () => r(require('@/page/foodList')), 'foodList');
const orderList = r => require.ensure([], () => r(require('@/page/orderList')), 'orderList');
const adminList = r => require.ensure([], () => r(require('@/page/adminList')), 'adminList');
const courseList = r => require.ensure([], () => r(require('@/page/courseList')), 'courseList');
const classList = r => require.ensure([], () => r(require('@/page/classList')), 'classList');
const messageList = r => require.ensure([], () => r(require('@/page/messageList')), 'messageList');
const vueEdit = r => require.ensure([], () => r(require('@/page/vueEdit')), 'vueEdit');
const adminSet = r => require.ensure([], () => r(require('@/page/adminSet')), 'adminSet');
const sendMessage = r => require.ensure([], () => r(require('@/page/sendMessage')), 'sendMessage');
const explain = r => require.ensure([], () => r(require('@/page/explain')), 'explain');
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
			path: '/addGoods',
			component: addGoods,
			meta: ['添加数据', '添加商品'],
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
			path: '/faceInfo',
			component: faceInfo,
			meta: ['学生管理 ', '面部信息'],
		},{
			path: '/foodList',
			component: foodList,
			meta: ['学生管理 ', '食品列表'],
		},{
			path: '/orderList',
			component: orderList,
			meta: ['学生管理 ', '订单列表'],
		},{
			path: '/adminList',
			component: adminList,
			meta: ['学生管理 ', '管理员列表'],
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
			path: '/adminSet',
			component: adminSet,
			meta: ['设置', '管理员设置'],
		},{
			path: '/sendMessage',
			component: sendMessage,
			meta: ['设置', '发送通知'],
		},{
			path: '/explain',
			component: explain,
			meta: ['说明', '说明'],
		}]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
