<template>
	<view>
		<view class="uni-flex-center"><text class="uni-font-36 uni-font-bold">报事已完成</text></view>
		<view class="uni-flex-center"><text class="color-font-gray">请评价一下为您服务的员工吧</text></view>
		<view class="uni-flex-center">
			<view class="cleanfloat uni-cell-40">
				<i class="iconfont iconsolid-star" v-for="(item, index) in star" :class="{ 'iconsolid-star-active': item.active == 1 }" @tap="activeStar(index)"></i>
			</view>
		</view>
		<view class="uni-flex-center">
			<textarea
				placeholder-style="padding:20px;line-height:40upx"
				v-model="content"
				placeholder="请输入您对本次服务的评价或者建议"
				maxlength="140"
				class="text-input-area"
			></textarea>
		</view>
		<view class="uni-margin-top-80"><button type="primary" style="border-radius: 50upx;" class="uni-cell-80 bg-gradient-btn" @click="sub">提交评价</button></view>
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
			content: '',
			id: ''
		};
	},
	methods: {
		activeStar(index) {
			for (let i = 0; i < this.star.length; i++) {
				this.star[i].active = 0;
			}
			for (let i = 0; i < index + 1; i++) {
				this.star[i].active = 1;
			}
		},
		sub() {
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
				success: res => {
					if (res.confirm) {
						uniCloud.callFunction({
							name: 'addEvaluate',
							data: {
								point: stars,
								id: this.id,
								content: this.content,
								state: this.$docStatus.已终结
							},
							success() {
								uni.showToast({
									icon: 'success',
									title: '评价成功！'
								});
								setTimeout(function() {
									uni.navigateBack({
										delta: 2
									})
								}, 1000);
							},
							fail() {
								uni.showToast({
									icon: 'none',
									title: '评价失败！'
								})
							}
						})
					}
				}
			});
		}
	},
	onLoad() {
		this.id = this.$Route.query.id;
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
