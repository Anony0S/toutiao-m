<template>
	<van-list
		v-model="loading"
		finished-text="没有更多了"
		@load="onLoad"
		:finished="finished"
		:error.sync="error"
		error-text="加载失败，请点击重试！"
	>
		<van-cell
			v-for="item in searchValueList"
			:key="item.art_id"
			:title="item.title"
		/>
	</van-list>
</template>

<script>
import { searchResaultsAPI } from "@/api";
export default {
	name: "SearchResult",
	props: ["searchValue"],
	data() {
		return {
			searchValueList: [],
			page: 1,
			finished: false,
			loading: false,
			error: false,
		};
	},
	methods: {
		async onLoad() {
			// 请求新增数据
			try {
				const { data } = await searchResaultsAPI({
					page: this.page,
					per_page: 10,
					q: this.searchValue,
				});
				const res = data.data.results;
				if (!res.length) {
					return (this.finished = true);
				}
				this.searchValueList.push(...res);
				this.page++;
			} catch (error) {
				this.error = true;
				this.$toast.fail("数据获取失败，\n请重试！");
				console.log(error);
			} finally {
				this.loading = false;
			}
		},
	},
};
</script>

<style></style>
