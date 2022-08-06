<template>
	<div class="change-nick">
		<van-popup
			class="popup-nick"
			:style="{ height: '100%', width: '100%' }"
			v-model="showNick"
			@open="open"
		>
			<!-- 导航组件 -->
			<van-nav-bar
				title="更新昵称"
				left-text="取消"
				right-text="保存"
				left-arrow
				@click-left="onClickLeft"
				@click-right="onClickRight"
			/>
			<!-- 输入信息组件 -->
			<van-field
				v-model="newNickName"
				rows="2"
				autosize
				type="textarea"
				maxlength="11"
				placeholder="请输入昵称"
				show-word-limit
			/>
		</van-popup>
	</div>
</template>

<script>
import { changeProfileAPI } from "@/api";
export default {
	data() {
		return {
			newNickName: "",
			showNick: false,
		};
	},
	props: {
		nickName: {
			// type: [String, Number],
			required: true,
		},
		isShowNick: {
			type: Boolean,
			required: true,
		},
	},
	watch: {
		isShowNick(val) {
			this.showNick = val;
		},
	},
	methods: {
		onClickLeft() {
			this.$parent.isShowNick = false;
		},
		async onClickRight() {
			// 更新信息
			this.$toast.loading({
				message: "更新中...",
				forbidClick: true,
				duration: 0,
				closeOnClickOverlay: true,
			});
			try {
				await changeProfileAPI({
					name: this.newNickName,
				});
				this.$parent.userProfile.name = this.newNickName;
				this.$parent.isShowNick = false;
				this.$toast.success("更新成功！");
			} catch (error) {
				this.$toast.fail("更新昵称失败");
				console.log(error);
			}
		},
		open() {
			this.newNickName = this.nickName;
		},
	},
};
</script>

<style></style>
