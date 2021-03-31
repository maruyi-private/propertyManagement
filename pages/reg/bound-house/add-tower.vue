<template>
	<view>
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in list" :key="index" @click="addTower(item)">
				<view class="uni-media-list">
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{item.block}}</view>
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
			this.getTower();
		},
		methods: {
			getTower(){
				// const data ={
				// 	type:2,
				// 	id:this.id,
				// 	login_token:this.$store.state.login_token
				// }
				this.list = this.$store.state.towers;
				if(this.list.length === 0) {
					uniCloud.callFunction({
						name: 'getTowers',
						data: { projectid: this.id}
					}).then((res) => {
						const projects = res.result.data;
						this.$store.commit('setTowers', projects);
						this.list = projects;
					})
				}
			},
			addTower(item){
				this.$store.commit('setTower',item);
				this.$store.commit('setUnit', {});
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
