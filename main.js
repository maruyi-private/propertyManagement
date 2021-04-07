import Vue from 'vue'
import App from './App'

import store from './store'
import api from './common/js/api.js'
import uitls from './common/js/common.js'
import router from './common/js/router.js'
import routerLink from './node_modules/uni-simple-router/component/router-link.vue'
import * as util from '@/common/oyyl-js/util.js'


Vue.component('router-link',routerLink)

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$api = api
Vue.prototype.$uitls = uitls
Vue.prototype.$util = util
Vue.prototype.$docType = { 报修: 0, 报事: 1 }
Vue.prototype.$docStatus = { 待接单: 0, 已处理: 1, 处理中: 2, 已派单: 3, 待评价: 4, 已终结: 5 }

App.mpType = 'app'

const app = new Vue({
    store,
	router,
    ...App
})
app.$mount()
