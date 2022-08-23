<!--
 * @Author: Xu Wang
 * @Date: 2022-08-20 01:39:32
 * @LastEditTime: 2022-08-20 13:31:19
 * @LastEditors: Xu Wang
 * @Description: 
-->
<template>
	<div class="absolute left-0 top-0 right-0 bottom-0 w-full h-full flex justify-center items-center bg-white">
		<div class="rem bg-red-700 text-white text-xl flex justify-center items-center flex-col">
			<div>REM</div>
			<div>1920 * 1080</div>
		</div>
	</div>
</template>
<script lang="ts" setup name="DemoRem">
	import { onMounted } from 'vue'
	import _ from 'lodash'

	const setHtmlFontSize = () => {
		const docEl: HTMLElement = document.documentElement
		const width: number = docEl.clientWidth
		const height: number = docEl.clientHeight
		if (!width || !height) return

		const screenRatio: number = width / height
		const screenRatioDesign: number = 16 / 9

		let fontSize = null
		if (screenRatio > screenRatioDesign) {
			// screenRatio > screenRatioDesign 说明屏幕比较宽 则 高度撑满 左右居中
			console.log('screenRatio > screenRatioDesign 说明屏幕比较宽 则 高度撑满 左右居中')
			// 这边之所以 * screenRatioDesign 是因为 postcss 默认的 rootValue 是 1920 / 10
			// 用高度计算 fontSize 则需要把之前的关系乘上去
			fontSize = (height / 10) * screenRatioDesign
		} else if (screenRatio < screenRatioDesign) {
			// screenRatio < screenRatioDesign 说明屏幕比较长 则宽度撑满 上下居中
			console.log('screenRatio < screenRatioDesign 说明屏幕比较长 则宽度撑满 上下居中')
			fontSize = width / 10
		} else {
			fontSize = width / 10
		}
		console.log('Rem setHtmlFontSize')
		document.documentElement.style.fontSize = fontSize.toFixed(5) + 'px'
	}
	onMounted(() => {
		setHtmlFontSize()
		window.addEventListener('resize', _.debounce(setHtmlFontSize, 500))
	})
</script>
<style scoped lang="less">
	.rem {
		width: 1920px;
		height: 1080px;
	}
</style>
