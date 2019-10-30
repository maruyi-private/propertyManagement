<template>
	<view>
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in list" :key="index" @click="addCity(item)">
				<view class="uni-media-list">
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{item.villageaddr}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				id:''
			}
		},
		onLoad(){
			this.getCity();
		},
		methods: {
			getCity(){
				const data ={
					type:5,
					id:'',
					login_token:this.$store.state.login_token
				}
			},
			addCity(item){
				this.$store.commit('setCity',item);
				uni.navigateBack({
					delta:1
				})
			}
		}
		
	}
</script>

<style>
.uni-media-list-body{
	height: 45upx;
}
</style>
