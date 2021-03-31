<template>
	<view>
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in list" :key="index" @click="addRoom(item)">
				<view class="uni-media-list">
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{item.roomnum}}</view>
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
			this.getRoom();
		},
		methods: {
			getRoom(){
				// const data ={
				// 	type:4,
				// 	id:this.id,
				// 	login_token:this.$store.state.login_token
				// }
				this.list = this.$store.state.rooms;
				console.log(this.id);
				console.log(this.list);
				if(this.list.length === 0) {
					uniCloud.callFunction({
						name: 'getRooms',
						data: { unitid: this.id }
					}).then((res) => {
						const projects = res.result.data;
						console.log(projects);
						this.$store.commit('setRooms', projects);
						this.list = projects;
					})
				}
			},
			addRoom(item){
				this.$store.commit('setRoom',item);
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
