<template>
	<div class="article-list">
		<van-pull-refresh
			v-model="isLoading"
			@refresh="onRefresh"
			:success-text="successText"
		>
			<van-list
				v-model="loading"
				:finished="finished"
				finished-text="没有更多了"
				@load="onLoad"
				:error.sync="error"
				error-text="请求失败，点击重新加载"
			>
				<van-cell v-for="item in list" :key="item.art_id">
					<div slot="default" class="list-item">
						<div class="left">
							<div class="text">{{ item.title }}</div>
							<div
								class="img"
								v-if="item.cover.images && item.cover.images.length === 3"
							>
								<img :src="item.cover.images[0]" />
								<img :src="item.cover.images[1]" />
								<img :src="item.cover.images[2]" />
							</div>
							<div class="bottom">
								<span>{{ item.aut_name }}</span>
								<span>{{ item.comm_count }}评论</span>
								<span>{{ item.pubdate | RelativeTime }}</span>
							</div>
						</div>
						<div
							class="right"
							v-if="item.cover.images && item.cover.images.length === 1"
						>
							<img :src="item.cover.images[0]" alt="" />
						</div>
					</div>
				</van-cell>
			</van-list>
		</van-pull-refresh>
	</div>
</template>

<script>
import { getArticleListAPI } from "@/api";
export default {
	name: "ArticleList",
	props: {
		channel: {
			type: Object,
			require: true,
		},
	},
	data() {
		return {
			list: [],
			loading: false,
			finished: false,
			// 上次拿数据的时间戳
			timestamp: null,
			// 控制列表加载失败的提示状态
			error: false,
			// 下拉刷新
			isLoading: false,
			// 刷新成功提示信息
			successText: "刷新成功！",
		};
	},
	methods: {
		// 初始化或滑动到底部时会触发
		async onLoad() {
			try {
				const {
					data: {
						data: { results, pre_timestamp },
					},
				} = await this.getArticleList();
				console.log(results);

				// // 模拟请求失败的情况
				// if (Math.random() < 0.5) {
				// 	throw new Error("请求错误！");
				// }

				this.list.push(...results);
				// 加载结束之后将加载状态设置为结束
				this.loading = false;
				// 判断是否全部加载完成
				if (results.length) {
					// 获取下一页数据的时间戳
					this.timestamp = pre_timestamp;
				} else {
					// 没有数据了
					this.finished = true;
				}
			} catch (error) {
				this.error = true;
				this.loading = false;
				console.log("获取文章详情失败！", error);
			}
		},
		// 获取文章新闻推荐
		async getArticleList() {
			const res = await getArticleListAPI({
				channel_id: this.channel.id,
				timestamp: this.timestamp || +new Date(),
			});
			// console.log(res);
			return res;
		},
		// 下拉刷新
		async onRefresh() {
			try {
				const {
					data: {
						data: { results, pre_timestamp },
					},
				} = await this.getArticleList({
					channel_id: this.channel.id,
					timestamp: +new Date(),
				});
				// console.log(results);
				this.list.unshift(...results);
				this.timestamp = pre_timestamp;
				// console.log("触发下拉刷新！");
				// 关闭下拉刷新 loading 状态
				this.isLoading = false;
			} catch (error) {
				this.successText = "刷新失败！";
				console.log(error);
				this.isLoading = false;
			}
		},
	},
};
</script>

<style lang="less">
.article-list {
	height: calc(200vw - 143px);
	overflow-y: auto;
	.van-list {
		margin-top: 49px;
		.list-item {
			padding: 0;
			margin: 0;
			width: 100%;
			display: flex;
			.left {
				.text {
					font-size: 16px;
				}
				.img {
					display: flex;
					justify-content: space-around;
					width: 100%;
					img {
						width: 111px;
						height: 73px;
						padding: 5px 0;
					}
				}
				.bottom {
					font-size: 12px;
					color: #b4b4b4;
					span {
						padding: 0 5px;
					}
				}
			}
			.right {
				flex: 1;
				img {
					width: 116px;
					height: 73px;
				}
			}
		}
	}
}
</style>
