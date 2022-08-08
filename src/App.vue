<template>
	<div>
		<transition
			appear
			name="animate__animated animate__bounce"
			:enter-active-class="`animate__${right} animate__faster`"
			:leave-active-class="`animate__${left} animate__faster`"
		>
			<router-view class="routee"></router-view>
		</transition>
	</div>
</template>

<script>
export default {
	name: "App",
	data() {
		return {
			right: "fadeInRight",
			left: "fadeOutLeft",
		};
	},
	watch: {
		$route(to, from) {
			if (to.meta.index > from.meta.index) {
				this.right = "fadeInRight";
				this.left = "fadeOutLeft";
			} else {
				this.right = "fadeInLeft";
				this.left = "fadeOutRight";
			}
		},
	},
};
</script>

<style lang="less">
.routee {
	position: absolute;
	width: 100%;
	height: 100%;
}
</style>
