<!--
 * @Author: Xu Wang
 * @Date: 2022-08-20 01:39:32
 * @LastEditTime: 2022-08-24 23:00:48
 * @LastEditors: Xu Wang
 * @Description: 
-->
<template>
	<div ref="scaleRef" class="scale bg-red-700 text-white text-xl flex justify-center items-center flex-col">
		<div>SCALE</div>
		<div>1920 * 1080</div>
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

		document.documentElement.style.fontSize = '192px'
		scaleRef.value.style.transform = `scale(${scale})`
		scaleRef.value.style.transformOrigin = 'left top'
		if (widthScale > heightScale) {
			document.body.style.marginLeft = (width - 1920 * Number(scale)) / 2 + 'px'
		} else {
			document.body.style.marginTop = (height - 1080 * Number(scale)) / 2 + 'px'
		}
		document.body.style.marginLeft = (width - 1920 * Number(scale)) / 2 + 'px'
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
