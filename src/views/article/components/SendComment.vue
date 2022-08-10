<template>
	<div class="send-comment">
		<!-- 弹出层 -->
		<van-popup
			v-model="isShow"
			position="bottom"
			:style="{ height: '23%' }"
			@close="close"
		>
			<van-field
				v-model="message"
				rows="2"
				:autosize="true"
				type="textarea"
				maxlength="50"
				placeholder="请输入留言"
				show-word-limit
				:border="true"
			>
				<van-button
					type="primary"
					slot="extra"
					size="small"
					plain
					hairline
					:disabled="!message"
					@click="sendComment"
				>
					发布
				</van-button>
			</van-field>
		</van-popup>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isShow: false,
			message: "",
		};
	},
	props: {
		show: {
			type: Boolean,
			required: true,
		},
	},
	methods: {
		// 关闭弹窗
		close() {
			this.$parent.show = this.isShow;
			this.message = "";
		},
		// 发送评论
		sendComment() {
			this.$parent.message = this.message;
			this.$emit("sendDiacuss");
		},
	},
	watch: {
		show(val) {
			this.isShow = val;
		},
	},
};
</script>

<style scoped lang="less">
.send-comment {
	/deep/.van-field {
		display: flex;
		align-items: center;
		.van-field__body {
			display: flex;
			align-items: flex-start;
			background-color: #f5f7f9;
			height: 88px;
			margin-top: 10px;
			padding: 5px 8px;
			.van-field__control {
				height: 88px;
			}
		}
		button {
			margin-left: 10px;
		}
	}
}
</style>
