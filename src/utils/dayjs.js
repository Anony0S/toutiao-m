// 关于时间的处理
import Vue from "vue";
import dayjs from "dayjs";

// 导入 RelativeTime 插件
import relativeTime from "dayjs/plugin/relativeTime";
// 加载插件
dayjs.extend(relativeTime);

// 加载多语言文件
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn"); // 全局使用

// 注册全局使用的过滤器
Vue.filter("RelativeTime", (value) => dayjs().to(dayjs(value)));
