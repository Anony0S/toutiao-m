<template>
	<div class="search-history">
		<van-cell title="搜索历史">
			<div v-if="isDelete">
				<span @click="allDel">全部删除</span>
				&nbsp;
				<span @click="isDelete = !isDelete">完成</span>
			</div>
			<span slot="default" v-else>
				<van-icon name="delete-o" @click="isDelete = !isDelete" />
			</span>
		</van-cell>
		<van-cell
			:title="item"
			v-for="(item, index) in historyData"
			:key="index"
			@click="delThisData(index)"
		>
			<span slot="default" v-if="isDelete">
				<van-icon name="close" />
			</span>
		</van-cell>
	</div>
</template>

<script>
export default {
	name: "SearchHisory",
	data() {
		return {
			isDelete: false,
		};
	},
	props: {
		historyData: {
			type: Array,
			required: true,
			default: () => [],
		},
	},
	methods: {
		allDel() {
			this.$bus.$emit("allDel");
		},
		delThisData(index) {
			if (this.isDelete) {
				this.$bus.$emit("delThisData", index);
			} else {
				this.$bus.$emit("toThisData", index);
			}
		},
	},
};
</script>

<style scoped lang="less">
.search-history {
	.van-cell {
		.van-cell__value {
			font-size: 12px;
		}
	}
}
</style>
