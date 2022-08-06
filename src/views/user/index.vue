<template>
	<div class="user">
		<!-- 头部导航 S -->
		<van-nav-bar
			class="navbar"
			title="个人信息"
			left-arrow
			@click-left="$router.back()"
		></van-nav-bar>
		<!-- 头部导航 E -->

		<!-- 用户信息 S -->
		<van-cell title="头像" is-link>
			<van-image
				round
				width="30px"
				height="30px"
				:src="userProfile.photo"
				fit="cover"
				@click="$refs.file.click()"
			/>
		</van-cell>
		<input
			type="file"
			hidden
			accept=".png, .jpg, .gif"
			ref="file"
			@change="selectPhoto"
		/>
		<!-- 用户信息 E -->

		<!-- 弹出层 -->
		<van-popup
			v-model="isShowAvator"
			closeable
			:style="{ width: '100%', height: '100%' }"
		>
			<UpdataAvator
				@updateAvator="userProfile.photo = $event"
				:photo="photo"
				v-if="isShowAvator"
			></UpdataAvator>
		</van-popup>
	</div>
</template>

<script>
import { getUserProfileAPI } from "@/api";
import UpdataAvator from "./components/UpdateAvator.vue";
import { imgToBase64 } from "@/utils";
export default {
	name: "User",
	components: { UpdataAvator },
	data() {
		return {
			userProfile: {},
			// 是否展示弹层
			isShowAvator: false,
			// 接收图片
			photo: "",
		};
	},
	methods: {
		async getUserProfile() {
			try {
				const { data } = await getUserProfileAPI();
				this.userProfile = data.data;
			} catch (error) {
				this.$toast.fail("获取信息失败，\n请重试");
				console.log(error);
			}
		},
		// 选择文件
		async selectPhoto(e) {
			// TODO: 上传头像
			const file = e.target.files[0];

			// 方法一：
			// const URL = window.URL.createObjectURL(file);

			// 方法二：Base64
			this.photo = await imgToBase64(file);

			// 清空 value， 让用户可以选择同一张图片
			e.target.value = "";
			// 展示弹层
			this.isShowAvator = true;
		},
	},
	created() {
		this.getUserProfile();
	},
};
</script>

<style scoped lang="less">
:deep(.navbar) {
	background-color: #3296fa;
	.van-nav-bar__title {
		color: #fff;
	}
	.van-icon {
		color: #fff;
	}
}
/deep/.van-cell {
	display: flex;
	align-items: center;
}
.van-popup {
	background-color: #000;
}
</style>
