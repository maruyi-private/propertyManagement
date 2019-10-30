<template>
	<view>
		<view class="uni-padding-wrap">
			<view style="background:#FFF; padding:50upx 0;">
				<view class="uni-hello-text uni-center">支付金额</view>
				<view class="uni-h1 uni-center uni-common-mt">
					<text class="rmbLogo">￥</text>
					<input class="price color-font-orange" type="digit" :value="orderInfo.money" maxlength="10" disabled="true" />
				</view>
			</view>
			<view class="pay-type">请选择支付方式</view>
		</view>
		<view class="payment-content">
			<view class="payment-content-cell" v-for="(item, index) in providerList" :key="index" @click="requestPayment(item, index)">
				<image :src="'/static/img/' + item.id + '.png'" mode="aspectFit" class="pay-icon"></image>
				<view class="uni-cell-lineheight-80" :loading="item.loading">{{ item.name }}</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			loading: false,
			providerList: []
		};
	},
	computed: {
		orderInfo() {
			return this.$store.state.orderData;
		}
	},
	onLoad: function() {
		uni.getProvider({
			service: 'payment',
			success: e => {
				let providerList = [];
				e.provider.map(value => {
					switch (value) {
						case 'alipay':
							providerList.push({
								name: '支付宝',
								id: value,
								loading: false
							});
							break;
						case 'wxpay':
							providerList.push({
								name: '微信',
								id: value,
								loading: false
							});
							break;
						default:
							break;
					}
				});
				this.providerList = providerList;
			},
			fail: e => {
				console.log('获取支付通道失败：', e);
			}
		});
	},
	methods: {
		async requestPayment(e, index) {
			// uni.showLoading({
			// 	title: '发起支付'
			// });

			if (e.id === 'alipay') {
				uni.showToast({
					icon: 'none',
					title: '敬请期待，支付宝支付上线...'
				});
				return;
			}

			let orderInfo = await this.getOrderInfo();

			if (orderInfo.code !== 1) {
				uni.showModal({
					content: '获得订单信息失败',
					showCancel: false
				});
				uni.hideLoading();
				return;
			}
			let orderInfos = {
				appid: orderInfo.data.appid,
				noncestr: orderInfo.data.noncestr,
				package: orderInfo.data.package,
				partnerid: orderInfo.data.partnerid,
				prepayid: orderInfo.data.prepayid,
				timestamp: orderInfo.data.timestamp,
				sign: orderInfo.data.sign
			};
			// let orderInfos = orderInfo.data;
			uni.hideLoading();
			// #ifdef MP-WEIXIN
			const timeStamp = JSON.stringify(orderInfos.timestamp); 
			const nonceStrs = orderInfos.noncestr; 
			const packages = orderInfos.prepayid; 
			const paySign = orderInfos.sign;
			
			uni.requestPayment({
				timeStamp: timeStamp,
				nonceStr: nonceStrs,
				package: packages,
				signType: 'MD5',
				paySign: paySign,
				success: e => {
					uni.showToast({
						title: '感谢您的使用!',
						success() {
							uni.navigateBack({
								delta: 2
							});
						}
					});
				},
				fail: e => {
					uni.showModal({
						content: '支付失败',
						showCancel: false
					});
				},
				complete: () => {
					this.providerList[index].loading = false;
				}
			});

			// #endif
			uni.requestPayment({
				provider: e.id,
				orderInfo: orderInfos,
				success: e => {
					uni.showToast({
						title: '感谢您的使用!',
						success() {
							uni.navigateBack({
								delta: 2
							});
						}
					});
				},
				fail: e => {
					uni.showModal({
						content: '支付失败',
						showCancel: false
					});
				},
				complete: () => {
					this.providerList[index].loading = false;
				}
			});
		},

		getOrderInfo() {
			let _this = this;
			// 实际的支付

			// 模拟支付
			let appid = "";
			let price = 0.01
			// #ifdef APP-PLUS
			appid = plus.runtime.appid;
			// #endif
			let url = 'https://demo.dcloud.net.cn/payment/?payid=' + e + '&appid=' + appid + '&total=' + price;
			return new Promise((res) => {
			    uni.request({
			        url: url,
			        success: (result) => {
						uni.hideLoading();
						console.log("result: " + JSON.stringify(result));
			            res(result);
			        },
			        fail: (e) => {
						uni.hideLoading();
			            res(e);
			        }
			    })
			})
		}
	}
};
</script>
<style>
@import url('./payment.css');
</style>
