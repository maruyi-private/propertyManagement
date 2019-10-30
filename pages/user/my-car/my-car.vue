<template>
	<view>
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in datas.cars" :key="index">
				<view class="uni-media-list">
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{item.non_owner_name}}</view>
						<view class="uni-media-list-text-bottom">{{item.ctime}}</view>
					</view>
					<view class="color-font-blue">
						{{item.plates}}
					</view>
				</view>
			</view>
		</view>
		<view class="uni-empty" v-if="lists.length == 0">
			暂无车辆数据
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				datas:''
			}
		},
		methods: {
			getData(){
			},
		},
		onLoad() {
			this.getData()
		}
	}
</script>

<style>
.uni-media-list-body{
	/* height: 45upx; */
}
</style>
