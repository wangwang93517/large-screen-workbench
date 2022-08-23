/*
 * @Author: Xu Wang
 * @Date: 2022-08-20 01:08:57
 * @LastEditTime: 2022-08-20 03:17:43
 * @LastEditors: Xu Wang
 * @Description:
 */
/// <reference types="vite/client" />

declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	const component: DefineComponent<{}, {}, any>
	export default component
}
declare module 'lodash'
