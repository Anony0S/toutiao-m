<template>
    <div>
        <!-- 子路由出口 S -->
        <router-view></router-view>
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
        };
    },
};
</script>

<style lang="less">
.layout-tabbar {
	.iconfont {
		font-size: 20px;
	}
}
</style>