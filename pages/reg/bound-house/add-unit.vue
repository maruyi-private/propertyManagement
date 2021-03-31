<template>
	<view>
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in list" :key="index" @click="addUnit(item)">
				<view class="uni-media-list">
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{item.unit}}</view>
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
		onLoad(option){
			this.id = this.$Route.query.data;
			this.getUnit();
		},
		methods: {
			getUnit(){
				// const data ={
				// 	type:3,
				// 	id:this.id,
				// 	login_token:this.$store.state.login_token
				// }
				this.list = this.$store.state.units;
				console.log(this.id);
				if(this.list.length === 0) {
					uniCloud.callFunction({
						name: 'getUnits',
						data: { towerid: this.id }
					}).then((res) => {
						const projects = res.result.data;
						this.$store.commit('setUnits', projects);
						this.list = projects;
					})
				}
			},
			addUnit(item){
				this.$store.commit('setUnit',item);
				this.$store.commit('setRoom', {});
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
