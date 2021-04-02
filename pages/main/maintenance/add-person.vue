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
		<button class="saveButton" @click="register">保存</button>
	</view>
</template>

<script>
import { createUniqueId } from '@/common/util.js'
export default {
	data() {
		return {
			form:{
				name: '',
				tel: '',
			}
		};
	},
	// onNavigationBarButtonTap(res){
	// 	this.register();
	// },
	methods: {
		isPhone(e) {
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
		async register() {
			const uuid = createUniqueId();
			const data = {
				id: uuid,
				login_token: this.$store.state.login_token,
				...this.form
			};
			if(!this.form.name){
				uni.showToast({
					icon:'none',
					title: '联系人不能为空'
				});
				return;
			}
			const isphone =  this.isPhone(this.form.tel);
			const contactPerson = [];
			if(this.$store.state.contacts && this.$store.state.contacts.length != 0) {
				contactPerson.push(this.$store.state.contacts);
			}
			contactPerson.push(data);
			
			uniCloud.callFunction({
				name: 'addContactPerson',
				data: { contactPerson: contactPerson },
				success: (res) => {
					uni.showToast({
						icon: 'none',
						title: '添加成功！'
					});
					this.$store.commit('setContacts', contactPerson);
				}
			});
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
	.saveButton {
		width: 90%;
		height: 80upx;
		line-height: 80upx;
		border-radius: 40upx;
		margin-bottom: 40upx;
		margin-top: 40upx;
		color: #ffffff;
		background-color: #007AFF;
	}
</style>
