import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		// baseUrl:'http://192.168.8.106/',
		baseUrl: '',
		invoiceBaseUrl: '', //
		baseImgUrl: '', //七牛云图片查看
		appkey: '',
		login_token: '', //登录token

		hasLogin: false, //是否已经登陆
		hasBoundHouse: false, //是否绑定房产
		myHouse: '', //个人中心数据
		hasAuthorized: false, //是否微信授权
		wxUserInfo: '', //微信登录信息
		userInfo: {}, // 登录组件导入

		city: {}, //绑定城市
		village: {}, //绑定楼盘
		tower: {}, //绑定楼栋
		unit: {}, //绑定单元
		room: {}, //绑定房号
		
		citys: [], // 已开通服务的所有城市
		project: [], // 当前城市下所有开通服务的楼盘
		towers: [], // 当前楼盘下所有的楼栋
		units: [], // 当前楼栋下的所有单元
		rooms: [], // 当前单元的所有房间

		myRoom: {}, //当前房产和全部车位信息
		changeCar: '', //选择车位
		carData: {}, //车位欠费数据
		roomData: {}, //房屋欠费数据
		orderData: '', //支付订单数据
		accountData: '', //用户账户信息

		qiniuData: '', //服务端七牛云数据
		contacts: '', //报事报修联系人
		familyData: '', //报事报修
		publicData: '', //投诉建议

		pushMessage:'', //推送数据
	},
	// 登录组件导入
	getters: {
		userId(state) {
			return state.userInfo.id || null;
		}
	},
	mutations: {
		// 登录组件导入 更新state数据
		setStateAttr(state, param) {
			if (param instanceof Array) {
				for (let item of param) {
					state[item.key] = item.val;
				}
			} else {
				state[param.key] = param.val;
			}
		},
		updatePushMessage(state, message) {
			/**
			 * 注意：这里为了方便预览查看效果，始终对 payload 做了序列化的处理。
			 * 实际开发期中，请自行调整代码并注意发送的 payload 消息格式。
			 */
			// let payload = message.payload;
			// if (typeof payload !== 'string') {
			// 	message.payload = JSON.stringify(payload);
			// }
			state.pushMessage = message || {};
		},
		bindHouse(state, data) { //绑定房产
			state.hasBoundHouse = true;
			try {
				uni.setStorageSync('hasBoundHouse', true);
			} catch (e) {
				// error
			}
		},
		setQiniuData(state, data) {
			state.qiniuData = data;
		},
		setAccountData(state, data) {
			state.accountData = data;
		},
		setFamilyData(state, data) {
			state.familyData = data;
		},
		setPublicData(state, data) {
			state.publicData = data;
		},
		setContacts(state, data) {
			state.contacts = data;
		},
		setHasLogin(state, data) { //设置已登录
			state.hasLogin = true;
		},
		setMyRoom(state, data) {
			state.myRoom = data;
		},
		loginToken(state, data) { //登陆token
			state.login_token = data.login_token;
			state.hasLogin = true;
			try {
				uni.setStorageSync('hasLogin', true);
			} catch (e) {
				// error
			}
		},
		loginWeChat(state, userInfo) { //微信登陆信息
			if (userInfo.openId !== null) {
				state.hasAuthorized = true;
				state.wxUserInfo = userInfo;
				try {
					uni.setStorageSync('wxUserInfo', userInfo);
				} catch (e) {
					// error
				}
			}
		},
		logout(state) { //退出登陆
			state.hasLogin = false;
			state.hasBoundHouse = false;
			state.myHouse = '';
			state.login_token = null;
			try {
				// uni.removeStorageSync('hasLogin');
				// uni.removeStorageSync('wxUserInfo');
				// uni.removeStorageSync('loginToken');
				// uni.removeStorageSync('userInfo'); // 登录模块导入 退出登录
				uni.clearStorageSync();
			} catch (e) {
				// error
			}
		},
		// 登录模块导入 退出登录
		// logout({state,commit}) {
		// 	commit('setStateAttr', {
		// 		key: 'userInfo',
		// 		val: {}
		// 	})
		// 	uni.removeStorageSync('userInfo');
		// },
		setChangeCar(state, data) {
			state.changeCar = data
		},
		setCity(state, data) { //城市
			state.city = data
			state.village = ''
			state.tower = ''
			state.unit = ''
			state.room = ''
		},
		setCitys(state, data) { // 开通服务的所有城市
			state.citys = data
		},
		setVillage(state, data) { //楼盘
			state.village = data
			state.tower = ''
			state.unit = ''
			state.room = ''
		},
		setProject(state, data) { // 开通服务城市的所有楼盘
			state.project = data
		},
		setTower(state, data) { //楼栋
			state.tower = data
			state.unit = ''
			state.room = ''
		},
		setTowers(state, data) { // 当前楼盘下所有的楼栋
			state.towers = data
		},
		setUnit(state, data) { //单元
			state.unit = data
			state.room = ''
		},
		setUnits(state, data) { // 当前楼栋下所有的单元
			state.units = data
		},
		setRoom(state, data) { //房号
			state.room = data
		},
		setRooms(state, data) { // 当前单元所有的房号
			state.rooms = data
		},
		setCarData(state, data) {
			state.carData = data;
		},
		setRoomData(state, data) {
			state.roomData = data;
		},
		async setMyHouse(state, data) {
			// state.hasLogin = true;
			if (data) {
				state.hasBoundHouse = true;
				uniCloud.callFunction({
					name: 'getMyHouse',
					data: { id: data }
				}).then((res) => {
					console.log(res);
					state.myHouse = res.result.data;
				});
			} else {
				state.hasBoundHouse = false;
			}
		},
		setOrderData(state, data) {
			state.orderData = data;
		},
		setUserInfo(state, data) {
			state.userInfo = data;
		},
		setLoginToken(state, data) {
			state.login_token = data.id;
		}
	},
	actions: {
		loginToken(context) {
			context.commit('loginToken')
		},
		loginWeChat(context) {
			context.commit('loginWeChat')
		},
		setTower(context) {
			context.commit('setTower')
		},
		setUnit(context) {
			context.commit('setUnit')
		},
		setRoom(context) {
			context.commit('setRoom')
		},
		setMyRoom(context) {
			context.commit('setMyRoom')
		},
		// 登录模块导入 
		async setUserData({state,commit}, data) {
			commit('setStateAttr', {
				key: 'userInfo',
				val: data
			})
			console.log('setUserData', data);
			uni.setStorageSync('userInfo', data);
			// commit('bindHouse');
			commit('setHasLogin');
			commit('setUserInfo', data);
			commit('setLoginToken', data);
		},
		async setMyHouse({state,commit}, data) {
			commit('setMyHouse', data);
		}
	}
})

export default store
