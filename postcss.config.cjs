/*
 * @Author: Xu Wang
 * @Date: 2022-08-20 01:44:38
 * @LastEditTime: 2022-08-20 02:11:13
 * @LastEditors: Xu Wang
 * @Description:
 */
module.exports = {
	plugins: {
		tailwindcss: {},
		autoprefixer: {
			overrideBrowserslist: [
				'last 5 versions' // 所有主流浏览器最近10版本用
			],
			grid: true
		}
		// 'postcss-pxtorem': {
		// 	// rootValue: 192,
		// 	// unitPrecision: 5,
		// 	// propList: ['*'], // 需要被转换的属性
		// 	// exclude: /node_modules/i
		// }
	}
}
