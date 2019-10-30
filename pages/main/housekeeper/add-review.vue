<template>
	<view>
		<view class="uni-flex-center">
			<view class="cleanfloat uni-cell-40">
				<i class="iconfont iconsolid-star" v-for="(item, index) in star" :class="{ 'iconsolid-star-active': item.active == 1 }" @tap="activeStar(index)"></i>
			</view>
		</view>
		<view class="uni-flex-center">
			<textarea placeholder-style="padding:20px;line-height:40upx" v-model="content" placeholder="请填写评价内容" maxlength="140" class="text-input-area"></textarea>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			key: '',
			star: [
				{
					active: 1
				},
				{
					active: 0
				},
				{
					active: 0
				},
				{
					active: 0
				},
				{
					active: 0
				}
			],
			content: ''
		};
	},
	onNavigationBarButtonTap() {
		let actives = [];
		this.star.forEach(res => {
			if (res.active === 1) {
				actives.push(res);
			}
		});
		let stars = actives.length;
		let text = '感谢您的支持！';
		if (stars <= 3) {
			text = '您确定要给我打这么低的分吗？';
		}
		uni.showModal({
			title: '确定要提交吗？',
			content: text,
			success: function(res) {
				if (res.confirm) {
					console.log('用户点击确定');
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		});
		let data = {
			star: stars,
			content: this.content
		};
		console.log('data: ' + JSON.stringify(data));
	},
	methods: {
		activeStar(index) {
			for (let i = 0; i < this.star.length; i++) {
				this.star[i].active = 0;
			}
			for (let i = 0; i < index + 1; i++) {
				this.star[i].active = 1;
			}
		}
	}
};
</script>

<style>
.iconfont {
	font-size: 26px;
	margin: 10upx;
}
page {
	background: #ffffff;
}
.cleanfloat {
	display: flex;
	margin-top: 40upx;
}
.text-input-area {
	width: 90%;
	border: 1upx solid #eeeeee;
	border-radius: 10upx;
	padding: 10upx;
	line-height: 40upx;
}
</style>
