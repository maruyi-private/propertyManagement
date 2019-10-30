<template>
	<view>
		<view style="padding: 30upx;" class="color-font-gray">为了保障本社区内的住户能够享受高品质的服务，请提供您的真实有效信息以供物业中心进行验证</view>
		<view class="build_content">
			<view class="uni-flex-center">
				<view class="change-build uni-cell-90">
					<text class="uni-cell-30">请选择城市</text>
					<input class="uni-cell-70" @tap="changeCity" disabled="true" v-model="city.villageaddr" placeholder="请选择城市" />
				</view>
			</view>
			<view class="uni-flex-center">
				<view class="change-build uni-cell-90">
					<text class="uni-cell-30">请选择楼盘</text>
					<input class="uni-cell-70" @tap="changeHouse" disabled="true" v-model="village.villagename" placeholder="请选择楼盘" />
				</view>
			</view>
			<view class="uni-flex-center">
				<view class="change-build uni-cell-90">
					<text class="uni-cell-30">请选择楼栋</text>
					<input class="uni-cell-70" @tap="changeTower" disabled="true" v-model="tower.block" placeholder="请选择楼栋" />
				</view>
			</view>
			<view class="uni-flex-center">
				<view class="change-build uni-cell-90">
					<text class="uni-cell-30">请选择单元</text>
					<input class="uni-cell-70" @tap="changeUnit" disabled="true" v-model="unit.unit" placeholder="请选择单元" />
				</view>
			</view>
			<view class="uni-flex-center">
				<view class="change-build uni-cell-90">
					<text class="uni-cell-30">请选择房号</text>
					<input class="uni-cell-70" @tap="changeRoom" disabled="true" v-model="room.roomnum" placeholder="请选择房号" />
				</view>
			</view>

			<view class="information">
				<catLabel dataType="text" text="姓名" placeholder="请输入姓名" />
				<catLabel dataType="text" text="证件号" v-model="idcard" :maxlength="18"  placeholder="请输入证件号" />
			</view>
		</view>

		<button class="foot-btn bg-gradient-btn" :disabled="disabledBtn" @click="submit">提交认证</button>
	</view>
</template>

<script>
import catLabel from '@/components/cat-label/cat-label.vue';
export default {
	components: {
		catLabel
	},
	data() {
		return {
			disabled: true,
			idcard: '',
			selectTowerList: [],
			disabledBtn: true
		};
	},
	computed: {
		city(){
			return this.$store.state.city;
		},
		village() {
			return this.$store.state.village;
		},
		tower() {
			return this.$store.state.tower;
		},
		unit() {
			return this.$store.state.unit;
		},
		room() {
			if (this.$store.state.room.id) {
				this.disabledBtn = false;
			}
			return this.$store.state.room;
		}
	},
	onShow() {},
	methods: {
		changeHouse() {
			if (!this.$store.state.city.id && this.$store.state.city.id !== 0) {
				uni.showToast({
					icon: 'none',
					title: '请先选择城市'
				});
				return;
			}
			this.$Router.push({name:'add-project',params:{data:this.$store.state.city.id}})
		},
		changeCity() {
			this.$Router.push({name:'add-city'})
		},
		changeTower() {
			if (!this.$store.state.city.id) {
				uni.showToast({
					icon: 'none',
					title: '请先选择城市'
				});
				return;
			}
			if (!this.$store.state.village.id) {
				uni.showToast({
					icon: 'none',
					title: '请先选择楼盘'
				});
				return;
			}
			this.$Router.push({name:'add-tower',params:{data:this.$store.state.village.id}})
		},
		changeUnit() {
			if (!this.$store.state.village.id) {
				uni.showToast({
					icon: 'none',
					title: '请先选择楼盘'
				});
				return;
			}
			if (!this.$store.state.tower.id) {
				uni.showToast({
					icon: 'none',
					title: '请先选择楼栋'
				});
				return;
			}
			this.$Router.push({name:'add-unit',params:{data:this.$store.state.tower.id}})
		},
		changeRoom() {
			if (!this.$store.state.village.id) {
				uni.showToast({
					icon: 'none',
					title: '请先选择楼盘'
				});
				return;
			}
			if (!this.$store.state.tower.id) {
				uni.showToast({
					icon: 'none',
					title: '请先选择楼栋'
				});
				return;
			}
			if (!this.$store.state.unit.id) {
				uni.showToast({
					icon: 'none',
					title: '请先选择单元'
				});
				return;
			}
			this.$Router.push({name:'add-room',params:{data:this.$store.state.unit.id}})
		},
		submit() {
			let data = {
				login_token: this.$store.state.login_token, //登录令牌
				idcard: this.idcard, //		身份证号
				vid: this.village.id, //		项目id
				bid: this.tower.id, //		楼栋id
				unit: this.unit.id, //		单元id
				roomid: this.room.id //房间号
			};
			if(!this.idcard){
				uni.showToast({
					icon:'none',
					title:'请输入身份证号码'
				})
				return;
			}
			if(!this.$uitls.isIdCard(this.idcard)){
				uni.showToast({
					icon:'none',
					title:'请输入正确的身份证号码'
				})
				return;
			}
		}
	}
};
</script>

<style lang="scss">
.build_content {
	width: 100%;
	background: #ffffff;
	margin-bottom: 120upx;
}
.change-build {
	display: flex;
	height: 40upx;
	border-bottom: 0.8upx solid #c9ccd3;
	padding: 11px 0px;
	input {
		line-height: 80upx;
	}
}
.information {
	margin-top: 80upx;
}
.foot-btn {
	width: 100%;
	border: none;
	height: 100upx;
	line-height: 100upx;
	background: #ff8402;
	color: #ffffff;
	text-align: center;
	position: fixed;
	bottom: 0upx;
	border-radius: 0upx;
}
</style>
