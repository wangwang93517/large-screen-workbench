/*
 * @Author: Xu Wang
 * @Date: 2022-08-20 01:08:57
 * @LastEditTime: 2022-08-20 02:06:19
 * @LastEditors: Xu Wang
 * @Description:
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	css: {
		// css预处理器
		preprocessorOptions: {
			less: {
				charset: false
				// additionalData: '@import "./src/assets/style/global.less";'
			}
		}
	}
})
