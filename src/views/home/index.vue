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
		<van-tabs
			v-model="active"
			animated
			swipeable
			class="home-tab"
			sticky
			offset-top="50px"
		>
			<van-tab :title="item.name" v-for="item in channelsList" :key="item.id">
				<!-- 文章列表 S -->
				<ArticleList :channel="item"></ArticleList>
				<!-- 文章列表 E -->
			</van-tab>
			<div class="tabnav-right"></div>
			<i
				slot="nav-right"
				class="iconfont icon-gengduo"
				@click="hamburgerShow"
			></i>
		</van-tabs>
		<!-- 标签页 E -->

		<!-- 弹出层 S -->
		<van-popup
			v-model="popupShow"
			closeable
			position="bottom"
			:style="{ height: '100%' }"
			duration=".2"
			close-icon-position="top-left"
		>
			<ChannelEdit :channelsList="channelsList" :active="active"></ChannelEdit>
		</van-popup>
		<!-- 弹出层 E -->
	</div>
</template>

<script>
import {
	getUserChannelsAPI,
	setUserChannelsAPI,
	delUserChannelAPI,
} from "@/api";
import { mapState } from "vuex";
import { set, get } from "@/utils/storage";
import ArticleList from "./components/articleList.vue";
import ChannelEdit from "./components/channel-edit.vue";
export default {
	name: "Home",
	components: { ArticleList, ChannelEdit },
	data() {
		return {
			active: 0,
			channelsList: [],
			// 控制弹出层参数
			popupShow: false,
		};
	},
	methods: {
		toSearch() {
			// 去往搜索页
			this.$router.push({ name: "search" });
		},
		hamburgerShow() {
			// 汉堡按钮显示值
			this.popupShow = true;
		},
		// 获取频道列表
		async getChannels() {
			try {
				const res = await getUserChannelsAPI();
				if (this.user) {
					// 登录状态 远程获取列表
					this.channelsList = res.data.data.channels;
				} else {
					// 未登录状态 本地获取列表
					this.channelsList = get("TOUTIAO_CHANNELS") || res.data.data.channels;
				}
			} catch (error) {
				this.$toast.fail("获取频道列表错误");
				console.log(error);
			}
		},
		// 增加频道列表
		async addChannel(channel) {
			this.channelsList.push(channel);
			// 数据持久化
			if (this.user) {
				try {
					// 登录状态
					await setUserChannelsAPI({
						id: channel.id,
						seq: this.channelsList.length,
					});
				} catch (error) {
					this.$toast.fail("保存列表失败，\n请重试！");
					console.log(error);
				}
			} else {
				// 未登录状态
				set("TOUTIAO_CHANNELS", this.channelsList);
			}
		},
		// 删除频道列表
		async delChannel(index) {
			if (this.user) {
				//登录状态
				try {
					const id = this.channelsList[index].id;
					await delUserChannelAPI(id);
					this.channelsList.splice(index, 1);
					if (index < this.active) this.active--;
				} catch (error) {
					this.$toast.fail("删除频道失败！");
					console.log(error);
				}
			} else {
				this.channelsList.splice(index, 1);
				if (index < this.active) this.active--;
				set("TOUTIAO_CHANNELS", this.channelsList);
			}
		},
	},
	computed: {
		...mapState(["user"]),
	},
	mounted() {
		this.getChannels();
		// 我的频道添加
		this.$bus.$on("addChannel", this.addChannel);
		// 点击跳转页面
		this.$bus.$on("changeActive", (index) => {
			this.active = index;
			this.popupShow = false;
		});
		// 我的频道删除
		this.$bus.$on("delChannel", this.delChannel);
	},
	beforeDestroy() {
		this.$bus.$off("addChannel");
		this.$bus.$off("delChannel");
	},
};
</script>

<style scoped lang="less">
.home-container {
	padding-bottom: 50px;
	.search {
		position: fixed;
		z-index: 1;
		width: 100%;
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
					font-size: 15px;
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
					line-height: 43px;
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
