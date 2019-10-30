<template>
	<view>
		
		<view class="uni-list">
			<view class="uni-list-cell" >
				<view class="uni-media-list">
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">物业地址：一栋一单元一楼</view>
					</view>
				</view>
			</view>
			<view class="uni-list-cell" >
				<view class="uni-media-list">
					<view class="uni-media-list-body" @click="numbers">
						<view class="uni-media-list-text-top">二十四小时服务电话 ：
						 <text style="color: #007AFF;">028-38231519</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				number:'02838231519'
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
</style>
