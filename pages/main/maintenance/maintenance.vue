<template>
	<view class="maintenance">
		<view class="tenance-header">
			<view v-for="(item, index) in headData" :key="index" @click="changeBox(index)" class="uni-cell-40 text" :class="{ active: current === index }">
				<i class="iconfont " :class="[item.cls]">
					<text style="padding: 10upx;">{{ item.text }}</text>
				</i>
			</view>
		</view>
		<view class="content">
			<template v-if="current === 0">
				<baoxiu></baoxiu>
			</template>
			<template v-if="current === 1">
				<jianyi></jianyi>
			</template>
		</view>
	</view>
</template>

<script>
import jianyi from './tenance-jianyi.vue';
import baoxiu from './tenance-baoxiu.vue';
export default {
	components: {
		jianyi,
		baoxiu
	},
	data() {
		return {
			headData: [{ text: '报事报修', cls: 'iconweixiujifei' }, { text: '投诉建议', cls: 'icontousuyiwen' }],
			current: 0, //默认报事报修
			baoshi: '',
			jianyi: ''
		};
	},

	methods: {
		//切换投诉建议
		changeBox(index) {
			this.current = index;
		},
		getRepairStart() {
		},
		getUpToken() {
			let data = {};
		}
	},
	onShow() {
		// this.getRepairStart();
	},
	onLoad() {
		this.current = this.$Route.query.id;
		uniCloud.callFunction({
			name: 'getContactPerson',
			data: { userId: this.$store.state.login_token },
			success: (res) => {
				this.$store.commit('setContacts', res.result.data);
			}
		});
		// console.log("this.$Route.query: " + JSON.stringify(this.$Route.query.id));
		// this.getUpToken();
	}
};
</script>
<style scoped>
@import './maintenance.css';
</style>
