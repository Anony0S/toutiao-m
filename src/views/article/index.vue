<template>
	<div class="article-container">
		<!-- 导航栏 -->
		<van-nav-bar
			class="page-nav-bar"
			left-arrow
			title="黑马头条"
			@click-left="onClickLeft"
		></van-nav-bar>
		<!-- /导航栏 -->

		<div class="main-wrap">
			<!-- 加载中 -->
			<div class="loading-wrap" v-if="isLoading && !isFail">
				<van-loading color="#3296fa" vertical>加载中</van-loading>
			</div>
			<!-- /加载中 -->

			<!-- 加载完成-文章详情 -->
			<div class="article-detail" v-if="!isLoading && !isFail">
				<!-- 文章标题 -->
				<h1 class="article-title">{{ article.title }}</h1>
				<!-- /文章标题 -->

				<!-- 用户信息 -->
				<van-cell class="user-info" center :border="false">
					<van-image
						class="avatar"
						slot="icon"
						round
						fit="cover"
						:src="article.aut_photo"
					/>
					<div slot="title" class="user-name">{{ article.aut_name }}</div>
					<div slot="label" class="publish-date">{{ article.pubdate }}</div>
					<van-button
						class="follow-btn"
						type="info"
						color="#3296fa"
						round
						size="small"
						icon="plus"
						v-if="!article.is_followed && !follwLoading"
						@click="toFocus"
					>
						关注
					</van-button>
					<van-button class="follow-btn" round size="small" v-if="follwLoading">
						<van-loading size="24" />
					</van-button>
					<van-button
						class="follow-btn"
						round
						size="small"
						v-if="article.is_followed && !follwLoading"
						@click="cancleFollow"
					>
						已关注
					</van-button>
				</van-cell>
				<!-- /用户信息 -->

				<!-- 文章内容 -->
				<div class="article-content" v-html="article.content"></div>
				<van-divider id="comment">正文结束</van-divider>

				<!-- 文章评论 -->
				<ContentItem
					v-for="item in commentsList"
					:key="item.com_id"
					:comment="item"
					:isShow="isShow"
					:status="true"
				></ContentItem>
			</div>
			<!-- /加载完成-文章详情 -->

			<!-- 加载失败：404 -->
			<div class="error-wrap" v-if="is404 && isFail">
				<van-icon name="failure" />
				<p class="text">该资源不存在或已删除！</p>
			</div>
			<!-- /加载失败：404 -->

			<!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
			<div class="error-wrap" v-if="!is404 && isFail">
				<van-icon name="failure" />
				<p class="text">内容加载失败！</p>
				<van-button class="retry-btn" @click="getArticle">点击重试</van-button>
			</div>
			<!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
		</div>

		<!-- 评论详情弹出层 -->
		<van-popup v-model="isShow" position="bottom" :style="{ height: '100%' }">
			<ContentDetalis
				:comment="comment"
				:cCommentsList="cCommentsList"
			></ContentDetalis>
		</van-popup>

		<!-- 底部区域 -->
		<div class="article-bottom">
			<van-button
				class="comment-btn"
				type="default"
				round
				size="small"
				@click="show = true"
			>
				写评论
			</van-button>
			<!-- info="123" -->
			<van-badge :content="commentsCount">
				<van-icon name="comment-o" color="#777" @click="toComment" />
			</van-badge>
			<van-icon
				name="star"
				color="#ff9632"
				v-if="article.is_collected"
				@click="cancleCollect"
			/>
			<van-icon name="star-o" color="#777" v-else @click="collectArticle" />
			<van-badge :content="article.like_count">
				<van-icon
					name="good-job"
					color="#ff9632"
					v-if="article.attitude === 1"
					@click="setDislike"
				/>
				<van-icon name="good-job-o" color="#777" v-else @click="setLike" />
			</van-badge>
			<van-icon name="share" color="#777777"></van-icon>
		</div>
		<!-- 评论弹出层 -->
		<SendComment :show="show" @sendDiacuss="sendDiacuss"></SendComment>
		<!-- /底部区域 -->
	</div>
</template>

<script>
import {
	getArticleAPI,
	publishCommentAPI,
	getCommentsAPI,
	followUserAPI,
	cancelFollowAPI,
	collectArticleAPI,
	cancleCollectAPI,
	setLikeAPI,
	setDislikeAPI,
} from "@/api";
import ContentItem from "./components/ContentItem.vue";
import SendComment from "./components/SendComment.vue";
import ContentDetalis from "./components/ContentDetalis.vue";
export default {
	name: "Article",
	components: { ContentItem, SendComment, ContentDetalis },
	data() {
		return {
			article: {},
			isLoading: false,
			isFail: false,
			is404: false,
			show: false,
			message: "",
			// 评论数据
			commentsList: null,
			// 评论数
			commentsCount: null,
			// 关注
			follwLoading: false,
			// 评论弹出层
			isShow: false,
			// 点击到的评论
			comment: {},
			// 评论的评论
			cCommentsList: [],
		};
	},
	props: {
		articleID: {
			//接收两种参数类型：点击链接和跳转时候的数据类型不同
			type: [String, Number],
			required: true,
		},
	},
	methods: {
		// 获取文章详情
		async getArticle() {
			try {
				this.isLoading = true;
				const { data } = await getArticleAPI(this.articleID);
				this.article = data.data;
				this.isLoading = false;
			} catch (error) {
				this.isFail = true;
				console.log(error);
			}
		},
		// 返回
		onClickLeft() {
			this.$router.back();
		},
		// 关注用户
		async toFocus() {
			try {
				this.follwLoading = true;
				await followUserAPI(this.article.aut_id);
				this.article.is_followed = true;
				this.follwLoading = false;
			} catch (error) {
				this.$toast.fail("关注用户失败!");
				console.log(error);
			}
		},
		// 取关用户
		async cancleFollow() {
			try {
				this.follwLoading = true;
				await cancelFollowAPI(this.article.aut_id);
				this.article.is_followed = false;
				this.follwLoading = false;
			} catch (error) {
				this.$toast.fail("取关失败!");
				console.log(error);
			}
		},
		// 发送评论
		async sendDiacuss() {
			this.$toast.loading({
				message: "请稍后!",
				overlay: true,
				forbidClick: true,
				duration: 0,
				closeOnClickOverlay: true,
			});
			try {
				const { data } = await publishCommentAPI({
					target: this.articleID,
					content: this.message,
				});
				this.show = false;
				this.message = "";
				this.$toast.success("发送成功");
				this.commentsList.unshift(data.data.new_obj);
				this.commentsCount++;
			} catch (error) {
				console.log(error);
				const { data } = error;
				if (data && data.message) this.$toast.fail(data.message);
				this.$toast.fail("发表评论失败!");
			}
		},
		// 获取文章评论
		async getComments() {
			try {
				const { data } = await getCommentsAPI({
					type: "a",
					source: this.articleID,
				});
				this.commentsList = data.data.results;
				this.commentsCount = data.data.total_count;
			} catch (error) {
				this.$toast.fail("获取评论失败!");
				console.log(error);
			}
		},
		// 收藏文章
		async collectArticle() {
			try {
				await collectArticleAPI(this.article.art_id);
				this.$toast.success("收藏成功！");
				this.article.is_collected = true;
			} catch (error) {
				this.$toast.fail("收藏文章失败!");
				console.log(error);
			}
		},
		// 取消收藏
		async cancleCollect() {
			try {
				await cancleCollectAPI(this.article.art_id);
				this.$toast.success("取消收藏成功！");
				this.article.is_collected = false;
			} catch (error) {
				this.$toast.fail("取消收藏失败！");
				console.log(error);
			}
		},
		// 对文章点赞
		async setLike() {
			try {
				await setLikeAPI(this.article.art_id);
				this.$toast.success("点赞成功！");
				this.article.attitude = 1;
				this.article.like_count++;
			} catch (error) {
				this.$toast.fail("点赞失败！");
				console.log(error);
			}
		},
		// 对文章取消点赞
		async setDislike() {
			try {
				await setDislikeAPI(this.article.art_id);
				this.$toast.success("取消点赞成功！");
				this.article.attitude = 0;
				this.article.like_count--;
			} catch (error) {
				this.$toast.fail("取消点赞失败！");
				console.log(error);
			}
		},
		// 跳转到评论
		toComment() {
			document.querySelector("#comment").scrollIntoView({ behavior: "smooth" });
		},
	},
	mounted() {
		this.getArticle();
		// 获取评论
		this.getComments();
	},
};
</script>

<style scoped lang="less">
.article-container {
	/deep/.van-nav-bar .van-icon {
		color: #fff;
	}
	.main-wrap {
		position: fixed;
		left: 0;
		right: 0;
		top: 46px;
		bottom: 44px;
		overflow-y: scroll;
		background-color: #fff;
	}
	.article-detail {
		.article-title {
			font-size: 20px;
			padding: 25px 16px;
			margin: 0;
			color: #3a3a3a;
		}

		.user-info {
			padding: 0 16px;
			.avatar {
				width: 35px;
				height: 35px;
				margin-right: 8.5px;
			}
			.van-cell__label {
				margin-top: 0;
			}
			.user-name {
				font-size: 12px;
				color: #3a3a3a;
			}
			.publish-date {
				font-size: 11.5px;
				color: #b7b7b7;
			}
			.follow-btn {
				width: 85px;
				height: 29px;
			}
		}

		.article-content {
			width: 100%;
			padding: 27.5px 16px;
			/deep/ p {
				text-align: justify;
			}
			/deep/img {
				width: 100%;
			}
		}
	}

	.loading-wrap {
		padding: 100px 16px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #fff;
	}

	.error-wrap {
		padding: 100px 16px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #fff;
		.van-icon {
			font-size: 61px;
			color: #b4b4b4;
		}
		.text {
			font-size: 15px;
			color: #666666;
			margin: 12.5px 0 23px;
		}
		.retry-btn {
			width: 140px;
			height: 35px;
			line-height: 35px;
			border: 1px solid #c3c3c3;
			font-size: 15px;
			color: #666666;
		}
	}

	.article-bottom {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		box-sizing: border-box;
		height: 44px;
		border-top: 1px solid #d8d8d8;
		background-color: #fff;
		.comment-btn {
			width: 141px;
			height: 23px;
			border: 2px solid #eeeeee;
			font-size: 15px;
			line-height: 23px;
			color: #a7a7a7;
		}
		.van-icon {
			font-size: 20px;
			.van-info {
				font-size: 8px;
				background-color: #e22829;
			}
		}
	}
}
</style>
