<template>
	<div class="update-avator">
		<img :src="photo" ref="image" />
		<div class="click">
			<span @click="$parent.$parent.isShowAvator = false">取消</span>
			<span @click="uploadAvator">完成</span>
		</div>
	</div>
</template>

<script>
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import { updateAvatorAPI } from "@/api";
export default {
	props: {
		photo: {
			type: String,
			required: true,
		},
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.myCropper = new Cropper(this.$refs.image, {
				viewMode: 1,
				dragMode: "none",
				initialAspectRatio: 1,
				aspectRatio: 1,
				preview: ".before",
				background: false,
				autoCropArea: 0.6,
				zoomOnWheel: false,
			});
		},
		// 上传头像
		uploadAvator() {
			// 获取裁剪后的flie对象
			this.myCropper.getCroppedCanvas().toBlob(async (blob) => {
				this.$toast.loading({
					message: "请稍后...",
					duration: 0,
					forbidClick: true,
				});
				try {
					// 发送请求
					const { data } = await updateAvatorAPI(blob);
					this.$emit("updateAvator", data.data.photo);
					this.$toast.success("图片上传成功!");
				} catch (error) {
					this.$toast.fail("上传头像失败!");
					console.log(error);
				} finally {
					this.$parent.$parent.isShowAvator = false;
				}
			});
		},
	},
};
</script>

<style scoped lang="less">
.update-avator {
	width: 100%;
	height: 100%;
	position: relative;
	img {
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		width: 100%;
		height: 65%;
	}
	.click {
		position: fixed;
		display: flex;
		justify-content: space-between;
		width: 100%;
		bottom: 0;
		left: 0;
		color: #fff;
		padding: 0 10px 10px;
	}
}
</style>
