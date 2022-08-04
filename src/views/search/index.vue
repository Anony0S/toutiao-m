<template>
	<div class="search">
		<!-- 搜索栏 S -->
		<form action="/">
			<van-search
				v-model="searchValue"
				show-action
				placeholder="请输入搜索关键词"
				@search="onSearch"
				@cancel="onCancel"
				@focus="isResultShow = false"
			/>
		</form>
		<!-- 搜索栏 E -->

		<!-- 搜索结果 -->
		<SearchResult v-if="isResultShow" :searchValue="searchValue"></SearchResult>

		<!-- 搜索建议 S -->
		<SearchHint v-else-if="searchValue" :searchValue="searchValue"></SearchHint>

		<!-- 搜索历史 -->
		<SearchHisory v-else :historyData="historyData"></SearchHisory>
	</div>
</template>

<script>
import SearchHint from "./components/search-hint.vue";
import SearchHisory from "./components/search-history.vue";
import SearchResult from "./components/search-result.vue";
import { get, set } from "@/utils/storage";
export default {
	name: "Search",
	components: { SearchHint, SearchHisory, SearchResult },
	data() {
		return {
			searchValue: "",
			// 显示搜索结果
			isResultShow: false,
			// 搜索结果
			historyData: get("HISTORY_DATA") || [],
		};
	},
	methods: {
		async onSearch(val) {
			this.isResultShow = true;
			// 联想建议搜索
			this.searchValue = val;
			// 存储搜索结果
			if (this.historyData.includes(val)) {
				const index = this.historyData.findIndex((item) => item === val);
				this.historyData.splice(index, 1);
			}
			this.historyData.unshift(val);
		},
		onCancel() {
			// 取消
			this.$router.back();
		},
	},
	mounted() {
		// 联想建议搜索
		this.$bus.$on("onHintSearch", this.onSearch);
		// 全部删除
		this.$bus.$on("allDel", () => (this.historyData = []));
		// 删除指定项
		this.$bus.$on("delThisData", (index) => this.historyData.splice(index, 1));
	},
	beforeDestroy() {
		this.$bus.$off("onHintSearch");
		this.$bus.$off("allDel");
		this.$bus.$off("delThisData");
	},
	watch: {
		historyData() {
			set("HISTORY_DATA", this.historyData);
		},
	},
};
</script>

<style scoped lang="less">
.search {
	margin-top: 55px;
	/deep/.van-search {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		background-color: #3296fa;
		z-index: 1;
	}
	.van-search__action {
		color: #fff;
	}
}
</style>
