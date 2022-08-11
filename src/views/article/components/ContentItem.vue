<template>
	<div class="content-item">
		<div class="left">
			<img :src="comment.aut_photo" />
			<div class="info">
				<div class="top">
					<div class="name">{{ comment.aut_name }}</div>
					<div class="content">{{ comment.content }}</div>
				</div>
				<div class="bottom">
					<span>{{ toNow }}</span>
					<button @click="toDetalis">回复 {{ comment.reply_count }}</button>
				</div>
			</div>
		</div>
		<div class="right">
			{{ comment.like_count }}
			<van-icon
				name="good-job"
				color="#ff9632"
				v-if="comment.is_liking"
				@click="giveLike"
			/>
			<van-icon name="good-job-o" v-else @click="giveLike" />
			赞
		</div>
	</div>
</template>

<script>
import { getCommentsAPI, giveLikeAPI, cancelLikeAPI } from "@/api";
import dayjs from "dayjs";
export default {
	data() {
		return {
			cCommentsList: [],
		};
	},
	props: {
		comment: {
			type: Object,
			required: true,
		},
		// 记录能否被点击
		status: {
			type: Boolean,
			required: true,
		},
	},
	computed: {
		toNow() {
			return dayjs(this.comment.pubdate).fromNow();
		},
	},

	methods: {
		// 获取评论的评论
		async getComments() {
			try {
				const { data } = await getCommentsAPI({
					type: "C",
					source: this.comment.com_id,
				});
				// 输出评论的评论
				this.cCommentsList = data.data.results;
			} catch (error) {
				this.$toast.fail("获取评论失败！");
				console.log(error);
			}
		},
		// 评论详情页
		toDetalis() {
			if (this.status) {
				// 弹出层
				this.$emit("isShow");
				this.$emit("comment", this.comment);
				this.$emit("cCommentsList", this.cCommentsList);
			} else return;
		},
		// 评论点赞
		async giveLike() {
			try {
				if (this.comment.is_liking) {
					await cancelLikeAPI(this.comment.com_id);
					this.$toast.success("取消点赞成功！");
				} else {
					await giveLikeAPI(this.comment.com_id);
					this.$toast.success("点赞成功！");
				}
				this.$emit("giveLike");
			} catch (error) {
				this.$toast.fail("点赞失败！");
				console.log(error);
			}
		},
	},
	mounted() {
		// 获取本评论的评论
		this.getComments();
	},
};
</script>

<style scoped lang="less">
.content-item {
	display: flex;
	justify-content: space-between;
	padding: 0 15px;
	margin: 20px 0px;
	// 左边内容
	.left {
		display: flex;
		img {
			width: 46px;
			height: 46px;
			border-radius: 23px;
			margin-right: 10px;
		}
		.info {
			font-size: 13px;
			.top {
				.name {
					color: blue;
				}
				.content {
					width: 230px;
					min-height: 30px;
					margin-top: 8px;
				}
			}
			.bottom {
				span {
					color: #969799;
					margin-right: 18px;
				}
				button {
					width: 70px;
					height: 23px;
					border: 1px solid #bbbbbb;
					border-radius: 13px;
					background-color: #fff;
				}
			}
		}
	}

	// 右边内容
	.right {
		color: #969799;
		font-size: 13px;
		/deep/.van-icon {
			font-size: 14px;
		}
	}
}
</style>
