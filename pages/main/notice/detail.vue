<template>
	<view>
		<view style="margin: 10upx;">
			<view class="header uni-ellipsis" >{{strings.name}}</view>
			<rich-text :nodes="strings.content"></rich-text>
			<view class="uni-text-right uni-ellipsis" >{{ strings.ctime | formatDate(strings.ctime) }}</view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				strings: {},
				id:''
			}
		},
		filters: {
			formatDate(date) {
				const nDate = new Date(date);
				const year = nDate.getFullYear();
				const month = nDate.getMonth().toString().padStart(2, 0);
				const day = nDate.getDay().toString().padStart(2, 0);
				return year + "-" + month + "-" + day;
			}
		},
		methods:{
			getCircularInfo(){
				uniCloud.callFunction({
					name: 'getNoticeById',
					data: {
						id: this.id
					},
					success: (res) => {
						console.log('res', res);
						this.strings = res.result.data[0];
					},
					fail() {
						console.log('error');
					}
				})
			}
		},
		onLoad() {
			this.id = this.$Route.query.id;
			this.getCircularInfo();
		}
	}
</script>

<style>
	page{
		background: #FFFFFF;
	}
	.header{
		line-height: 80upx;
		text-align: center;
	}
</style>
