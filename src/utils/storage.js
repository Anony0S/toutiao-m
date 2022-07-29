// 封装本地存储方法

// 存储数据
export const setItem = (key, value) => {
	if (typeof value === "object") {
		value = JSON.stringify(value)
	}
	localStorage.setItem(key, value)
}

// 获取数据
export const getItem = (key) => {
	// 因为取出的值不容易判断类型，所以用一下方法
	const value = localStorage.getItem(key)
	try {
		// 不是 JSON 类型的会转换错误，被 catch 捕捉到
		return JSON.parse(value)
	} catch (error) {
		return value
	}
}

// 删除数据
export const removeItem = key => localStorage.removeItem(key)