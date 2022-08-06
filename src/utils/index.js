// 封装：选择的图片文件为 base64 并用 promise 管理
export const imgToBase64 = (file) => {
	return new Promise((resolve) => {
		const fr = new FileReader();

		fr.readAsDataURL(file);

		fr.onload = (e) => {
			resolve(e.target.result);
		};
	});
};
