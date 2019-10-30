<template>
	<view class="">
		<view class="uni-flex-center uni-margin-top-40">
			<view class="uni-cell-90 content-card" @click="estPay">
				<view class="uni-font-36 uni-flex-btw">
					<text>物业费用</text>
					<text class="color-font-orange">去缴费</text>
				</view>
				<view class="uni-flex-btw uni-margin-top-20">
					<view class="uni-cell-60">房号</view>
					<view class="uni-cell-40">面积(㎡)</view>
				</view>
				<view class="uni-flex-btw" >
					<view class="uni-cell-60">{{datas.room.roomnum}}</view>
					<view class="uni-cell-40">{{datas.room.buildareas}}</view>
				</view>
			</view>
		</view>
		<view class="uni-flex-center uni-margin-top-40">
			<view class="uni-cell-90 content-card" >
				<view class="uni-font-36 uni-flex-btw">
					<text>车辆费用</text>
					<text class="color-font-orange" v-if="datas.cars.length !== 0">去缴费</text>
				</view>
				<view v-if="datas.cars.length === 0">
					<view class="uni-empty">暂无车位数据</view>
				</view>
				<template v-else>
					<view class="uni-flex-btw uni-margin-top-20">
						<view class="uni-cell-60">车牌号</view>
						<view class="uni-cell-40">到期时间</view>
					</view>
					<view class="uni-flex-btw" v-for="(item,index) in datas.cars" :key="index" @click="carPay(item)" >
						<view class="uni-cell-60">{{item.plates}}</view>
						<view class="uni-cell-40">{{item.endtime}}</view>
					</view>
				</template>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				key: '',
				datas:{}
			}
		},
		onShow() {
			// this.getData();
		},
		methods:{
			getData(){
			},
			estPay(){
				uni.navigateTo({
					url:'/pages/main/est-pay/est-pay'
				})
			},
			carPay(item){
				
				this.$store.commit('setChangeCar',item)
				uni.navigateTo({
					url:'/pages/main/car/car-pay'
				})
			}
		}
	}
</script>

<style>
	.content-card{
		background: #FFFFFF;
		border-radius: 6upx;
		padding: 20upx;
	}
	.uni-font-36{
		border-bottom: 1upx solid #EDEDED;
		line-height: 80upx;
	}
	.uni-flex-btw{
		height: 80upx;
	}
</style>
