<template>
	<div>
		<!-- 子路由出口 S -->
		<Transition
			appear
			name="animate__animated animate__bounce"
			:enter-active-class="`animate__${right} animate__faster`"
			:leave-active-class="`animate__${left} animate__faster`"
		>
			<router-view class="router"> </router-view>
		</Transition>
		<!-- 子路由出口 E -->

		<!-- tabbar S -->
		<van-tabbar class="layout-tabbar" route>
			<van-tabbar-item to="/home">
				<i slot="icon" class="iconfont icon-shouye"></i>首页
			</van-tabbar-item>
			<van-tabbar-item to="/question">
				<i slot="icon" class="iconfont icon-wenda"></i>问答
			</van-tabbar-item>
			<van-tabbar-item to="/movies">
				<i slot="icon" class="iconfont icon-shipin"></i>视频
			</van-tabbar-item>
			<van-tabbar-item to="/my">
				<i slot="icon" class="iconfont icon-wode"></i>我的
			</van-tabbar-item>
		</van-tabbar>
		<!-- tabbar E-->
	</div>
</template>

<script>
export default {
	name: "LayoutIndex",
	data() {
		return {
			right: "fadeIn",
			left: "fadeOut",
		};
	},
	watch: {
		$route(to, from) {
			if (to.meta.index > from.meta.index) {
				this.right = "fadeIn";
				this.left = "fadeOut";
			} else {
				this.right = "fadeIn";
				this.left = "fadeOut";
			}
		},
	},
};
</script>

<style lang="less">
.layout-tabbar {
	position: absolute;
	.iconfont {
		font-size: 20px;
	}
}
.router {
	position: absolute;
	width: 100%;
	height: 100%;
}
</style>
