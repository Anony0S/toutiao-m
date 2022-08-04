<template>
	<div class="serch-hint">
		<van-cell
			icon="search"
			v-for="(option, index) in hintList"
			:key="index"
			@click="hintSearch(option)"
		>
			<span v-html="heightLight(option)"></span>
		</van-cell>
	</div>
</template>

<script>
import { searchHintAPI } from "@/api";
export default {
	name: "SearchHint",
	props: ["searchValue"],
	data() {
		return {
			hintList: [],
			timer: null,
		};
	},
	methods: {
		async searchHint(q) {
			try {
				const { data } = await searchHintAPI(q);
				this.hintList = (data.data.options[0] && data.data.options) || [];
			} catch (error) {
				console.log("获取搜索建议失败！", error);
			}
		},
		// 处理高亮字符
		heightLight(text) {
			if (text) {
				const heightLightStr = `<span class="active">${this.searchValue}</span>`;
				// 使用正则表达式进行字符的匹配 注意：使用正则表达式的构造函数
				// 参数一：匹配模式字符串，它会根据这个字符串创建正则对象
				// 参数二：匹配模式，要写到字符串中
				const reg = new RegExp(this.searchValue, "gi");
				return text.replace(reg, heightLightStr);
			} else return;
		},
		// 联想建议搜索
		hintSearch(option) {
			this.$bus.$emit("onHintSearch", option);
		},
	},
	watch: {
		// 防抖：也可使用插件
		searchValue: {
			// 初始化调用
			immediate: true,
			handler(val) {
				if (this.timer) clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					this.searchHint(val);
				}, 300);
			},
		},
	},
};
</script>

<style scoped lang="less">
.serch-hint {
	.van-cell__value--alone {
		/deep/.active {
			color: #3296fa;
		}
	}
}
</style>
