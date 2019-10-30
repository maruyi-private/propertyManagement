<template>
	<view>
		<view class="uni-list">
			<view v-if="record" class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in record"  :key="index" >
				<view class="uni-media-list" v-if="item.filepath" @click="showInvoice(item)">
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{item.money}}</view>
						<view class="uni-media-list-text-bottom uni-ellipsis uni-flex-btw">
							<text>{{item.sn}}</text>
						</view>
					</view>
					<view >
						{{timestampTime(item.createtime)}}
					</view>
				</view>
			</view>
			<view v-else class="uni-empty">
				{{moreData}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				limit: 15,
				page: 1,
				record:[],
				moreData:'暂无数据',
				totalCount:0
			};
		},
		onReachBottom() {
		   let totalPage =  Math.ceil(this.totalCount/this.limit)
			if(this.page < totalPage){
				this.page ++;
				this.getInvoice();
			}
		},
		methods:{
			getInvoice(){
				let data ={
					page: this.page,
					limit: this.limit
				}
			},
			timestampTime(time){
				return this.$uitls.timestampToTime(time);
			},
			showInvoice(item){
				if(!item.filepath){
					uni.showToast({
						icon:'none',
						title:'此订单暂无发票'
					})
					return
				}
			 let imgShowUrl = 	this.$store.state.invoiceBaseUrl + item.filepath;
			 uni.downloadFile({
			   url: imgShowUrl,
			   success: function (res) {
			     var filePath = res.tempFilePath;
			     uni.openDocument({
			       filePath: filePath,
			       success: function (res) {
			         console.log('打开文档成功');
			       }
			     });
			   }
			 });
			 
			}
		},
		onLoad() {
			this.getInvoice();
		}
	}
</script>

<style lang="scss">

</style>
