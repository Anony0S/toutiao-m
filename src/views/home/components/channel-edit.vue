<template>
	<div class="channel-edit">
		<!-- 我的频道 -->
		<div class="my-channel">
			<van-cell title="我的频道">
				<van-button
					class="edit-btn"
					slot="right-icon"
					type="danger"
					:plain="true"
					@click="edit"
				>
					{{ closeShow ? "完成" : "编辑" }}
				</van-button>
			</van-cell>
			<van-grid
				class="edit-container"
				:gutter="10"
				:border="false"
				:clickable="true"
			>
				<van-grid-item
					v-for="(item, index) in channelsList"
					:key="item.id"
					@click="clickChannel(item, index)"
				>
					<span
						slot="text"
						class="text"
						:class="{ activeS: channelsList[active].id === item.id }"
						>{{ item.name }}</span
					>
					<van-icon
						slot="icon"
						name="close"
						v-show="closeShow && !fixChannels.includes(item.id)"
					/>
				</van-grid-item>
			</van-grid>
		</div>

		<!-- 推荐频道 -->
		<div class="my-channel">
			<van-cell title="推荐频道" />
			<van-grid
				class="edit-container"
				:gutter="10"
				direction="horizontal"
				:clickable="true"
			>
				<van-grid-item
					icon="plus"
					v-for="item in recommendChannels"
					:key="item.id"
					:text="item.name"
					@click="addChannel(item)"
				/>
			</van-grid>
		</div>
	</div>
</template>

<script>
import { getChannelsAPI } from "@/api";
export default {
	name: "ChannelEdit",
	props: {
		channelsList: {
			type: Array,
			required: true,
		},
		active: {
			type: Number,
			required: true,
		},
	},
	data() {
		return {
			closeShow: false,
			// 所有频道
			allChannels: [],
			// 禁止删除频道
			fixChannels: [0],
		};
	},
	methods: {
		edit() {
			// TODO: 编辑按钮
			this.closeShow = !this.closeShow;
		},
		// 获取所有频道列表
		async getAllchannels() {
			try {
				const { data } = await getChannelsAPI();
				// console.log(data);
				this.allChannels = data.data.channels;
			} catch (error) {
				console.log("获取所有频道列表失败！", error);
			}
		},
		// 添加频道
		addChannel(item) {
			// 使用全局事件总线
			this.$bus.$emit("addChannel", item);
		},
		// 点击频道
		clickChannel(item, index) {
			// 根据编辑状态判断点击还是删除
			if (this.closeShow) {
				// TODO: 删除我的频道
				if (this.fixChannels.includes(index)) return;
				this.$bus.$emit("delChannel", index);
			} else {
				// 跳转页面
				this.$bus.$emit("changeActive", index);
			}
		},
	},
	computed: {
		recommendChannels() {
			// 设置筛选后的数组
			return this.allChannels.filter(
				(channel) => !this.channelsList.find((item) => item.id === channel.id)
			);
		},
	},
	mounted() {
		this.getAllchannels();
	},
};
</script>

<style scpoed lang="less">
.channel-edit {
	position: relative;
	margin-top: 45px;
	// 我的频道
	.my-channel {
		margin-bottom: 20px;
		// 我的频道
		.van-cell {
			margin-bottom: 13px;
			.van-cell__title {
				span {
					font-size: 18px;
					color: #333;
				}
			}
			.edit-btn {
				width: 40px;
				height: 22px;
				font-size: 13px;
				padding: 0;
			}
			&::after {
				border: 0;
			}
		}
		// 关闭小图标
		.van-grid-item__icon-wrapper {
			position: absolute;
			top: -8px;
			right: 2px;
			z-index: 2;
		}
		.activeS {
			color: red;
		}
		// 导航宫格
		.edit-container {
			padding: 0 5px 0 10px;
			.van-grid-item__content {
				padding: 12px 0;
				background-color: #f4f5f6;
				.van-grid-item__icon {
					font-size: 13px;
				}
				.van-grid-item__text,
				.text {
					font-size: 13px;
					margin-left: 2px;
					white-space: nowrap;
				}
			}
		}
	}
}
</style>
