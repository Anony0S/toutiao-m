<template>
	<div class="my-container">
		<!-- 未登录显示的头部 S -->
		<div class="my-top" @click="toLogin" v-if="!user">
			<img class="not-img" src="@/assets/mobile.png" />
			<span class="not-text">登录 / 注册</span>
		</div>
		<!-- 未登录显示的头部 E -->

		<!-- 已登录显示的头部 S -->
		<div class="my-top" v-else>
			<div class="login-top">
				<div class="left">
					<van-image class="avator" :src="userInfo.photo" round fit="cover" />
					<span>{{ userInfo.name }}</span>
				</div>
				<button class="right">编辑资料</button>
			</div>
			<div class="message">
				<div class="center">
					<span class="count">{{ userInfo.art_count }}</span>
					<span class="text">头条</span>
				</div>
				<div class="center">
					<span class="count">{{ userInfo.follow_count }}</span>
					<span class="text">关注</span>
				</div>
				<div class="center">
					<span class="count">{{ userInfo.fans_count }}</span>
					<span class="text">粉丝</span>
				</div>
				<div class="center">
					<span class="count">{{ userInfo.like_count }}</span>
					<span class="text">获赞</span>
				</div>
			</div>
		</div>
		<!-- 已登录显示的头部 E -->

		<!-- 导航部分 S -->
		<van-grid :column-num="2" :gutter="2" clickable class="grid-nav">
			<van-grid-item text="收藏" class="grid-item">
				<span slot="icon" class="iconfont icon-shoucang"></span>
			</van-grid-item>
			<van-grid-item text="历史" class="grid-item">
				<span slot="icon" class="iconfont icon-lishi"></span>
			</van-grid-item>
		</van-grid>
		<!-- 导航部分 E -->

		<!-- 单元格导航 S -->
		<van-cell-group>
			<van-cell title="消息通知" is-link to="/message" />
			<!-- TODO: 点击跳转消息通知 -->
			<van-cell title="小智同学" is-link to="/xiaozhi" />
			<!-- TODO: 点击跳转小智同学 -->
		</van-cell-group>
		<!-- 单元格导航 E -->

		<!-- 退出登录 S -->
		<button class="exit" v-if="user" @click="exit">退出登录</button>
		<!-- 退出登录 E -->
	</div>
</template>

<script>
import { mapState } from "vuex";
import { userInfoAPI } from "@/api";

export default {
	name: "My",
	data() {
		return {
			userInfo: {}, // 用户信息
		};
	},
	methods: {
		toLogin() {
			this.$router.push({
				name: "login",
			});
		},
		exit() {
			this.$dialog
				.confirm({
					title: "退出提示",
					message: "确认退出吗？",
				})
				.then(() => {
					// 确认退出：清除登录状态（容器中的 user + 本地存储中的 user ）
					this.$store.commit("setUser", null);
				})
				.catch(() => {
					// 用于捕获错误
				});
		},
		// 获取用户信息
		async getUserInfo() {
			try {
				const { data } = await userInfoAPI(this.user.token);
				this.userInfo = data.data;
			} catch (error) {
				if (error.message === "timeout of 3000ms exceeded")
					this.$toast.fail("获取信息超时！");
				else {
					this.$toast.fail("未知错误");
					console.log(error);
				}
			}
		},
	},
	created() {
		// 根据用户是否登录判断是否获取用户信息
		if (this.user) this.getUserInfo();
	},
	computed: {
		...mapState(["user"]),
	},
};
</script>

<style scoped lang="less">
.my-container {
	.my-top {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 200px;
		background: url("@/assets/banner.png") no-repeat center/cover;
		// 未登录状态
		.not-img {
			width: 66px;
			height: 66px;
			margin-bottom: 8px;
		}
		.not-text {
			font-size: 14px;
			color: #fff;
		}
		// 登陆状态
		.login-top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			box-sizing: border-box;
			padding: 0 15px;
			margin-top: 20px;
			.left {
				display: flex;
				align-items: center;
				.avator {
					width: 66px;
					height: 66px;
					margin-right: 10px;
					border: 2px solid #fff;
				}
				span {
					font-weight: 500;
					font-size: 16px;
					color: #fff;
				}
			}
			.right {
				width: 64px;
				height: 20px;
				background-color: #fff;
				font-size: 10px;
				color: #666;
				border: 0;
				border-radius: 10px;
			}
		}
		.message {
			display: flex;
			justify-content: space-around;
			width: 100%;
			margin-top: 28px;
			.center {
				display: flex;
				flex-direction: column;
				align-items: center;
				color: #fff;
				.count {
					font-size: 18px;
				}
				.text {
					font-size: 12px;
					margin-top: 8px;
				}
			}
		}
	}

	// 导航部分
	.grid-nav {
		.grid-item {
			margin-bottom: 2px;
			.iconfont {
				font-size: 24px;
			}
			.icon-shoucang {
				color: #eb5253;
			}
			.icon-lishi {
				color: #ff9d1d;
			}

			:deep(.van-grid-item__text) {
				margin-top: 5px !important;
			}
			:deep(.van-grid-item__text) {
				font-size: 14px;
			}
		}
	}

	// 退出按钮
	.exit {
		border: 0;
		width: 100%;
		height: 50px;
		background-color: #fff;
		margin-top: 3px;
		font-size: 15px;
		color: #d86262;
	}
}
</style>
