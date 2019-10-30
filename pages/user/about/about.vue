<template>
	<view>
		<view class="about-header uni-flex-center">
			<view>
				<image src="/static/img/logo.png" mode="aspectFit" class="about-logo"></image>
				<view class="uni-text-center">
					阳光·慧生活
					<!-- #ifdef APP-PLUS -->
					：v{{version}}
					<!-- #endif -->
				</view>
			</view>
		</view>
		<view class="center_menu">
			<view class="menu_item" v-for="(item, index) in menus" :key="index" @click="getNav(item.url)">
				<image :src="item.icon" mode="aspectFill"></image>
				<text>{{ item.name }}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			version:0,
			menus: [
				{
					name: '用户协议',
					icon: '/static/fumou-center-template/4.png',
					key: 1,
					url: 'user-agreement'
				},
				{
					name: '服务说明',
					icon: '/static/fumou-center-template/5.png',
					key: 2,
					url: 'service-explain'
				}
			]
		};
	},
	methods: {
		getNav(url){
			this.$Router.push({name:url})
		}
	},
	onLoad() {
		// #ifdef APP-PLUS
		this.version = plus.runtime.version;
		// #endif
		
	}
};
</script>

<style>
.about-header {
	height: 500upx;
}
.about-logo{
	height: 200upx;
}
.center_menu {
	width: 100%;
	display: inline-block;
}
.menu_item {
	font-size: 28upx;
	letter-spacing: 1px;
	padding: 14px 5%;
	background: #fefefe;
	overflow: hidden;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	position: relative;
	border-bottom: 1px solid #efefef;
}

.menu_item text:nth-of-type(1) {
	margin-left: 10px;
}
.menu_item image {
	width: 40upx;
	height: 40upx;
}
</style>
