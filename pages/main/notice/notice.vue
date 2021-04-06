<template>
	<view>
		<view class="notice-card" v-for="(item,index) in list" :key="index" @click="detail(item)">
			<view>
				<view class="header uni-ellipsis">{{item.name}}  </view>
				<view class="content">
					{{item.content}}
				</view>
				<view class="foot">{{item.ctime | formatDate(item.ctime)}}</view>
			</view>
		</view>
		<view class="uni-empty" v-if="list.length === 0">
			暂无通知公告数据
		</view>
		<view class="isOver" v-if="flag">--------我是有底线的--------</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			list:[],
			page: 1,
			limit: 10,
			flag: false
		};
	},
	filters: {
		formatDate(date) {
			const nDate = new Date(parseInt(date));
			const year = nDate.getFullYear();
			const month = nDate.getMonth().toString().padStart(2, 0);
			const day = nDate.getDay().toString().padStart(2, 0);
			return year + "-" + month + "-" + day;
		}
	},
	onReachBottom: function() {
		if(this.list.length < (this.page - 1) * this.limit) {
			this.flag = true;
			return;
		}
		this.getList();
		// console.log('我触底了要加载数据了: ' + JSON.stringify('我触底了要加载数据了'));
	},
	methods: {
		detail(item){
			this.$Router.push({name:'notice-detail',params:{id:item._id}})
		},
		getList(){
			console.log('here');
			uniCloud.callFunction({
				name: 'getNotices',
				data: {
					page: this.page++,
					limit: this.limit
				},
				success: (res) => {
					console.log('res', res);
					this.list = [ ...this.list, ...res.result.data ];
				},
				fail() {
					console.log('error');
				}
			});
		}
	},
	onLoad() {
		this.getList();
	}
};
</script>

<style>
.notice-card {
	background: #ffffff;
	border-radius: 10upx;
	margin: 20upx;
}
.notice-card .header {
	width: 90%;
	line-height: 60upx;
	padding-left: 10upx;
	border-left: 8upx solid #007aff;
}
.notice-card .content {
	padding: 10upx;
	font-size: 20upx;
	color: #898989;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 6;
	-webkit-box-orient: vertical;
	height: 195upx;
	background: #FFFFFF;
}
.notice-card .foot{
	color: #898989;
	font-size: 20upx;
	text-align: right;
	line-height: 40upx;
	padding-right: 10upx;
}
.isOver {
	width: 100%;
	height: 50px;
	line-height: 50px;
	text-align: center;
	font-size: 28rpx;
}
</style>
