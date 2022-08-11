<template>
	<div class="content-detalis">
		<!-- 导航栏 -->
		<van-nav-bar title="所有回复" left-arrow @click-left="onClickLeft" fixed />
		<div class="conmtent">
			<ContentItem
				:comment="comment"
				:status="false"
				@giveLike="giveLike1"
			></ContentItem>
			<div class="all"><i></i><span>全部回复</span><i></i></div>
			<ContentItem
				v-for="(comment, index) in cCommentsList"
				:key="index"
				:comment="comment"
				:status="false"
				@giveLike="giveLike(index)"
			></ContentItem>
		</div>
		<div class="bootom" @click="sendComment">发表评论</div>
		<!-- 发表评论弹出层 -->
		<SendComment :show="show" @sendDiacuss="sendDiacuss"></SendComment>
	</div>
</template>

<script>
import ContentItem from "./ContentItem.vue";
import SendComment from "./SendComment.vue";
import { publishCommentAPI } from "@/api";
export default {
	components: { ContentItem, SendComment },
	data() {
		return {
			show: false,
			message: "",
		};
	},
	props: {
		comment: {
			type: Object,
			required: true,
		},
		cCommentsList: {
			type: Array,
			required: true,
		},
	},
	methods: {
		onClickLeft() {
			this.$parent.$parent.isShow = false;
		},
		// 发表评论弹出
		sendComment() {
			this.show = true;
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
					target: this.comment.com_id,
					content: this.message,
					art_id: this.$parent.$parent.articleID,
				});
				this.show = false;
				this.message = "";
				this.$toast.success("发送成功");
				this.$parent.$parent.cCommentsList.unshift(data.data.new_obj);
				this.$parent.$parent.comment.reply_count++;
			} catch (error) {
				console.log(error);
				const { data } = error;
				if (data && data.message) this.$toast.fail(data.message);
				this.$toast.fail("发表评论失败!");
			}
		},
		// 点赞
		giveLike(index) {
			if (this.$parent.$parent.cCommentsList[index].is_liking) {
				this.$parent.$parent.cCommentsList[index].like_count--;
				this.$parent.$parent.cCommentsList[index].is_liking = false;
			} else {
				this.$parent.$parent.cCommentsList[index].like_count++;
				this.$parent.$parent.cCommentsList[index].is_liking = true;
			}
		},
		giveLike1() {
			if (this.$parent.$parent.comment.is_liking) {
				this.$parent.$parent.comment.like_count--;
				this.$parent.$parent.comment.is_liking = false;
			} else {
				this.$parent.$parent.comment.like_count++;
				this.$parent.$parent.comment.is_liking = true;
			}
		},
	},
};
</script>

<style scoped lang="less">
.content-detalis {
	/deep/.van-nav-bar {
		margin-bottom: 15px;
		.van-icon {
			color: #3789fa !important;
		}
	}
	.all {
		display: flex;
		color: #999;
		i {
			display: block;
			flex: 1;
			height: 0;
			border-bottom: 1px solid rgb(235, 235, 235);
			margin-top: 11px;
		}
		span {
			padding: 0 5px;
		}
	}
	.bootom {
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		border-top: 1px solid rgb(232, 232, 232);
		border-image: linear-gradient(to right, #fff, #a7a7a7, #fff) 1;
		text-align: center;
		line-height: 45px;
	}
	// 内容区域
	.conmtent {
		margin: 46px 0;
		padding: 15px 0;
	}
}
</style>
