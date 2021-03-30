<template>
	<view class="main">
		<view class="main-content">
			<view style="margin: 20upx;">
				<!-- 顶部 -->
				<view class="main-header">
					<view class="main-project  uni-ellipsis">
						<view class="uni-font-36" @click="getNav('my-house')">
							<text v-show="hasLogin === false">请登录</text>
							<text v-show="hasLogin === true && hasBoundHouse === false">请绑定房产</text>
							<text v-show="hasLogin === true && hasBoundHouse === true">{{ myHouse.ownerInfo.villagename }} ▶</text>
						</view>

						<view><text class="main-score">上月服务评分：5.0</text></view>
					</view>
					<view class="uni-cell-10 main-message" @click="getNav('message')">
						<image :src="message" mode="aspectFit" class="main-message-icon"></image>
						<!-- <image v-else src="/static/img/message-active.png" mode="aspectFit" class="main-message-icon"></image> -->
					</view>
				</view>
				<!-- 轮播图 -->
				<view class="main-banner">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item v-for="(item, index) in banners" :key="index"><image :src="item" mode="aspectFit" class="uni-cell-100"></image></swiper-item>
					</swiper>
				</view>
				<!-- 三个大按钮 -->
				<view class="main-btn">
					<view v-for="(item, index) in mainBtn" class="main-fct-btn uni-cell-30 " :class="item.colors" :key="index">
						<view class="uni-cell-70" @click="getNav(item.url)">
							<view class="uni-font-32 uni-font-bold">{{ item.text }}</view>
							<view class="uni-font-24 uni-ellipsis">{{ item.mark }}</view>
						</view>
					</view>
				</view>
				<!-- 菜单按钮 -->
				<view class="main-grad-8">
					<uni-grid :column="4" :highlight="true">
						<uni-grid-item v-for="(item, index) in list" :key="index">
							<view @click="getNav(item.url, item.id)">
								<image :src="item.src" class="image" mode="aspectFill" />
								<view class="text">{{ item.text }}</view>
							</view>
						</uni-grid-item>
					</uni-grid>
				</view>
				<!-- 通知公告 -->
				<view class="main-notice" @click="noticeDetail">
					<image src="/static/img/notice.png" mode="aspectFit"></image>
					<view class="empty-notice uni-ellipsis" v-if="noticeList">{{ noticeList.name }}</view>
					<view class="empty-notice uni-ellipsis" v-else>当前暂无最新通知公告</view>
				</view>
			</view>
		</view>
		<!-- 我的管家 -->
		<view class="uni-flex-center" v-if="housekeeper">
			<view class="housekeeper uni-cell-90 uni-flex-btw" @click="toHousekeeper">
				<view class="uni-cell-20 uni-flex-center"><image :src="housekeeprImg" mode="aspectFit" class="housekeeper-header"></image></view>
				<view class="uni-cell-30 uni-flex-center" style="text-align: left">
					<view style="height: 100upx;">
						<view class="uni-font-36" style="color: #b98a52;">{{ housekeeper.realname }}</view>
						<view class="uni-font-28" style="color: #b98a52;">您的专属管家</view>
					</view>
				</view>
				<view class="uni-cell-20"></view>
				<view class="uni-cell-30 uni-flex-center"><view class="housekeeper-btn">呼叫管家</view></view>
			</view>
		</view>
		<!-- 推荐服务 -->
		<view class="uni-flex-center">
			<view class="main-service uni-cell-90">
				<view class="title">服务推荐</view>
				<view class="user-list">
					<view class="user-list-cell" v-for="(item, index) in service" :key="index">
						<view class="uni-cell-80" style="display: flex;">
							<image class="uni-media-list-logo" :src="item.img"></image>
							<view>
								{{ item.title }}
								<view class="mark">{{ item.mark }}</view>
							</view>
						</view>
						<view class="uni-cell-20 user-list-cell-right"><text class="text">详情</text></view>
					</view>
				</view>
			</view>
		</view>
		<view class="uni-flex-center">
			<view class="main-topic uni-cell-90"><view class="title"></view></view>
		</view>
		<!-- 更新modal -->
		<view @touchmove.stop.prevent="moveHandle">
			<yomol-upgrade :type="upgradeType" :url="upgradeUrl" title="发现新版本" :content="upgradeContent" ref="yomolUpgrade"></yomol-upgrade>
		</view>
		<li-toast :showToast="showToast"></li-toast>
	</view>
</template>
<script>
import uniGrid from '@/components/uni-grid/uni-grid.vue';
import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue';
import yomolUpgrade from '@/components/yomol-upgrade/yomol-upgrade.vue';
import liToast from '@/components/li-toast/li-toast.vue';

export default {
	components: {
		uniGrid,
		uniGridItem,
		yomolUpgrade,
		liToast
	},
	data() {
		return {
			showToast: false,
			/*图片轮播*/
			indicatorDots: true,
			autoplay: true,
			interval: 5000,
			duration: 500,
			noticeList: '',
			mainBtn: [
				//三个便捷按钮
				{
					text: '我的钥匙',
					mark: '一键开门超方便',
					colors: 'colorOrange',
					url: 'my-key'
				},
				{
					text: '报事报修',
					mark: '足不出户享服务',
					colors: 'colorRed',
					url: 'maintenance'
				},
				{
					text: '我要缴费',
					mark: '线上缴费超便捷',
					colors: 'colorBlue',
					url: 'choose-type'
				}
			],
			banners: ['/static/img/main/b1.png', '/static/img/main/b2.png'],

			// banners: ['/static/img/17231512438674646.jpg', '/static/img/20671509093063387.jpg', '/static/img/22361508750251427.jpg', '/static/img/23231508750601881.jpg'],
			service: [
				{ img: '/static/img/main/78761498124328542.png', title: '电子礼品卡', mark: '家乐福9折' },
				{ img: '/static/img/main/78761498124328542.png', title: '手机维修', mark: '手机维修' },
				{ img: '/static/img/main/72581498124372327.png', title: '滴滴出行', mark: '滴滴出行3.0' }
			],
			list: [
				{
					url: 'notice',
					text: '通知公告',
					src: '/static/img/main/notice.jpg',
					id: 1
				},
				{
					url: 'maintenance',
					text: '报事报修',
					src: '/static/img/main/maintenance.jpg',
					id: 2
				},
				{
					url: 'maintenance',
					text: '投诉建议',
					src: '/static/img/main/feedback.jpg',
					id: 3
				},
				{
					url: 'call',
					text: '联系物业',
					src: '/static/img/main/call.jpg',
					id: 4
				},
				{
					url: 'choose-type',
					text: '物业缴费',
					src: '/static/img/main/property-pay.jpg',
					id: 5
				},
				{
					url: '',
					text: '房屋租售',
					src: '/static/img/main/rental.jpg',
					id: 6
				},
				{
					url: '',
					text: '球场预约',
					src: '/static/img/main/subscribe-stadium.jpg',
					id: 7
				},
				{
					url: 'community',
					text: '小区活动',
					src: '/static/img/main/activity.jpg',
					id: 8
				}
			],
			upgradeType: 'pkg', //pkg 整包 wgt 升级包
			upgradeContent: '', //更新内容
			upgradeUrl: '', //更新地址
			housekeeprImg: '/static/img/header-img.png',
			housekeeper: ''
		};
	},
	methods: {
		moveHandle() {},
		getNav(url, id) {
			if (!url) {
				uni.showToast({
					icon: 'none',
					title: '暂无数据...'
				});
				return;
			}
			let data = 0; //报事报修
			if (id === 3) {
				data = 1; //投诉建议
			}
			this.$Router.push({ name: url, params: { id: data } });
		},
		noticeDetail() {
			if (this.noticeList.id) {
				this.$Router.push({ name: 'notice-detail', params: { id: this.noticeList.id } });
			}
		},
		toHousekeeper() {
			this.$Router.push({ name: 'housekeeper', params: { id: this.housekeeper.uid } });
		},
		getData() {
			// let datax = {
			// 		ownerInfo: {
			// 			roomid: '21231',
			// 			villagename: '阳光榭',
			// 			villageaddr:'眉山',
			// 			realname:'杨梅',
			// 			roomnum:'12-11-23'
			// 		}
			// };
			// this.$store.commit('setMyHouse', datax);
		},
		/*
		 * 检测版本升级
		 */
		checkVersionClick() {
			// 获取版本信息
			plus.runtime.getProperty(plus.runtime.appid, widgetInfo => {
				var platform = uni.getSystemInfoSync().platform;
				let versionCode = widgetInfo.versionCode;
				let data = {
					type: 2
				};
				if (platform === 'android') {
					data.type = 1;
				}
				this.$api.downLoadApp(data, res => {
					if (versionCode < res.data.bb_code) {
						this.upgradeType = 'pkg';
						this.upgradeContent = '更新了新版本';
						this.upgradeUrl = res.data.download_url;
						this.$refs.yomolUpgrade.show();
					}
				});
			});
		},
		getIndex() {
			let data = {};
		}
	},
	onShow() {
		if (this.$store.state.login_token) {
			this.getData();
		}
	},
	onLoad() {
		//检测是否有登录token
		try {
			const loginToken = uni.getStorageSync('loginToken');
			if (loginToken) {
				this.$store.commit('loginToken', loginToken);
				//首页数据
				this.getIndex();
				//检测更新
				// #ifdef APP-PLUS
				this.checkVersionClick();
				// #endif
			}
			const userInfo = uni.getStorageSync('userInfo');
			if (userInfo) {
				this.$store.commit('setHasLogin', true);
			}
		} catch (e) {
			// error
		}
	},
	computed: {
		myHouse() {
			return this.$store.state.myHouse;
		},
		hasBoundHouse() {
			return this.$store.state.hasBoundHouse;
		},
		hasLogin() {
			console.log(' this.$store.state.hasLogin: ' + JSON.stringify(this.$store.state.hasLogin));
			return this.$store.state.hasLogin;
		},
		message() {
			//接收到推送消息
			if (this.$store.state.pushMessage) {
				//消息提示
				this.showToast = true;
				setTimeout(res => {
					this.showToast = false;
				}, 5000);

				return '/static/img/message-active.png';
			} else {
				return '/static/img/message.png';
			}
		}
	},
	onPullDownRefresh() {
		let _this = this;
		setTimeout(function() {
			_this.getData();
			uni.stopPullDownRefresh();
		}, 1000);
	}
};
</script>

<style>
@import './index.css';
</style>
