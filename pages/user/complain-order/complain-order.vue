<template>
	<view>
		<!-- 数据列表 -->
		<uni-card v-for="(item, index) in list" :key="index" :title="item.name" :extra="item.surname" :note="item.dateTime">
			<view class="order-content">
				22222222都是的22222都是22222都是22222都是22222都是22222都是 22222都是22222都是22222都是22222都是 22222都是22222都是22222都是22222都是 22222都是22222都是22222都是
				22222都是22222都是22222都是 22222都是22222都是22222都是 22222都是22222都是22222都是 22222都是22222都是22222都是22222都是 22222都是22222都是22222都是
				22222都是22222都是22222都是111111111111111
			</view>
		</uni-card>
		<view class="uni-empty">{{ loadingText }}</view>
	</view>
</template>

<script>
import uniCard from '@/components/uni-card/uni-card.vue';
export default {
	components: {
		uniCard
	},
	data() {
		return {
			loadingText: '更多数据',
			start_slide_x: 0,
			btnWidth: 0,
			startX: 0,
			LastX: 0,
			startTime: 0,
			list: [
				{
					id: 1,
					surname: '张',
					name: '张三',
					dateTime: '2019-03-18',
					remarks: 'XXXXXXXXXXXXXXXXXXX公司',
					urlImg: '/static/img/17231512438674646.jpg',

					isShare: true,
					slide_x: 0,
					status: 1
				},
				{
					id: 2,
					surname: '?',
					name: '李二',
					dateTime: '2019-03-17',
					urlImg: '/static/img/17231512438674646.jpg',

					remarks: 'XXXXXXXXXXXXXXXXXXX公司',
					isShare: false,
					slide_x: 0,
					status: 0
				}
			],
			btuBottom: '0',
			secondHeight: '',
			limit: 15,
			page: 1
		};
	},
	onShow() {
		// 计算主体部分高度,单位为px
		// this.secondHeight = res.windowHeight;
	},
	onReachBottom: function() {
		console.log('我触底了要加载数据了: ' + JSON.stringify('我触底了要加载数据了'));
	},
	methods: {
		getDetail(item) {
			console.log('查看详情');
		},
		// 删除
		removeM(index, id) {
			let self = this;
			console.log('点击删除');
			uni.showModal({
				title: '',
				content: '确定要删除该信息吗？',
				confirmText: '删除',
				confirmColor: '#ff3b32',
				success: function(res) {
					if (res.confirm) {
						console.log('用户点击确定');
						self.list.splice(index, 1);
						uni.showToast({
							icon: 'success',
							title: '操作成功!',
							duration: 2000
						});
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
.order-content {
	height: 180upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	word-break: break-all;
	text-overflow: ellipsis;
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 4; /** 显示的行数 **/
	overflow: hidden;
}
</style>
