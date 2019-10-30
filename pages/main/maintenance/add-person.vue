<template>
	<view class="content">
		<view class="input-group">
			<view class="uni-flex-btw border ">
				<text class="title uni-cell-20">联系人：</text>
				<input type="text" class="uni-cell-80" focus clearable v-model="form.name" placeholder="请输入联系人"/>
			</view>
			<view class="uni-flex-btw border">
				<text class="title uni-cell-20">手机号：</text>
				<input type="number" class="uni-cell-80" clearable  v-model="form.tel" placeholder="请输入联系人手机号"/>
			</view>
		</view>
	</view>
</template>

<script>

export default {
	data() {
		return {
			form:{
				name: '',
				tel: '',
			}
		};
	},
	onNavigationBarButtonTap(res){
		this.register();
	},
	methods: {
		isPhone(e) {
			console.log(JSON.stringify(e));
			let phone = e;
			var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
			if (myreg.test(phone) === false) {
				uni.showToast({
					icon: 'none',
					title: '请输入正确的手机号'
				});
				return false;
			}
			return true;
		},
		register() {
			const data = {
				name: this.name,
				tel: this.tel,
			};
			if(!this.form.name){
				uni.showToast({
					icon:'none',
					title: '联系人不能为空'
				});
				return;
			}
			const isphone =  this.isPhone(this.form.tel);
			
		}
	}
};
</script>

<style>
	.border{
		height: 80upx;
		line-height: 80upx;
		padding: 10upx;
		border-bottom: 1upx solid #EEEEEE;
	}
	.border input{
		height: 80upx;
		line-height: 80upx;
	}
</style>
