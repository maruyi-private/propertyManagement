<template>
	<view>
		<view class="order-head uni-flex-center">
			<view class="">
				<view class="uni-font-58 uni-text-center">¥{{ orderData.money }}</view>
				<button class="colorOrange bg-gradient-btn" v-if="orderType === 1" @click="payment">去支付</button>
			</view>
		</view>
		<view class="order-content uni-flex-center uni-font-32">
			<view class="uni-cell-80" >
				<view class="uni-cell-lineheight-60 uni-flex-btw">
					<view class="color-font-gray uni-cell-30">订单号</view>
					<view class="uni-cell-70">{{ orderData.sn }}</view>
				</view>

				<view class="uni-cell-lineheight-60 uni-flex-btw">
					<view class="color-font-gray uni-cell-30">缴费类型</view>
					<view class="uni-cell-70">{{ orderData.table_type }}</view>
				</view>
				<view class="uni-cell-lineheight-60 uni-flex-btw">
					<view class="color-font-gray uni-cell-30">缴费时间</view>
					<view class="uni-cell-70">{{ orderData.stime }} - {{ orderData.etime }}</view>
				</view>

				<view class="uni-cell-lineheight-60 uni-flex-btw">
					<view class="color-font-gray uni-cell-30">创建时间</view>
					<view class="uni-cell-70">{{ timestampToTime(orderData.createtime) }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			orderData: {},
			orderType: 1 //1已缴费2未缴费
		};
	},
	methods: {
		timestampToTime(timestamp) {
			var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
			var Y = date.getFullYear() + '-';
			var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
			var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
			var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
			var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
			var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
			return Y + M + D + h + m + s;
		},
		payment() {
			this.$store.commit('setOrderData', this.orderData);
			this.$Router.push({ name: 'payment' });
		}
	},
	
	onLoad(option) {
		this.orderData = this.$Route.query.data[0];
		this.orderType = this.$Route.query.type;
	}
};
</script>

<style>
page {
	background: #ffffff;
}
.order-head {
	height: 400upx;
	width: 100%;
}
.colorOrange {
	color: #ffffff;
	height: 80upx;
	border-radius: 50upx;
	line-height: 80upx;
	margin: 40upx;
	padding: 0upx 60upx;
}
</style>
