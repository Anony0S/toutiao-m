// 请求模块
import axios from "axios";

export const request =  axios.create({
	// 接口的基准路径
	// baseURL: "http://ttapi.research.itcast.cn/"
	// baseURL: "http://toutiao.itheima.net/"
	// baseURL: "http://liufusong.top:7001"
	// baseURL: "http://liufusong.top:8000"
	baseURL: "http://toutiao.itheima.net"
})

// 请求拦截器

// 响应拦截器 