<template>
	<view>
		
		<view class="uni-list">
			<view class="uni-list-cell" >
				<view class="uni-media-list">
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">物业地址：宜秀区大龙山镇集贤北路1318号</view>
					</view>
				</view>
			</view>
			<view class="uni-list-cell" >
				<view class="uni-media-list">
					<view class="uni-media-list-body" @click="numbers">
						<view class="uni-media-list-text-top">二十四小时服务电话 ：
						 <text style="color: #007AFF;"> 0556-5300117</text>
						</view>
					</view>
				</view>
			</view>
			<map class="map" :longitude="longitude" :scale="scale" :latitude="latitude" :markers="markers"></map>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				number:'0556-5300117',
				longitude: 116.993399,
				latitude: 30.609361,
				scale: 14,
				markers: [
					{
						longitude: 116.993399,
						latitude: 30.609361,
						iconPath: "/static/adressLogo.jpg",
						width: 30,
						height: 30
					}
				]
			}
		},
		methods: {
			numbers(){
				uni.makePhoneCall({
				    phoneNumber: this.number
				});
			}
		}
	}
</script>

<style>
.uni-media-list-body{
	height: 45upx;
}
.map {
	width: 750rpx;
	height: 750rpx;
}
</style>
