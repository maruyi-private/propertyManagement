<template>
	<view>
		<view class="housekeeper-content" v-if="housekeeper">
			<!-- 我的管家 -->
			<view class="uni-flex-center">
				<view class="housekeeper uni-cell-90 uni-flex-btw">
					<view class="uni-cell-20 uni-flex-center"><image :src="housekeeprImg" mode="aspectFit" class="housekeeper-header"></image></view>
					<view class="uni-cell-40 uni-flex-center" style="text-align: left">
						<view style="height: 100upx;">
							<view class="uni-font-36">
								{{housekeeper.steward.realname}}
								<text class="uni-font-20 uni-font-bold" style="color:#c7a274;padding-left: 20upx;">{{birthday(housekeeper.steward.birthday)}}0 后</text>
							</view>
							<view class="uni-font-28" style="color: #898989;">入职时间：{{inTimeWork(housekeeper.steward.intime)}} 年</view>
						</view>
					</view>
					<view class="uni-cell-10"></view>
					<view class="uni-cell-30 uni-flex-center"><view class="housekeeper-btn" @click="call()">呼叫管家</view></view>
				</view>
			</view>
			<!-- 菜单按钮 -->
			<view>
				<view class="uni-grid-9">
					<view class="uni-grid-9-item" v-for="(item, index) in list" :key="index">
						<template>
							<view class="uni-grid-9-item-text" @click="copyWexin(item)">
								<i v-if="item.type == 'weixin'" class="iconfont iconweixin"></i>
								<text v-else class="uni-font-40">{{ item.title }}</text>
							</view>
							<view class="uni-grid-9-item-text">{{ item.text }}</view>
						</template>
					</view>
				</view>
			</view>
			<!-- 服务区域 -->
			<view class="uni-flex-center">
				<view class="uni-cell-90 _box">
					<view class="_box-title">服务区域</view>
					<view class="uni-grid-9">
						<view class="uni-grid-9-item" v-for="(item, index) in housekeeper.block" :key="index">
							<template>
								<view class="uni-flex-center"><image src="/static/img/tower.png" class="image" mode="aspectFill" /></view>
								<view class="uni-grid-9-item-text ">{{ item.villagename }}{{item.block}}</view>
							</template>
						</view>
					</view>
				</view>
			</view>
			<!-- 兴趣爱好 -->
			<view class="uni-flex-center">
				<view class="uni-cell-90">
					<view class="interest-title">兴趣爱好</view>
					<view class="uni-ellipsis">"机会是留给有准备的人"</view>
					<view class="interest-title">用户评价</view>
				</view>
			</view>
			<!-- 用户评价 -->
			<view class="uni-flex-center">
				<view class="uni-cell-90"><user-review :list="userViews"></user-review></view>
			</view>
		</view>
		<!-- 给Ta评价 -->
		<!-- <view class="uni-flex-center housekeeper-foot"><button type="primary" class="btn-sub" @click="addReview">给Ta评价</button></view> -->
		<!-- 管家说明 -->
		<view class="mark uni-flex-center" v-show="mark" @touchmove.stop.prevent="moveHandle">
			<view class="uni-cell-100">
				<view class="uni-flex-center">
					<view class="mark-content uni-flex-center">
						<view class="uni-cell-80">
							<h3>管家说明</h3>
							<h3>有事找管家</h3>
							<h4 class="color89">需求办理、业务办理、生活百科...</h4>
							<h3>没事找管家</h3>
							<h4 class="color89">巡查设备、环境管理、移动在线...</h4>
							<h3>管家爱娱乐</h3>
							<h4 class="color89">小区活动、节日晚会、兴趣社团...</h4>
							<h3>管家懂生活</h3>
							<h4 class="color89">优选服务、专享金融、生活百货...</h4>
						</view>
					</view>
				</view>
				<view class="uni-flex-center" @click="closeMark"><view class="mark-close">X</view></view>
			</view>
		</view>
	</view>
</template>

<script>
	// 用户评价组件
import userReview from '@/components/user-review/user-review.vue';
export default {
	components: {
		userReview
	},
	data() {
		return {
			mark: false,
			value: 1,
			housekeeprImg: '/static/img/header-img.png',
			list: [
				{
					title: '4.6',
					text: '综合评分'
				},
				{
					title: '96',
					text: '好评率'
				},
				{
					title: '4.6分',
					text: '微信沟通',
					type: 'weixin'
				}
			],
			userViews: [
				{
					housekeeprImg: '/static/img/keeper.png',
					name: '李洁',
					dates: '2019/9/19',
					content: '服务人员很好，也很贴心',
					star: 4
				},
				{
					housekeeprImg: '/static/img/keeper.png',
					name: '张东',
					dates: '2019/9/11',
					content: '态度好',
					star: 5
				}
			],
			weixinNum: '13551161333',
			uid:'',
			housekeeper:''
		};
	},
	onLoad() {
		this.uid = this.$Route.query.id;
		this.getStewardInfo();
	},
	methods: {
		inTimeWork(intime){
			let time = intime.substring(0,4);
			let nowYear = new Date().getFullYear();
			const housekeeprYear = nowYear - parseInt(time);
			return housekeeprYear;
		},
		birthday(bir){
			let date = bir.substring(2,3);
			return date;
		},
		getStewardInfo(){
			let data ={
				id :this.uid
			}
		},
		moveHandle() {},
		onNavigationBarButtonTap() {
			this.mark = !this.mark;
		},
		closeMark() {
			this.mark = !this.mark;
		},
		call() {
			if(!this.housekeeper.steward.tel){
				uni.showToast({
					icon:'none',
					title:'暂无手机号'
				})
				return ;
			}
			uni.makePhoneCall({
				phoneNumber: this.housekeeper.steward.tel
			});
		},
		addReview() {
			this.$Router.push({ name: 'add-review' });
		},
		copyWexin(item) {
			if (item.type === 'weixin') {
				if(!this.housekeeper.steward.weixin){
					uni.showToast({
						icon:'none',
						title:'暂无微信号'
					})
					return ;
				}
				uni.setClipboardData({
					data: this.housekeeper.steward.weixin,
					success() {
						uni.showModal({
							title: '提示',
							content: '已经复制微信号，是否打开微信？',
							success(res) {
								if (res.confirm) {
									// #ifdef APP-PLUS
									 // 判定微信是否安装
									if (plus.runtime.isApplicationExist({ pname: 'com.tencent.mm', action: 'weixin://' })) {
										plus.runtime.launchApplication({ pname: 'com.tencent.mm', extra: { url: '' } }, function(e) {
											uni.showToast({
												icon:'none',
												title:'微信应用打开失败'
											})
										});
									} else {
										uni.showToast({
											icon:'none',
											title:'微信应用未安装'
										})
									}
									// #endif
								}
							}
						});
					}
				});
			}
		}
	}
};
</script>

<style>
@import './housekeeper.css';
</style>
