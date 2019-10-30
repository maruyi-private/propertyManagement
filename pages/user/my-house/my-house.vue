<template>
	<view>
		<view class="uni-empty" v-if="!hasBoundHouse">请先添加房产</view>
		<view class="uni-list" v-else>
			<uni-swipe-action class="uni-list-cell" :options="options2" v-for="(item, index) in lists" @click.stop="bindClick(item)" :key="index">
				<view hover-class="uni-list-cell-hover" :key="index">
					<view class="uni-media-list" @click="changeRoom(item)">
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top">{{ item.villageaddr }}--{{ item.villagename }}</view>
							<view class="uni-media-list-text-bottom">{{ item.roomnum }}</view>
						</view>
						<view class="icon-right" v-show="item.roomid === myHouse.ownerInfo.roomid">✔</view>
					</view>
				</view>
			</uni-swipe-action>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="add-house"  @click="toBindHouse">
			添加房产
		</view>
		<!-- #endif -->
	
	</view>
</template>

<script>
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue';
export default {
	components: {
		uniSwipeAction
	},
	data() {
		return {
			options2: [
				{
					text: '解绑房产',
					style: {
						backgroundColor: '#ED7A30'
					}
				}
			]
		};
	},
	methods: {
		toBindHouse(){
			uni.navigateTo({
				url: '/pages/reg/bound-house/bound-house'
			});
		},
		getData() {
			let data = {};
		},
		bindClick(item) {
			let _this = this;
			console.log('e: ' + JSON.stringify(item));
			let data = {
				roomid: item.roomid
			};
			//解绑房产
		},
		changeRoom(item) {
			//如果当前房产和点击是同一个 不执行切换操作
			if (item.roomid === this.myHouse.ownerInfo.roomid) {
				uni.showToast({
					icon: 'none',
					title: '当前房产已被选中'
				});
				return;
			}
			let data = {
				roomid: item.roomid
			};
			//切换房产
		}
	},
	computed: {
		lists() {
			return this.$store.state.myHouse.allRooms;
		},
		myHouse() {
			return this.$store.state.myHouse;
		},
		hasBoundHouse() {
			return this.$store.state.hasBoundHouse;
		}
	},
	// #ifdef APP-PLUS
	onNavigationBarButtonTap(res) {
		uni.navigateTo({
			url: '/pages/reg/bound-house/bound-house'
		});
	}
	// #endif
	
};
</script>

<style>
.icon-right {
	line-height: 40upx;
	text-align: center;
	width: 40upx;
	height: 40upx;
	padding: 5upx;
	border: 1upx solid #ed7130;
	border-radius: 50%;
	font-weight: 700;
	color: #ed7130;
}
.add-house{
	position: fixed;
	bottom: 200upx;
	right: 100upx;
	height: 140upx;
	width: 140upx;
	text-align: center;
	line-height: 140upx;
	border-radius: 50%;
	color: #FFFFFF;
	background: #ED7A30;
}
</style>
