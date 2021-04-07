<template>
	<view>
		<view class="uni-common-content" v-if="repairData">
			<!-- 接单流程 -->
			<view class="uni-timeline">
				<view
					class="uni-timeline-item "
					v-for="(item, index) in repairData.followRecord"
					:key="index"
					:class="{ ' uni-timeline-first-item': index == 0, 'uni-timeline-last-item': index == repairData.followRecord.length - 1 }"
					:style="{ color: index == repairData.followRecord.length - 1 ? '#000000' : '#898989' }"
				>
					<view class="uni-timeline-item-divider"></view>
					<view class="uni-timeline-item-content uni-cell-100 uni-flex-btw">
						<view class="uni-cell-80">
							<view>{{ item.status }}</view>
							<view>{{ item.content }}</view>
							<view class="datetime">{{ item.ctime }}</view>
						</view>
						<view class="uni-cell-20 uni-flex-center uni-text-right ">
							<text class="uni-font-bold">{{ item.realname == null ? '待接单' : item.realname }}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 报事详情 -->
			<view class="detail-person">
				<view>
					<view>
						<text>【{{ repairData.docType === 0 ? familyData[repairData.type] : publicData[repairData.type] }}】</text>
						<text>{{ repairData.content }}</text>
					</view>
					<image class="uni-common-showImg" v-for="(item, index) in imgs" :key="index" @click="showImgs(item)" :src="baseImgUrls + item" mode="aspectFit"></image>
				</view>
				<view class="color-font-gray">创建于 {{ repairData.createtime | format(repairData.createtime) }}</view>
			</view>
			<!-- 报事人详情 -->
			<view class="detail-person">
				<view class="uni-flex-btw">
					<text class="color-font-gray">地址</text>
					<text>{{ repairData.villagename }}  {{ repairData.room }}</text>
				</view>
				<view class="uni-flex-btw">
					<text class="color-font-gray">预约时间</text>
					<text>{{ repairData.starttime | format(repairData.starttime) }}至{{ repairData.endtime | format(repairData.endtime) }}</text>
				</view>
				<view class="uni-flex-btw">
					<text class="color-font-gray">报事人</text>
					<text>{{ repairData.name }}</text>
				</view>
				<view class="uni-flex-btw">
					<text class="color-font-gray">联系电话</text>
					<text>{{ repairData.tel }}</text>
				</view>
			</view>
		</view>
		<!-- v-if="repairData.status === '待评价'" -->
		<view class="uni-common-foot-btn" v-if="repairData.status === '待评价'" ><button type="primary" class="bg-gradient-btn" @click="evaluate">去评价</button></view>
		<!-- 管家说明 -->
		<view class="uni-common-mark uni-flex-center" v-show="mark" @touchmove.stop.prevent="moveHandle">
			<view class="uni-cell-100">
				<view class="uni-flex-center">
					<view class="uni-common-mark-content uni-flex-center"><image :src="showImg" mode="aspectFit"></image></view>
				</view>
				<view class="uni-flex-center" @click="closeMark"><view class="uni-common-mark-close">X</view></view>
			</view>
		</view>
	</view>
</template>

<script>
import { formatDate } from '@/util/api.js';
export default {
	filters: {
		format(date, format) {
			return formatDate(date);
		}
	},
	data() {
		return {
			key: '',
			mark: false,
			showImg: '',
			imgs: [],
			orderId: '',
			repairData: {},
			familyData: [],
			publicData: []
		};
	},
	computed: {
		baseImgUrls() {
			return this.$store.state.baseImgUrl;
		}
	},
	methods: {
		moveHandle() {},
		closeMark() {
			this.mark = !this.mark;
		},
		//图片预览
		showImgs(urlImg) {
			this.mark = !this.mark;
			this.showImg = this.baseImgUrls + urlImg;
		},
		getRepairDetail() {
			uniCloud.callFunction({
				name: 'getDocById',
				data: { id: this.orderId },
				success: (res) => {
					console.log('res', res.result.data);
					this.repairData = res.result.data[0];
				},
				fail() {
					console.log('error');
				}
			})
		},
		evaluate() {
			if(this.repairData.id){
				this.$Router.push({ name: 'evaluate',params: { id: this.repairData.id } });
			}
		},
		setFamilyPublicData() {
			this.familyData = this.$store.state.familyData.map(x => (x.typename));
			this.publicData = this.$store.state.publicData.map(x => (x.typename));
		}
	},
	onLoad(option) {
		this.orderId = option.data;
		this.setFamilyPublicData();
		this.getRepairDetail();
		uni.showLoading({
		    title: '加载中'
		});
		setTimeout(() => {
		    uni.hideLoading();
		}, 1500);
	},
	onShow() {
		if(this.orderId){
			this.setFamilyPublicData();
			this.getRepairDetail();
		}
	}
};
</script>

<style scoped lang="less">
page {
	background: #ffffff;
}
.uni-timeline {
	padding: 22upx 30upx;
	background: #ffffff;
}
.uni-media-list-logo {
	border-radius: 50%;
}
.detail-person {
	margin: 35upx 0;
	background: #ffffff;
	padding: 30upx;
}
</style>
