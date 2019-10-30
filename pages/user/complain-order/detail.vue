<template>
	<view>
		<view class="uni-common-content">
			<!-- 接单流程 -->
			<view class="uni-timeline">
				<view
					class="uni-timeline-item "
					v-for="(item, index) in list"
					:class="{ ' uni-timeline-first-item': index == 0, 'uni-timeline-last-item': index == list.length - 1 }"
					:style="{ color: index == list.length - 1 ? '#000000' : '#898989' }"
				>
					<view class="uni-timeline-item-divider"></view>
					<view class="uni-timeline-item-content uni-flex-btw">
						<view class="uni-cell-80">
							<view>已完成</view>
							<view>uni-app 立项，使用vue技术，开发一次</view>
							<view class="datetime">2018.05</view>
						</view>
						<view class="uni-cell-20 uni-flex-center"><image src="/static/img/keeper.png" mode="aspectFit" class="uni-media-list-logo"></image></view>
					</view>
				</view>
			</view>
			<!-- 报事详情 -->
			<view class="detail-person">
				<view>
					<view>
						<text>【居家维修】</text>
						<text>
							uni-app 立项，使用vue技术，开发一次uni-app 立项， 使用vue技术，开发一次uni-app 立项，使用vue技术， 开发一次uni-app 立项，使用vue技术， 开发一次uni-app
							立项，使用vue技术，开发一次
						</text>
					</view>
					<image  class="uni-common-showImg" v-for="(item,index) in imgs" :key="index" @click="showImgs(item.urlImg)" :src="item.urlImg" mode="aspectFit"></image>
				</view>
				<view class="color-font-gray">创建于 2019-11-10 9:00</view>
			</view>
			<!-- 报事人详情 -->
			<view class="detail-person">
				<view class="uni-flex-btw">
					<text class="color-font-gray">地址</text>
					<text>成都姜慧明都好好的</text>
				</view>
				<view class="uni-flex-btw">
					<text class="color-font-gray">预约时间</text>
					<text>2019-11-40 18:22</text>
				</view>
				<view class="uni-flex-btw">
					<text class="color-font-gray">报事人</text>
					<text>李利</text>
				</view>
				<view class="uni-flex-btw">
					<text class="color-font-gray">联系电话</text>
					<text>13551161325</text>
				</view>
			</view>
		</view>
		<view class="uni-common-foot-btn">
			<button type="primary" class="bg-gradient-btn">去评价</button>
		</view>
		<!-- 管家说明 -->
		<view class="uni-common-mark uni-flex-center" v-show="mark" @touchmove.stop.prevent="moveHandle">
			<view class="uni-cell-100">
				<view class="uni-flex-center">
					<view class="uni-common-mark-content uni-flex-center">
						<image :src="showImg" mode="aspectFit" ></image>
					</view>
				</view>
				<view class="uni-flex-center" @click="closeMark"><view class="uni-common-mark-close">X</view></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			key: '',
			list: [1, 3, 4],
			mark:false,
			showImg:'',
			imgs:[
				{
					urlImg:'/static/img/17231512438674646.jpg'
				},
				{
					urlImg:'/static/img/23231508750601881.jpg'
				},
				{
					urlImg:'/static/img/23231508750601881.jpg'
				}
			]
		};
	},
	methods:{
		moveHandle(){},
		closeMark() {
			this.mark = !this.mark;
		},
		//图片预览
		showImgs(urlImg){
			this.mark = !this.mark;
			this.showImg = urlImg;
		}
	}
};
</script>

<style scoped lang="less">
page {
	background: #ffffff;
}
.uni-timeline {
	padding: 22upx 30upx;
	background: #ffffff;
}
.uni-media-list-logo {
	border-radius: 50%;
}
.detail-person {
	margin: 35upx 0;
	background: #ffffff;
	padding: 30upx;
}
</style>
