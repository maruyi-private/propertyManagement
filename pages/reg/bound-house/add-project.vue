<template>
	<view>
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in list" :key="index" @click="addHouse(item)">
				<view class="uni-media-list">
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{item.villagename}}</view>
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
				list:[]
			}
		},
		onLoad(option){
		    this.id = this.$Route.query.data;
			this.getHouse();
		},
		methods: {
			getHouse(){
				const data ={
					type:1,
					id:this.id,
					login_token:this.$store.state.login_token
				}
			},
			addHouse(item){
				this.$store.commit('setVillage',item);
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
