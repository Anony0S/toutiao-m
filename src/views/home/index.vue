<template>
	<div class="home-container">
		<div class="search">
			<div class="s-input" @click="toSearch">
				<i class="iconfont icon-sousuo"></i>
				<span>搜索</span>
			</div>
		</div>

		<!-- 标签页 S -->
		<!-- 通过 v-model 绑定当前激活标签对应的索引值，默认情况下启用第一个标签。 -->
		<!-- 通过 animated 属性可以开启切换标签内容时的转场动画。 -->
		<!-- 通过 swipeable 属性可以开启滑动切换标签页。 注意滑动范围 -->
		<van-tabs v-model="active" animated swipeable class="home-tab">
			<van-tab title="推荐">内容 1</van-tab>
			<van-tab title="热门话题">内容 2</van-tab>
			<van-tab title="科技动态">内容 3</van-tab>
			<van-tab title="区块链">内容 4</van-tab>
			<van-tab title="内容5">内容 5</van-tab>
			<van-tab title="标签6">内容 6</van-tab>
			<div class="tabnav-right"></div>
			<i
				slot="nav-right"
				class="iconfont icon-gengduo"
				@click="hamburgerShow"
			></i>
		</van-tabs>
		<!-- 标签页 E -->
	</div>
</template>

<script>
export default {
	name: "Home",
	data() {
		return {
			active: 0,
		};
	},
	methods: {
		toSearch() {
			// TODO: 去往搜索页
			console.log("触发 搜索");
		},
		hamburgerShow() {
			// TODO: 汉堡按钮显示值
			console.log("触发 汉堡按钮");
		},
	},
};
</script>

<style scoped lang="less">
.home-container {
	.search {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 50px;
		background-color: #3296fa;
		.s-input {
			width: 278px;
			height: 32px;
			background-color: #5babfb;
			border: 0;
			border-radius: 16px;
			color: #fff;
			text-align: center;
			line-height: 32px;
			i.icon-sousuo {
				font-size: 16px;
				margin-right: 3px;
			}
			span {
				font-size: 14px;
			}
		}
	}
	// 标签页
	/deep/.home-tab {
		.van-tabs__wrap {
			min-height: 42px;
			border-bottom: 1px solid #edeff3;
			.van-tabs__nav {
				padding: 0;
				padding-right: 32px;
				.van-tab {
					width: 100px;
					border-right: 1px solid #edeff3;
					font-size: 16px;
					color: #777;
				}
				.van-tab--active {
					color: #333;
				}
				.van-tabs__line {
					width: 16px;
					height: 3px;
					background-color: #3296fa;
					bottom: 8px;
				}
				i.icon-gengduo {
					position: fixed;
					right: 0;
					top: 50px;
					width: 33px;
					height: 42px;
					line-height: 44px;
					background-color: #fff;
					text-align: center;
					opacity: 0.9;
					border-left: 1px solid;
					border-image: linear-gradient(to bottom, #fff, #c8c8c8, #fff) 1;
					border-bottom: 1px solid #edeff3;
				}
				.tabnav-right {
					width: 33px;
				}
			}
		}
	}
}
</style>
