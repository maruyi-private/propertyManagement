<template>
	<view class="pay">
		<view class="uni-flex-center">
			<view class="uni-cell-90 est-content" v-if="preRoomData.label">
				<view class="title uni-font-36 uni-font-bold">物业预缴（{{ preRoomData.label }}）</view>
				<view class="uni-flex-btw est-content-header">
					<view class="uni-cell-40">开始月份</view>
					<view class="uni-cell-20">费用/月</view>
					<view class="uni-cell-20">选择缴费</view>
				</view>
				<view class="uni-flex-btw est-content-header">
					<view class="uni-cell-40">{{ preRoomData.yjmonth }}</view>
					<view class="uni-cell-20">{{ preRoomData.fee}}</view>
					<view class="uni-cell-20 yearMonth uni-flex-btw">
						<view class="minus colorOrange" @click="minus">-</view>
					
						<text style="padding-left: 20upx;padding-right: 20upx;">	{{ monthNum }}</text>
						<view class="minus colorOrange" @click="append">+</view>
					</view>
				</view>
			</view>
		</view>
		<view class="foot-pays uni-flex-btw">
			<view class="uni-cell-70 money">
				合计缴费金额：
				<text class="uni-font-bold">{{preMoney}}</text>
			</view>
			<view class="uni-cell-30 to-pay bg-gradient-btn" @click="payment">去支付</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			payCostData: '',
			yearMonth: '',
			monthNum: 1 ,//默认预缴费1个月
			preRoomData:''
		};
	},
	computed:{
		preMoney(){
			let money = ((this.monthNum - 1) * this.preRoomData.fee) + this.preRoomData.first
			return money.toFixed(2);
		}
	},
	methods: {
		payment() {
			let data ={
				type:1,//物业预缴
				keyid:this.preRoomData.keyid,
				num:this.monthNum
			}
		},
		append() {
			this.monthNum = this.monthNum + 1;
		},
		minus() {
			if (this.monthNum === 1) {
				return;
			}
			this.monthNum = this.monthNum - 1;
		},
		getAdvancePaymentPage(){
			let data ={
				type:1,
				keyid:this.payCostData.id
			}
		},
	},

	onLoad(option) {
		this.payCostData = JSON.parse(option.data);
		this.getAdvancePaymentPage();
	}
};
</script>

<style>
.pay {
}
.minus {
	border-radius: 5upx;
	color: #ffffff;
	height: 50upx;
	width: 50upx;
	line-height: 40upx;
	font-size: 50upx;
	text-align: center;
}
.minus:active{
	background: #555555;
}
.est-content {
	background: #ffffff;
	margin: 20upx;
}
.est-content .title {
	padding: 20upx;
}
.est-content-header {
	height: 80upx;
	text-align: center;
}
.pay-cost {
	background: #ffead7;
	border: 1upx solid #ff913b;
	color: #ff913b;
	border-radius: 10upx;
	padding: 5upx 20upx 5upx;
}
.yearMonth {
	color: #007aff;
}
.foot-pays {
	position: fixed;
	height: 120upx;
	width: 100%;
	background: #ffffff;
	bottom: 0upx;
	line-height: 120upx;
}
.foot-pays .money {
	line-height: 120upx;
	height: 120upx;
	padding-left: 40upx;
	font-size: 30upx;
}
.foot-pays .to-pay {
	color: #ffffff;
	border-radius: 50upx;
	width: 200upx;
	line-height: 80upx;
	height: 80upx;
	text-align: center;
	margin-top: 20upx;
	margin-right: 10upx;
}
</style>
