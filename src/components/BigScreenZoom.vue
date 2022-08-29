<!--
 * @Author: Xu Wang
 * @Date: 2022-08-20 01:39:32
 * @LastEditTime: 2022-08-30 00:56:57
 * @LastEditors: Xu Wang
 * @Description: 
-->
<template>
	<div ref="zoomRef" :style="{ width: width + 'px', height: height + 'px' }">
		<slot></slot>
	</div>
</template>
<script lang="ts" setup name="BigScreenZoom">
	import { nextTick, onMounted, ref } from 'vue'
	import _ from 'lodash'
	type Props = {
		width?: number
		height?: number
		rootValue?: number
	}
	const props = withDefaults(defineProps<Props>(), {
		width: 1920,
		height: 1080,
		rootValue: 192
	})
	const zoomRef = ref()
	const reRender = () => {
		const docEl: HTMLElement = document.documentElement
		const screenWidth: number = docEl.clientWidth
		const screenHeight: number = docEl.clientHeight
		if (!screenWidth || !screenHeight) return

		const widthScale = (screenWidth / props.width).toFixed(10)
		const heightScale = (screenHeight / props.height).toFixed(10)
		console.log(widthScale, heightScale)
		const scale = widthScale < heightScale ? widthScale : heightScale

		document.documentElement.style.fontSize = props.rootValue + 'px'
		nextTick(() => {
			zoomRef.value.style.zoom = scale
		})
	}
	onMounted(() => {
		reRender()
		window.addEventListener('resize', _.debounce(reRender, 500), false)
		document.addEventListener('DOMContentLoaded', _.debounce(reRender, 500), false)
	})
</script>
