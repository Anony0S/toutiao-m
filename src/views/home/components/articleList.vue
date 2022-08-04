<template>
	<div class="article-list">
		<van-pull-refresh
			v-model="isLoading"
			@refresh="onLoad"
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
		// 将下拉刷新和上滑刷新整合
		async onLoad() {
			try {
				const {
					data: {
						data: { results, pre_timestamp },
					},
				} = await this.getArticleList();
				if (this.loading) this.list.push(...results);
				else this.list.unshift(...results);
				// 判断是否全部加载完成
				if (pre_timestamp === null) {
					// 没有数据了
					this.finished = true;
				} else {
					// 获取下一页数据的时间戳
					this.timestamp = pre_timestamp;
				}
			} catch (error) {
				this.error = true;
				console.log("获取文章详情失败！", error);
			} finally {
				this.loading = false;
				this.isLoading = false;
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
	},
};
</script>

<style lang="less">
.article-list {
	// 设置高度，避免向下滑动整个body移动影响其他频道位置
	height: calc(100vh - 14.2vh);
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
				display: flex;
				justify-content: right;
				img {
					width: 116px;
					height: 73px;
				}
			}
		}
	}
}
</style>
