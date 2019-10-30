<template>
	<view>
		<view style="margin-top: 40upx;margin-bottom: 20upx;" v-for="(item, index) in list">
			<view style="display: flex;">
				<view class="uni-cell-15"><image :src="housekeeprImg" class="user-eval-header" mode="aspectFit"></image></view>
				<view class="uni-cell-20">
					<view class="uni-flex-center">
						<view>
							<view>{{ item.name }}</view>
							<view class="uni-font-20 color-font-gray">{{ item.dates }}</view>
						</view>
					</view>
				</view>
				<view class="uni-cell-40"></view>
				<view class="cleanfloat uni-cell-30">
					<i class="iconfont iconsolid-star-active" v-for="(item, index) in item.star"></i>
					<i class="iconfont iconsolid-star" v-for="(item, index) in 5 - item.star" ></i>
				</view>
			</view>
			<view class="uni-flex-center">
				<view class="uni-cell-80 uni-font-30 uni-font-bold" style="word-wrap:break-word">{{ item.content }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		list: {
			type: Array,
			default: null
		}
	},
	computed:{
		
	},
	watch: {
		
	},
	data() {
		return {
			housekeeprImg: '/static/img/keeper.png'
		};
	}
};
</script>

<style>


.cleanfloat {
	display: flex;
	margin-right: 20upx;
}
.user-eval-header {
	height: 80upx;
	width: 80upx;
	border-radius: 50%;
}
</style>
