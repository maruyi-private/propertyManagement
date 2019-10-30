import Vue from 'vue'
import Router from 'uni-simple-router'
import store from '@/store/index.js'

Vue.use(Router)
const router = new Router({
	routes: [{
			name: "index",
			path: "/pages/main/index/index"
		},
		{
			name: "payment",
			path: "/pages/payment/payment"
		},
		{
			name: "login",
			path: "/pages/login/login"
		},
		// {
		// 	name: "maintenance",
		// 	path: "/pages/main/maintenance/maintenance"
		// },
		{
			name: "maintenance",
			path: "/pages/main/maintenance/maintenance"
		},
		{
			name: "add-person",
			path: "/pages/main/maintenance/add-person"
		},
		{
			name: "bill-detail",
			path: "/pages/main/est-pay/bill-detail"
		},
		{
			name: "bill-type-detail",
			path: "/pages/main/est-pay/bill-type-detail"
		},
		{
			name: "more-bill",
			path: "/pages/main/est-pay/more-bill"
		},
		{
			name: "charge-explain",
			path: "/pages/main/est-pay/charge-explain"
		},
		{
			name: "charge-records",
			path: "/pages/main/est-pay/charge-records"
		},
		{
			name: "charge-money",
			path: "/pages/main/est-pay/charge-money"
		},
		{
			name: "est-pay",
			path: "/pages/main/est-pay/est-pay"
		},
		{
			name: "pre-pay",
			path: "/pages/main/est-pay/pre-pay"
		},
		{
			name: "shopping",
			path: "/pages/shopping/shopping"
		}, {
			name: "community",
			path: "/pages/community/community"
		},
		{
			name: "bound-house",
			path: "/pages/reg/bound-house/bound-house"
		},
		{
			name: "add-tower",
			path: "/pages/reg/bound-house/add-tower"
		}, {
			name: "add-project",
			path: "/pages/reg/bound-house/add-project"
		}, {
			name: "add-unit",
			path: "/pages/reg/bound-house/add-unit"
		}, {
			name: "add-room",
			path: "/pages/reg/bound-house/add-room"
		}, {
			name: "add-city",
			path: "/pages/reg/bound-house/add-city"
		}, {
			name: "message",
			path: "/pages/message/message"
		},  {
			name: "notice",
			path: "/pages/main/notice/notice"
		}, {
			name: "notice-detail",
			path: "/pages/main/notice/detail"
		}, {
			name: "call",
			path: "/pages/main/call/call"
		},
		{
			name: "center",
			path: "/pages/user/center/center"
		},
		{
			name: "my-house",
			path: "/pages/user/my-house/my-house"
		}, {
			name: "balance",
			path: "/pages/user/balance/balance"
		}, {
			name: "choose-type",
			path: "/pages/main/est-pay/choose-type"
		}, {
			name: "to-pay",
			path: "/pages/main/est-pay/to-pay"
		}, {
			name: "car-to-pay",
			path: "/pages/main/car/car-to-pay"
		}, {
			name: "car-pay",
			path: "/pages/main/car/car-pay"
		}, {
			name: "order",
			path: "/pages/user/order/order"
		}, {
			name: "order-detail",
			path: "/pages/user/order/detail"
		},
		{
			name: "repair-order",
			path: "/pages/user/repair-order/repair-order"
		},
		{
			name: "complain-order",
			path: "/pages/user/complain-order/complain-order"
		},
		{
			name: "my-car",
			path: "/pages/user/my-car/my-car"
		},
		{
			name: "about",
			path: "/pages/user/about/about"
		},
		{
			name: "user-agreement",
			path: "/pages/user/user-agreement/user-agreement"
		},
		{
			name: "service-explain",
			path: "/pages/user/service-explain/service-explain"
		},
		{
			name: "my-key",
			path: "/pages/main/my-key/my-key"
		},
		{
			name: "housekeeper",
			path: "/pages/main/housekeeper/housekeeper"
		},
		{
			name: "add-review",
			path: "/pages/main/housekeeper/add-review"
		},
		{
			name:"electronic_invoice",
			path: "/pages/main/electronic_invoice/electronic_invoice"
		},
		{
			name:"electronic_invoice_detail",
			path: "/pages/main/electronic_invoice/detail"
		},
		{
			name:"evaluate",
			path: "/pages/user/repair-order/evaluate"
		}
	]
})
router.beforeEach((to, from, next) => {

	//进入主页路由不用验证是否绑定房产和登录
	switch (to.name) {
		case 'index':
			next();
			return;
			break;
		case 'center':
			next();
			return;
			break;
		case 'shopping':
			next();
			return;
			break;
		case 'about':
			next();
			return;
			break;
		case 'user-agreement':
			next();
			return;
			break;
		case 'service-explain':
			next();
			return;
			break;
		case 'call':
			next();
			return;
			break;
		case 'add-tower':
			next();
			return;
			break;
		case 'add-project':
			next();
			return;
			break;
		case 'add-unit':
			next();
			return;
			break;
		case 'add-room':
			next();
			return;
			break;
		case 'add-city':
			next();
			return;
			break;
		default:
			;
	}


	if (!store.state.hasLogin) { //验证是否登录
		if (to.name === 'login') {
			next();
			return;
		}
		uni.showModal({
			content: '请先登录',
			success(res) {
				if (res.confirm) {
					next({
						name: 'login',
						NAVTYPE: 'push'
					});
				}
			}
		});
		return;
	}
	if (!store.state.hasBoundHouse) { //验证是否绑定房产
		if (to.name === 'bound-house') {
			next();
			return;
		}
		uni.showModal({
			content: '请先绑定房产',
			success(res) {
				if (res.confirm) {
					next({
						name: 'bound-house',
						NAVTYPE: 'push'
					});
				}
			}
		});
		return;
	}
	next();


})
export default router
