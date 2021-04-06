<template>
	<view>
		<view class="uni-flex-center">
			<view class="uni-padding-wrap">
				<uni-segmented-control :current="current" :values="items" :style-type="styleType" :active-color="activeColor" @clickItem="onClickItem" />
			</view>
		</view>
         <view class="repair-order-content">
         	<uni-card v-for="(item, index) in list" :key="index" :title="item.docType === 0 ? familyData[item.type] : publicData[item.type]" :extra="items[current]">
         		<view class="order-content" @click="getDetail(item)">{{ item.content }}</view>
         	</uni-card>
         	<view class="uni-empty" v-if="list.length == 0">{{ loadingText }}</view>
         </view>
		<!-- 数据列表 -->
	</view>
</template>

<script>
import uniCard from '@/components/uni-card/uni-card.vue';
import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';
export default {
	components: {
		uniCard,
		uniSegmentedControl
	},
	data() {
		return {
			loadingText: '暂无数据',
			items: ['待接单', '已处理', '处理中', '已派单', '待评价'],
			activeColor: '#ed7a30',
			current: 0,
			styleType: 'text',
			list: [],
			familyData: [],
			publicData: []
		};
	},
	computed: {},
	onShow() {},
	onReachBottom: function() {
		// console.log('我触底了要加载数据了: ' + JSON.stringify('我触底了要加载数据了'));
	},
	methods: {
		onClickItem(index) {
			if (this.current !== index) {
				this.current = index;
				this.getRepairlist();
			}
		},
		getDetail(item) {
			uni.navigateTo({
				url: '/pages/user/repair-order/detail?data=' + item._id
			});
		},
		getRepairlist() {
			uniCloud.callFunction({
				name: 'getCurrentDocByStatus',
				data: {
					status: this.current,
					userId: this.$store.state.login_token
				},
				success: (res) => {
					console.log('res', res);
					this.list = res.result[0];
				},
				fail(error) {
					console.log('error', error);
				}
			})
			
		},
		typeName(item) {
			if(item.docType === 0) {
				return this.$store.state.familyData.filter(e => {
					if(e.id === item.type) {
						console.log('typename', e.typename);
						return e.typename.toString();
					}
				})
			} else {
				return this.$store.state.publicData.filter(e => {
					if(e.id === item.type) {
						return e.typename.toString();
					}
				})
			}
		},
		setFamilyPublicData() {
			this.familyData = this.$store.state.familyData.map(x => (x.typename));
			this.publicData = this.$store.state.publicData.map(x => (x.typename));
		}
	},
	onLoad() {
		this.setFamilyPublicData();
		this.getRepairlist();
	}
};
</script>

<style scoped>
.uni-flex-center {
	background: #ffffff;
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 999;
}
.uni-padding-wrap {
	width: 90%;
	padding: 0;
	/* margin: 10upx; */
}
.repair-order-content{
	margin-top: 100upx;
}
.order-content {
	height: 180upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	word-break: break-all;
	text-overflow: ellipsis;
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 4; /** 显示的行数 **/
	overflow: hidden;
}
</style>
