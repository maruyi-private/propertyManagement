<template>
	<view>
		<!-- 数据列表 -->
		<view class="list-box">
			<uni-swipe-action :options="options2" v-for="(item, index) in wfkList" :key="index" @click.stop="bindClick(item)">
				<view class="container_of_slide">
					<button class="slide_list" @tap="getDetail(item)" :disabled="isDisable">
						<view class="now-message-info" hover-class="uni-list-cell-hover" :style="{ width: Screen_width + 'px' }">
							<view class="icon-circle" style="background: #ED7A30;">未缴</view>
							<view class="list-right">
								<view class="list-title" v-if="item.ordernum">{{ item.ordernum }}</view>
								<view class="list-detail">{{ timestampToTimes(item.ctime) }}</view>
							</view>
							<view class="list-right-1">{{ item.money }}</view>
						</view>
						<view style="clear:both"></view>
					</button>
				</view>
			</uni-swipe-action>
		</view>
		<view class="list-box">
			<view class="container_of_slide" v-for="(item, index) in recordList" :key="index">
				<view class="slide_list">
					<view class="now-message-info" :style="{ width: Screen_width + 'px' }">
						<view class="icon-circle">已缴</view>
						<view class="list-right">
							<view class="list-title" v-if="item.sn">{{ item.sn }}</view>
							<view class="list-detail">{{ timestampToTimes(item.createtime) }}</view>
						</view>
						<view class="list-right-1">{{ item.money }}</view>
					</view>
					<view style="clear:both"></view>
				</view>
			</view>
		</view>
		<view class="uni-empty" v-if="recordList.length==0 && wfkList.length==0">{{ loadingText }}</view>
	</view>
</template>

<script>
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue';
export default {
	components: {
		uniSwipeAction
	},
	computed: {
		Screen_width() {
			return uni.getSystemInfoSync().windowWidth;
		}
	},
	data() {
		return {
			loadingText: '暂无数据',
			isDisable: false,
			limit: 15,
			page: 1,
			wfkList: [], //未付款订单
			recordList: [], //已付款订单
			options2: [
				{
					text: '取消订单',
					style: {
						backgroundColor: '#ED7A30'
					}
				}
			],
			totalCount: 0
		};
	},
	onShow() {
		const res = uni.getSystemInfoSync();
		// 计算主体部分高度,单位为px
		this.recordList = []
		this.getList();
	},
	onReachBottom() {
		let totalPage = Math.ceil(this.totalCount / this.limit);
		if (this.page < totalPage) {
			this.page++;
			this.getList();
		}
	},
	methods: {
		timestampToTimes(ctime) {
			return this.$uitls.timestampToTime(ctime);
		},
		bindClick(item) {
			this.del(item);
		},
		getList() {
			let data = {
				page: this.page,
				limit: this.limit
			};
		},
		getDetail(item) {
			this.isDisable = true;
			setTimeout(() => {
				this.isDisable = false; //点击一次时隔两秒后才能再次点击
			}, 2000);
			const data = {
				sn: item.ordernum,
				type: 2
			};
		},
		//取消订单
		del(item) {
			let _this = this;
			uni.showModal({
				title: '',
				content: '确定要取消该订单吗？',
				confirmText: '取消订单',
				cancelText: '不取消',
				confirmColor: '#ff3b32',
				success(res) {
					if (res.confirm) {
						let data = {
							order_num: item.ordernum
						};
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		// 删除
		remove(item) {
			let _this = this;
			uni.showModal({
				title: '',
				content: '确定要删除该订单吗？',
				confirmText: '删除',
				confirmColor: '#ff3b32',
				success: function(res) {
					if (res.confirm) {
						let data = {
							order_num: item.sn
						};
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		}
	}
};
</script>

<style scoped>
@import url('./order.css');
</style>
