<!--
 * @Author: Xu Wang
 * @Date: 2022-08-20 01:39:32
 * @LastEditTime: 2022-08-20 13:41:41
 * @LastEditors: Xu Wang
 * @Description: 
-->
<template>
	<div class="absolute left-0 top-0 right-0 bottom-0 w-full h-full flex justify-center items-center bg-white">
		<div ref="scaleRef" class="scale bg-red-700 text-white text-xl flex justify-center items-center flex-col">
			<div>SCALE</div>
			<div>1920 * 1080</div>
		</div>
	</div>
</template>
<script lang="ts" setup name="DemoScale">
	import { onMounted, ref } from 'vue'
	import _ from 'lodash'

	const scaleRef = ref()
	const setHtmlScale = () => {
		const docEl: HTMLElement = document.documentElement
		const width: number = docEl.clientWidth
		const height: number = docEl.clientHeight
		if (!width || !height) return

		const widthScale = (width / 1920).toFixed(10)
		const heightScale = (height / 1080).toFixed(10)
		const scale = widthScale < heightScale ? widthScale : heightScale
		// document.body.style.zoom = scale
		console.log('scale setHtmlFontSize')
		// Zoom 方式
		document.documentElement.style.fontSize = '192px'
		document.body.style.cssText = 'zoom:' + scale + ''
		// scaleRef.value.style.transform = `scale(${scale}) translateX(-50%)`
		// scaleRef.value.style.transformOrigin = 'left top'
	}
	onMounted(() => {
		setHtmlScale()
		window.addEventListener('resize', _.debounce(setHtmlScale, 500))
	})
</script>
<style scoped lang="less">
	.scale {
		width: 1920px;
		height: 1080px;
	}
</style>
