<template>
	<div class="change-birthday">
		<van-popup
			v-model="isShow"
			position="bottom"
			:style="{ height: '45%' }"
			@close="close"
			@open="open"
		>
			<van-datetime-picker
				v-model="currentDate"
				type="date"
				title="选择年月日"
				:min-date="minDate"
				:max-date="maxDate"
				@cancel="close"
				@confirm="confirm"
			/>
		</van-popup>
	</div>
</template>

<script>
import { changeProfileAPI } from "@/api";
import dayjs from "dayjs";
export default {
	props: {
		isShowBirthday: {
			type: Boolean,
			required: true,
		},
		birthday: {
			required: true,
		},
	},
	data() {
		return {
			minDate: new Date(1900, 0, 1),
			maxDate: new Date(),
			currentDate: "",
			isShow: false,
		};
	},
	watch: {
		isShowBirthday(val) {
			this.isShow = val;
		},
	},
	methods: {
		open() {
			this.currentDate = new Date(this.birthday);
		},
		close() {
			this.$parent.isShowBirthday = false;
		},
		async confirm() {
			this.$toast.loading({
				message: "请稍后...",
				overlay: true,
				forbidClick: true,
				duration: 0,
			});
			try {
				const currentDate = dayjs(this.currentDate).format("YYYY-M-D");
				await changeProfileAPI({
					birthday: currentDate,
				});
				this.$parent.userProfile.birthday = currentDate;
				this.$parent.isShowBirthday = false;
				this.$toast.success("修改成功！");
			} catch (error) {
				this.$toast.fail("修改失败！");
				console.log(error);
			}
		},
	},
};
</script>

<style></style>
