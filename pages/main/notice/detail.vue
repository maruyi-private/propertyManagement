<template>
	<view>
		<view style="margin: 10upx;">
			<view class="header uni-ellipsis" >{{strings.name}}</view>
			<rich-text :nodes="strings.content"></rich-text>
			<view class="uni-text-right uni-ellipsis" >{{ strings.ctime | format(strings.ctime) }}</view>
		</view>
	</view>
</template>

<script>
	import { formatDate } from '@/util/api.js';
	export default{
		data() {
			return {
				strings: {},
				id:''
			}
		},
		filters: {
			format(date) {
				return formatDate(date);
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
