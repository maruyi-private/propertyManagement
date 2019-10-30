<template>
	<view class="uni-margin-top-40">
		<view class="uni-flex-center">
			<view class="change-build uni-cell-90">
				<text class="uni-cell-30">当前月份账单</text>
				<input class="uni-cell-70" @tap="changeYearMonth" disabled="true" v-model="ymonth" />
			</view>
		</view>
		<!-- 物管账单 -->
		<view class="uni-list" v-if="type === 2">
			<view v-for="(items, index) in list" :key="index">
				<!-- 物管 -->
				<view 
					class="uni-list-cell" 
					hover-class="uni-list-cell-hover" 
				    v-for="(item, index) in items.room_wg" 
					:key="index" 
				>
					<view class="uni-media-list">
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-bottom">{{ item.ymonth }}账单</view>
							<view class="uni-media-list-text-top uni-ellipsis">¥{{ item.allmoney }}</view>
						</view>
						<view class="color89">
							{{ item.status }}
							<text class="uni-font-44">›</text>
						</view>
					</view>
				</view>
				<!-- 水费 -->
				<view
					class="uni-list-cell"
					hover-class="uni-list-cell-hover"
					v-for="(item, index) in items.room_water"
					v-if="item.sn"
					:key="index"
				>
					<view class="uni-media-list">
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-bottom">{{ item.ymonth }}账单</view>
							<view class="uni-media-list-text-top uni-ellipsis">¥{{ item.allmoney }}</view>
						</view>
						<view class="color89">
							{{ item.status }}
							<text class="uni-font-44">›</text>
						</view>
					</view>
				</view>
				<!-- 电费 -->
				<view
					class="uni-list-cell"
					hover-class="uni-list-cell-hover"
					v-for="(item, index) in items.room_ele"
					v-if="item.sn"
					:key="index"
					@click="billDetail(item)"
				>
					<view class="uni-media-list">
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-bottom">{{ item.ymonth }}账单</view>
							<view class="uni-media-list-text-top uni-ellipsis">¥{{ item.allmoney }}</view>
						</view>
						<view class="color89">
							{{ item.status }}
							<text class="uni-font-44">›</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 车位账单 -->
		<view class="uni-list" v-if="type === 1">
			<view v-for="(itemx, index) in list" :key="index">
				<!-- 物管 -->
				<view class="uni-list-cell">
					<view class="uni-media-list">
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-bottom">{{ itemx.car_wg.ymonth }}账单</view>
							<view class="uni-media-list-text-bottom">{{ itemx.car_wg.sn }}</view>
							<view class="uni-media-list-text-top uni-ellipsis">¥{{ itemx.car_wg.allmoney }}</view>
						</view>
						<view class="color89">
							{{ itemx.car_wg.status }}
							<text class="uni-font-44">›</text>
						</view>
					</view>
				</view>
				<!-- 水费 -->
				<view class="uni-list-cell"  v-for="(item, index) in itemx.car_water" v-if="item.sn" :key="index" >
					<view class="uni-media-list">
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-bottom">{{ item.ymonth }}账单</view>
							<view class="uni-media-list-text-top uni-ellipsis">¥{{ item.allmoney }}</view>
						</view>
						<view class="color89">
							{{ item.status }}
							<text class="uni-font-44">›</text>
						</view>
					</view>
				</view>
				<!-- 电费 -->
				<view class="uni-list-cell" v-for="(item, index) in itemx.car_ele" v-if="item.sn" :key="index" >
					<view class="uni-media-list">
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-bottom">{{ item.ymonth }}账单</view>
							<view class="uni-media-list-text-top uni-ellipsis">¥{{ item.allmoney }}</view>
						</view>
						<view class="color89">
							{{ item.status }}
							<text class="uni-font-44">›</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<w-picker mode="yearMonth" startYear="2010" :endYear="nowYear" :defaultVal="[0, 0]" :current="true" @confirm="onConfirm" ref="yearMonth" themeColor="#f00"></w-picker>
	</view>
</template>

<script>
import wPicker from '@/components/w-picker/w-picker.vue';
export default {
	data() {
		return {
			list: [],
			type: 1,
			ymonth: this.$uitls.yearMonth()
		};
	},
	components: {
		wPicker
	},
	computed: {
		nowYear() {
			let yearMonths = this.$uitls.yearMonth();
			let year = yearMonths.substring(0, 4);
			return year;
		}
	},
	methods: {
		billDetail(item) {
			this.$Router.push({ name: 'bill-detail', params: { data: item } });
		},
		onConfirm(e) {
			this.ymonth = e.checkArr[0] + e.checkArr[1];
			this.getNowMonthOrder();
		},
		changeYearMonth() {
			this.$refs.yearMonth.show();
		},
		getNowMonthOrder() {
			let data = {
				ymonth: this.ymonth
			};
		}
	},
	onLoad() {
		this.type = this.$Route.query.type;
		/*
		 type  1 是车辆账单，2是物业账单
		 */
		this.getNowMonthOrder();
		if (this.type === 1) {
			uni.setNavigationBarTitle({
				title: '车辆账单'
			});
		} else {
			uni.setNavigationBarTitle({
				title: '物业账单'
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background: #ffffff;
}
.color89 {
	line-height: 80upx;
}
.uni-font-44 {
	padding-left: 20upx;
}
.uni-media-list-body {
	height: 94upx;
}
.change-build {
	display: flex;
	height: 80upx;
	padding: 11px 0px;
	input {
		line-height: 80upx;
	}
}
</style>
