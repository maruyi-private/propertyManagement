<template>
	<view>
		<view style="margin: 10upx;">
			<view class="header uni-ellipsis" >{{strings.name}}</view>
			<rich-text :nodes="strings.content"></rich-text>
			<view class="uni-text-right uni-ellipsis" >{{strings.c_time}}</view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				strings: '',
				id:''
			}
		},
		methods:{
			getCircularInfo(){
				let data ={
					id : this.id
				}
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
