// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

import Schedule from './components/Schedule'
import AddSchedule from './components/AddSchedule'
import EditSchedule from './components/EditSchedule'

Vue.use(VueResource)
Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	base: __dirname,
	routes: [
		{path: '/', component: Schedule},
		{path: '/add', component: AddSchedule},
		{path: '/edit/:id', component: EditSchedule}
	]
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	router,
  	template: `
		<div id="app">
			<router-view></router-view>
		</div>
  	`
}).$mount('#app')
