<template>
	<view class="est-pay">
		<view class="est-name uni-ellipsis">{{ carDatas.plates }} </view>
		<view class="uni-flex-center">
			<view class="uni-cell-90 est-content uni-flex-center">
				<view v-if="payMoney" >
					<view class="uni-font-64 color-font-orange uni-text-center" v-cloak>¥{{moneyNum}}</view>
					<view class="color-font-gray uni-text-center">待缴金额</view>
					<button  class="colorOrange bg-gradient-btn" @click="toPay">立即缴费</button>
				</view>
				<view v-else>
					<view class="uni-flex-center"><image src="/static/img/est/clearMoney.png" mode="aspectFit" class="est-img"></image></view>
					<view class="clear-bill">账单已经缴清了 ~</view>
					<button class="colorOrange bg-gradient-btn" @click="getNav('main/car/car-pre-pay')">立即预缴</button>
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
					<view class="uni-cell-50 uni-flex-btw "  @click="invoice">
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
				<view class="uni-flex-btw est-content-header">
					<view class="uni-cell-40 uni-font-32 uni-font-bold" >{{nowMonth}}</view>
					<view class="uni-cell-20">
						<view class="uni-font-32 uni-font-bold" v-if="carMaterial.summoney">{{carMaterial.summoney}}</view>
						<view class="uni-font-32 uni-font-bold" v-else>0</view>
						<view class="color89">总金额</view>
					</view>
					<view class="uni-cell-30">
						<view class="uni-font-32 uni-font-bold">{{carMaterial.summoney}}</view>
						<view class="color89" @click="pay('car-to-pay')">待缴费</view>
					</view>
				</view>
				<view class="user-list">
					<view class="user-list-cell" v-for="(item, index) in carOrderDetail" :key="index" @click="billTypeDetail(item.car_wg)">
						<view class="uni-cell-80" style="display: flex;">
							<view class="uni-cell-lineheight-80">
								<template v-if="item.car_wg.table_type">{{item.car_wg.table_type}}</template>
							</view>
						</view>
						<view class="uni-cell-10 ">
						  <text></text> <text class="user-list-cell-right"> ›</text>
						</view>
					</view>
					<view class="user-list-cell" v-for="(item, index) in carOrderDetail" v-if="item.car_water.table_type" :key="index" @click="billTypeDetail(item.car_water)">
						<view class="uni-cell-80" style="display: flex;">
							<view class="uni-cell-lineheight-80">
								<template v-if="item.car_water.table_type">{{item.car_water.table_type}}</template>
							</view>
						</view>
						<view class="uni-cell-10 ">
						  <text></text> <text class="user-list-cell-right"> ›</text>
						</view>
					</view>
					<view class="user-list-cell" v-for="(item, index) in carOrderDetail" v-if="item.car_ele.table_type" :key="index" @click="billTypeDetail(item.car_ele)">
						<view class="uni-cell-80" style="display: flex;">
							<view class="uni-cell-lineheight-80">
								<template v-if="item.car_ele.table_type">{{item.car_ele.table_type}}</template>
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
			dealPrice:0.00,
			carMaterial:'',
			moneyNum:'',
			carOrderDetail:'',//本月账单
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
		carDatas(){
			return this.$store.state.changeCar;
		}
	},
	methods: {
		invoice(){
			this.$Router.push({name:'electronic_invoice'})
		},
		pay(url){
			if(!this.carMaterial.summoney){
				uni.showToast({
					icon:'none',
					title:'待缴金额为0'
				})
				return;
			}
			this.$Router.push({name:url})
		},
		toMoreBill(){
			this.$Router.push({name:'more-bill',params:{type:1}})
		},
		getNav(url){
			if(url==='main/car/car-pre-pay'){
				uni.navigateTo({
					url: '/pages/'+url+'?data='+JSON.stringify(this.carMaterial)
				});
				return;
			}
			uni.navigateTo({
				url: '/pages/'+url
			});
		},
		billTypeDetail(item){
			this.$Router.push({name:'bill-type-detail',params:{data:item}})
		},
		toPay(){
			this.$Router.push({name:'car-to-pay'})
		},
		getCarMaterials(){
			let data ={
				carid:this.carDatas.id
			}
		},
		getNowMonthOrder(){
		}
		
	},
	onShow() {
		this.getCarMaterials();
		this.getNowMonthOrder();
	}
};
</script>

<style scoped>
@import url("./car-pay.css");
</style>
