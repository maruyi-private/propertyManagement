<template>
	<view class="est-pay">
		<view class="est-name uni-ellipsis">{{ myRoom.room.roomnum }}</view>
		<view class="uni-flex-center">
			<view  class="uni-cell-90 est-content uni-flex-center">
				<view v-if="roomsMaterial.summoney">
					<view class="uni-font-64 color-font-orange uni-text-center">¥{{roomsMaterial.summoney}}</view>
					<view class="color-font-gray uni-text-center">待缴金额</view>
					<button  class="colorOrange bg-gradient-btn" @click="toPay">立即缴费</button>
				</view>
				<view v-else>
					<view class="uni-flex-center"><image src="/static/img/est/clearMoney.png" mode="aspectFit" class="est-img"></image></view>
					<view class="clear-bill">账单已经缴清了 ~</view>
					<button class="colorOrange bg-gradient-btn" @click="getNav('main/est-pay/pre-pay')">立即预缴</button>
				</view>
			</view>
		</view>
		
		<view class="uni-flex-center">
			<view class="uni-cell-90 est-content">
				<view class="uni-flex-btw" style="margin: 20upx;">
					<view class="uni-cell-50 uni-flex-btw" @click="getNav('main/est-pay/charge-money')">
						<text class="est-balance-text">充值</text>
						<image src="/static/img/est/balance.png" mode="aspectFit" class="est-balance"></image>
					</view>
					<view class="uni-cell-50 uni-flex-btw " @click="invoice">
						<text class="est-balance-text">电子发票</text>
						<image src="/static/img/est/invoice.png" mode="aspectFit" class="est-balance"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="uni-flex-center">
			<view class="uni-cell-90 uni-flex-btw" style="margin: 20upx;">
				<view class="est-title uni-font-28 uni-font-bold">本月账单</view>
				<view class="more-bill uni-font-28 uni-font-bold" @click="toMoreBill">更多账单 ></view>
			</view>
		</view>

		<view class="uni-flex-center">
			<view class="uni-cell-90 est-content">
				<view class="uni-flex-btw est-content-header" v-if="roomsMaterial">
					<view class="uni-cell-40 uni-font-32 uni-font-bold">{{nowMonth}}</view>
					<view class="uni-cell-20">
						<view class="uni-font-32 uni-font-bold">{{roomsMaterial.summoney}}</view>
						<view class="color89">总金额</view>
					</view>
					<view class="uni-cell-30">
						<view class="uni-font-32 uni-font-bold">
							{{roomsMaterial.summoney}}
						</view>
						<view class="color89" @click="pay('to-pay')">待缴费</view>
					</view>
				</view>
				<view class="user-list">
					<view class="user-list-cell" v-for="(item, index) in roomOrderDetail" :key="index" @click="billTypeDetail(item.room_wg[0])">
						<view class="uni-cell-80" style="display: flex;">
							<view class="uni-cell-lineheight-80">
								<template v-if="item.room_wg[0].table_type">{{item.room_wg[0].table_type}}</template>
							</view>
						</view>
						<view class="uni-cell-10 ">
						  <text></text> <text class="user-list-cell-right"> ›</text>
						</view>
					</view>
					<view class="user-list-cell" v-for="(item, index) in roomOrderDetail" v-if="item.room_water[0].table_type" :key="index" @click="billTypeDetail(item.room_water[0])">
						<view class="uni-cell-80" style="display: flex;">
							<view class="uni-cell-lineheight-80">
								<template v-if="item.room_water[0].table_type">{{item.room_water[0].table_type}}</template>
							</view>
						</view>
						<view class="uni-cell-10 ">
						  <text></text> <text class="user-list-cell-right"> ›</text>
						</view>
					</view>
					<view class="user-list-cell" v-for="(item, index) in roomOrderDetail" v-if="item.room_ele[0].table_type" :key="index" @click="billTypeDetail(item.room_ele[0])">
						<view class="uni-cell-80" style="display: flex;">
							<view class="uni-cell-lineheight-80">
								<template v-if="item.room_ele[0].table_type">{{item.room_ele[0].table_type}}</template>
							</view>
						</view>
						<view class="uni-cell-10 ">
						  <text></text> <text class="user-list-cell-right"> ›</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="uni-flex-center">
			<view class="uni-cell-90 uni-flex-btw">
				<view class="est-title uni-font-28 uni-font-bold">*点击费用项可查看费用更多详情</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			payMoney: true,//是否有缴费
			dealPrice:'0.00',
			roomsMaterial:'',
			roomOrderDetail:''
		};
	},
	computed:{
		myRoom(){
		  return this.$store.state.myRoom;
		},
		nowMonth(){
			var date = new Date(); 
			var Y = date.getFullYear();
			var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
			return Y +''+ M;
		},
	},
	methods: {
		invoice(){
			this.$Router.push({name:'electronic_invoice'})
		},
		toMoreBill(){
			this.$Router.push({name:'more-bill',params:{type:2}})
		},
		pay(url){
			if(!this.dealPrice){
				uni.showToast({
					icon:'none',
					title:'待缴金额为0.00'
				})
				return;
			}
			this.$Router.push({name:url})
		},
		getNav(url){
			if(url==='main/est-pay/pre-pay'){
				uni.navigateTo({
					url: '/pages/'+url+'?data='+JSON.stringify(this.roomsMaterial)
				});
				return;
			}
			uni.navigateTo({
				url: '/pages/'+url
			});
		},
		billTypeDetail(item){
			let datas ={
				status:item.status,
				sn:item.sn,
				allmoney:item.allmoney,
				table_type:item.table_type,
				ymonth:item.ymonth
			}
			this.$Router.push({name:'bill-type-detail',params:{data:datas}})
		},
		toPay(){
			uni.navigateTo({
				url: '/pages/main/est-pay/to-pay'
			});
		},
		getRoomsMaterials(){
			let data ={
				roomid:this.myRoom.roomid
			}
		},
		getNowMonthOrder(){
		}
		
	},
	onLoad() {
		// this.getRoomsMaterials();
		// this.getNowMonthOrder()
	}
};
</script>

<style>
.est-name {
	height: 80upx;
	text-align: center;
	line-height: 40upx;
	width: 100%;
	background: #ffffff;
}
.colorOrange{
	color: #FFFFFF;
	height: 80upx;
	border-radius: 50upx;
	line-height: 80upx;
	margin: 40upx;
	padding: 0upx 60upx;
}
.clear-bill {
	/* line-height: 80upx; */
	color: #898989;
	text-align: center;
}
.est-img {
	height: 200upx;
	width: 200upx;
}
.est-balance {
	height: 160upx;
	width: 160upx;
}
.user-list{
	margin-top: 100upx;
	margin: 20upx;
}
.user-list-cell{
	display: flex;
	justify-content: space-between;
	height: 100upx;
	margin: 20upx;
}
.user-list-cell-right{
	line-height:80upx;
	text-align: right;
	padding-left: 20upx;
	color: #898989;
}
.more-bill {
	color: #ff913b;
}
.est-balance-text {
	line-height: 160upx;
	padding-left: 20upx;
	color: #898989;
}
.est-pay {
	background: #f7f6fb;
}
.est-content {
	background: #ffffff;
	margin: 20upx;
}
.est-title {
	padding: 10upx;
	color: #898989;
}
.est-content-header {
	text-align: center;
	line-height: 60upx;
}

.pay-cost {
	background: #ffead7;
	border: 1upx solid #ff913b;
	color: #ff913b;
	border-radius: 10upx;
	padding: 5upx 20upx 5upx;
}
</style>
