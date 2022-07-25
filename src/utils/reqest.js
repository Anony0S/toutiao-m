// 请求模块
import axios from "axios";

export default request = axios.create({
	// 接口的基准路径
	baseURL: "http://ttapi.research.itcast.cn/"
})

// 请求拦截器

// 响应拦截器