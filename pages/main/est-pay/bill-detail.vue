<template>
	<view >
		<view class="bill-detail-head uni-flex-center">
			<view class="">
				<view class="uni-font-40 color-font-orange">
					{{billDetail.title}}账单
				</view>
				<view class="color-font-orange uni-text-center">
					已缴清
				</view>
			</view>
		</view>
		<view class="uni-flex-center uni-margin-top-40">
			<view class="uni-cell-90 bill-detail-content">
				<view class="uni-flex-btw uni-cell-lineheight-80">
					<text>总金额</text>
					<text>247.00</text>
				</view>
				<view class="uni-flex-btw uni-cell-lineheight-80">
					<text>已支付</text>
					<text>247.00</text>
				</view>
				<view class="uni-margin-top-40 rule">
					<view class="user-list">
						<view class="user-list-cell" v-for="(item, index) in list" :key="index" @click="billTypeDetail(item)">
							<view class="uni-cell-70" style="display: flex;">
								<view class="uni-cell-lineheight-60">
									{{item.title}}
								</view>
							</view>
							<view class="uni-cell-30 uni-flex-btw">
								<text class="uni-cell-lineheight-60 uni-cell-80" style="text-align: right;">{{item.price}}</text>
							    <text class="user-list-cell-right uni-cell-20"> ›  </text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="uni-empty">
			*点击费用项可查看费用更多详情
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				price: '1',
				list:[{title:'物业管理费用',price:'22.00'},{title:'生活垃圾服务费',price:'212222.00'},{title:'水费',price:'2112.00'}],
				billDetail:''
			}
		},
		methods:{
			billTypeDetail(item){
				uni.navigateTo({
					url:'/pages/main/est-pay/bill-type-detail?data='+ JSON.stringify(item)
				})
			}
		},
		onLoad(option){
			this.billDetail = this.$Route.query.data;
		}
	}
</script>

<style>
	.bill-detail-head{
		height: 300upx;
		width: 100%;
		background: #FFFFFF;
	}
	.bill-detail-content{
		background: #FFFFFF;
		padding: 20upx;
		margin: 20upx;
		border-radius: 10upx;
	}
	.rule{
		border-top: 1upx dashed #DDDDDD;
	}
	.user-list{
		margin-top: 100upx;
		margin: 20upx;
	}
	.user-list-cell{
		display: flex;
		justify-content: space-between;
		margin: 20upx;
	}
	.user-list-cell-right{
		line-height:60upx;
		text-align: right;
		color: #898989;
		padding-left: 10upx;
	}
	.uni-empty{
		text-align: left;
		padding-left: 40upx;
		font-size: 22upx;
	}
</style>
