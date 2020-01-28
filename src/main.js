import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import axios from 'axios'
import http from './api/http'
import VCharts from 'v-charts'
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(http)
Vue.use(VCharts)
Vue.use(ElementUI);

sessionStorage.setItem('server','localhost:8000')

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components:{ App },
	render: h=>h(App)
})
