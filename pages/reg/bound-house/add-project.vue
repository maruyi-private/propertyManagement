<template>
	<view>
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in list" :key="index" @click="addHouse(item)">
				<view class="uni-media-list">
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{item.projectname}}</view>
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
				// const data ={
				// 	type:1,
				// 	id:this.id,
				// 	login_token:this.$store.state.login_token
				// }
				this.list = this.$store.state.project;
				if(this.list.length === 0) {
					console.log(this.id);
					uniCloud.callFunction({
						name: 'getProjects',
						data: { villageid: this.id}
					}).then((res) => {
						console.log(res);
						const projects = res.result.data;
						this.$store.commit('setProject', projects);
						this.list = projects;
					})
				}
			},
			addHouse(item){
				this.$store.commit('setVillage',item);
				this.$store.commit('setTower', {});
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
