<template>
	<view class="content">
		<view>
			<view class="forget-bg">
				<view class="forget-card">
					<view class="forget-input forget-margin-b"><input type="number" placeholder="请输入您的手机号" v-model="tel" /></view>
					<view class="forget-input forget-margin-b">
						<view class="verify-left"><input type="number" placeholder="请输入验证码" v-model="code" /></view>
						<view class="verify-right" v-show="show"><button class="verify-btn" type="primary" @click="getCode">获取验证码</button></view>
						<view class="verify-right" v-show="!show">
							<button class="verify-btn-active">{{ count }} s后重试</button>
						</view>
					</view>
				</view>
			</view>
			<view class="forget-btn"><button class="landing" type="primary" :disabled="code === ''" @click="bindLogin">登陆</button></view>
		</view>
		<view class="oauth-row" v-if="hasProvider" v-bind:style="{ top: positionTop + 'px' }">
			<view class="oauth-image" v-for="provider in providerList" :key="provider.value"><image :src="provider.image" @tap="oauth(provider.value)"></image></view>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="forget-btn">
			<!-- <button style=" border-radius: 44upx;height: 84upx;line-height: 84upx; " type="primary" open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber">
				<i style="height: 80upx;line-height: 80upx;" class="iconfont iconweixin">微信用户快速登陆</i>
			</button> -->
			<button style=" border-radius: 44upx;height: 84upx;line-height: 84upx; " type="primary" open-type="getUserInfo" @getuserinfo="mpWxGetUserInfo">
				<i style="height: 80upx;line-height: 80upx;" class="iconfont iconweixin">微信登陆</i>
			</button>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
import mInput from '@/components/m-input.vue';
import loginMpWx from '@/common/oyyl-mixin/login-mp-wx.js'

export default {
	components: {
		mInput
	},
	mixins: [loginMpWx],
	data() {
		return {
			providerList: [],
			hasProvider: false,
			tel: '',
			code: '',
			positionTop: 0,
			globalData: {},
			userInfo: {},
			show: true,
			imei: '', //设备唯一标识
			timestamp: '',
			count: 0
		};
	},
	onLoad() {
		let _this = this;
		this.timestamp = new Date().getTime();
		// #ifdef MP-WEIXIN
		uni.login({
			provider: 'weixin',
			success(loginRes) {
				console.log(JSON.stringify(loginRes));
				// 获取用户信息
				// uni.getUserInfo({
				//   provider: 'weixin',
				//   success (infoRes) {
				//     console.log('用户昵称为：' + JSON.stringify(infoRes));
				//   }
				// });
			}
		});
		// #endif
		// #ifdef APP-PLUS
		plus.device.getInfo({
			success(e) {
				_this.imei = e.imei;
			}
		});
		// #endif
	},
	methods: {
		getPhoneNumber(e) {
			console.log(e.detail.errMsg);
			console.log(e.detail.iv);
			console.log(e.detail.encryptedData);
		},

		getCode() {
			if (!this.$uitls.isPhone(this.tel)) {
				return;
			}
			let data = {
				tel: this.tel
			};
			uni.showLoading({
				title: '正在获取验证码'
			});
			this.timers();
			// this.$api.sendSms(data, res => {
			// 	uni.showToast({
			// 		icon: 'none',
			// 		title: res.msg
			// 	});
			// 	this.timers();
			// });
		},
		//倒计时
		timers() {
			const TIME_COUNT = 120;
			if (!this.timer) {
				this.count = TIME_COUNT;
				this.show = false;
				this.timer = setInterval(() => {
					if (this.count > 0 && this.count <= TIME_COUNT) {
						this.count--;
					} else {
						this.show = true;
						clearInterval(this.timer);
						this.timer = null;
					}
				}, 1000);
			}
		},
		initProvider() {
			const filters = ['weixin'];
			uni.getProvider({
				service: 'oauth',
				success: res => {
					if (res.provider && res.provider.length) {
						for (let i = 0; i < res.provider.length; i++) {
							if (~filters.indexOf(res.provider[i])) {
								if (res.provider[i] === 'weixin') {
									this.providerList.push({
										value: res.provider[i],
										image: '../../static/img/' + res.provider[i] + '.png'
									});
								}
							}
						}
						this.hasProvider = true;
					}
				},
				fail: err => {
					console.error('获取服务供应商失败：' + JSON.stringify(err));
				}
			});
		},

		initPosition() {
			/**
			 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
			 * 反向使用 top 进行定位，可以避免此问题。
			 */
			this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
		},
		bindLogin() {
			let data = {
				timestamp: new Date().getTime(),
				appkey: this.$store.state.appkey,
				tel: this.tel,
				imei: this.imei,
				code: this.code
			};
			if (!this.$uitls.isPhone(this.tel)) {
				return;
			}
			if (!this.code) {
				uni.showToast({
					icon: 'none',
					title: '请输入验证码'
				});
				return;
			}

			let datas = {
				login_token: '12213212123'
			};

			try {
				uni.setStorageSync('loginToken', datas);
				this.$store.commit('loginToken', datas);
			} catch (e) {
				//TODO handle the exception
			}

			if (this.$store.state.hasLogin) {
				this.$Router.replaceAll({ name: 'index' });
			}

			// this.$api.logins(data, res => {
			// 	try {
			// 		uni.setStorageSync('loginToken', res.data);
			// 		this.$store.commit('loginToken', res.data);
			// 	} catch (e) {
			// 		//TODO handle the exception
			// 	}

			// 	if (this.$store.state.hasLogin) {
			// 		this.$Router.replaceAll({ name: 'index' });
			// 	}
			// });
		},
		oauth(value) {
			// uni.showLoading({
			// 	title:'正在登陆...'
			// })
			uni.login({
				provider: value,
				success: res => {
					uni.getUserInfo({
						provider: value,
						success: infoRes => {
							/**
							 * 实际开发中，获取用户信息后，需要将信息上报至服务端。
							 * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
							 */
							this.toMain(infoRes.userInfo);
						}
					});
				},
				fail: err => {
					uni.hideLoading();
					uni.showToast({
						icon: 'none',
						title: '授权登录失败：' + JSON.stringify(err.errMsg)
					});
				}
			});
		},
		toMain(userInfo) {
			this.$store.commit('loginWeChat', userInfo);
			if (this.$store.state.hasAuthorized) {
				this.login();
			} else {
				uni.navigateBack();
			}
		},
		login() {
			let data = {
				openid: this.$store.state.wxUserInfo.openId,
				appkey: this.$store.state.appkey,
				timestamp: this.timestamp,
				tel: this.tel,
				imei: this.imei
			};
			if (!this.tel) {
				uni.showToast({
					icon: 'none',
					title: '绑定手机号'
				});
				return;
			}
			if (!this.$uitls.isPhone(this.tel)) {
				uni.showToast({
					icon: 'none',
					title: '请输入正确的手机号'
				});
				return;
			}
			this.$api.logins(data, res => {
				this.$store.commit('loginToken', res.data);
				if (this.$store.state.hasLogin) {
					this.$Router.replaceAll({ name: 'main' });
				}
			});
		}
	},
	onReady() {
		// #ifdef APP-PLUS
		this.initPosition();
		this.initProvider();
		// #endif
	}
};
</script>

<style>
.verify-left {
	width: calc(100% - 260upx);
}
.verify-right {
	padding-left: 20upx;
	margin-top: 10upx;
}
.verify-btn {
	height: 80upx;
	line-height: 80upx;
	font-size: 28upx;
	width: 240upx;
	border-radius: 8upx;
	text-align: center;
	color: #ffffff;
	background: linear-gradient(left, #ff978d, #ffbb69);
}
.verify-btn-active {
	height: 80upx;
	line-height: 80upx;
	font-size: 28upx;
	width: 240upx;
	border-radius: 8upx;
	text-align: center;
	color: #ffffff;
	background: #898989;
}
.verify-left,
.verify-right {
	float: left;
}
.landing {
	height: 84upx;
	line-height: 84upx;
	border-radius: 44upx;
	font-size: 32upx;
	background: linear-gradient(left, #ff978d, #ffbb69);
}
.forget-btn {
	padding: 10upx 20upx;
	margin-top: 100upx;
}

.forget-input input {
	background: #f2f5f6;
	font-size: 28upx;
	padding: 10upx 25upx;
	height: 82upx;
	line-height: 68upx;
	border-radius: 2.5rem;
}
.forget-margin-b {
	margin-bottom: 25upx;
}
.forget-input {
	padding: 10upx 20upx;
	overflow: auto;
}
.forget-card {
	background: #fff;
	border-radius: 12upx;
	padding: 60upx 25upx;
	box-shadow: 0 6upx 18upx rgba(0, 0, 0, 0.12);
	position: relative;
	margin-top: 60upx;
}
.forget-bg {
	/* height: 260upx;
	padding: 25upx;
	background: linear-gradient(#ff978d, #ffbb69); */
}
.action-row {
	display: flex;
	flex-direction: row;
	justify-content: center;
}

.action-row navigator {
	color: #007aff;
	padding: 0 20upx;
}

.oauth-row {
	display: flex;
	flex-direction: row;
	justify-content: center;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
}

.oauth-image {
	width: 100upx;
	height: 100upx;
	border: 1upx solid #dddddd;
	border-radius: 100upx;
	margin: 0 40upx;
	background-color: #ffffff;
}

.oauth-image image {
	width: 60upx;
	height: 60upx;
	margin: 20upx;
}
</style>
