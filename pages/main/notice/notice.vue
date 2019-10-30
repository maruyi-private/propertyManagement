<template>
	<view>
		<view class="uni-flex-center" v-for="(item,index) in list" :key="index" @click="detail(item)">
			<view class="notice-card">
				<view class="header uni-ellipsis">{{item.name}}  </view>
				<view class="content">
					{{item.content}}
				</view>
				<view class="foot">{{item.ctime}}</view>
			</view>
		</view>
		<view class="uni-empty" v-if="list.length === 0">
			暂无通知公告数据
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			list:[],
			page:1,
			limit:10000,
		};
	},
	onReachBottom: function() {
		// console.log('我触底了要加载数据了: ' + JSON.stringify('我触底了要加载数据了'));
	},
	methods: {
		detail(item){
			this.$Router.push({name:'notice-detail',params:{id:item.id}})
		},
		getList(){
			let data ={
				page:this.page,
				limit:this.limit
			}
		}
	},
	onLoad() {
		// this.getList()
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
</style>
