<template>
	<div class="change-gender">
		<van-popup
			v-model="isShow"
			position="bottom"
			:style="{ height: '45%' }"
			@close="close"
		>
			<van-picker
				title="更新性别"
				show-toolbar
				:default-index="gender"
				:columns="columns"
				@confirm="onConfirm"
				@cancel="onCancel"
			/>
		</van-popup>
	</div>
</template>

<script>
import { changeProfileAPI } from "@/api";
export default {
	data() {
		return {
			isShow: false,
			columns: ["男", "女"],
		};
	},
	props: {
		isShowGender: {
			type: Boolean,
			required: true,
		},
		gender: {
			required: true,
		},
	},
	watch: {
		isShowGender(val) {
			this.isShow = val;
		},
	},
	methods: {
		close() {
			this.$parent.isShowGender = false;
		},
		async onConfirm(value, index) {
			this.$toast.loading({
				message: "请稍后...",
				overlay: true,
				forbidClick: true,
				duration: 0,
			});
			try {
				await changeProfileAPI({
					gender: index,
				});
				this.$parent.userProfile.gender = index;
				this.$toast.success("修改成功！");
				this.$parent.isShowGender = false;
			} catch (error) {
				this.$toast.fail("更改性别失败！");
				console.log(error);
			}
		},
		onCancel() {
			this.$parent.isShowGender = false;
		},
	},
};
</script>

<style></style>
