<!--
 * @Author: Xu Wang
 * @Date: 2022-08-20 01:39:32
 * @LastEditTime: 2022-08-30 01:08:46
 * @LastEditors: Xu Wang
 * @Description: 
-->
<template>
	<div ref="scaleRef" :style="{ width: width + 'px', height: height + 'px' }">
		<slot></slot>
	</div>
</template>
<script lang="ts" setup name="BigScreenScale">
	import { onMounted, ref } from 'vue'
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
	const scaleRef = ref()

	const reRender = () => {
		const docEl: HTMLElement = document.documentElement
		const screenWidth: number = docEl.clientWidth
		const screenHeight: number = docEl.clientHeight
		if (!screenWidth || !screenHeight) return

		const widthScale = (screenWidth / props.width).toFixed(10)
		const heightScale = (screenHeight / props.height).toFixed(10)
		const scale = widthScale < heightScale ? widthScale : heightScale

		document.documentElement.style.fontSize = props.rootValue + 'px'
		scaleRef.value.style.transform = `scale(${scale})`
		scaleRef.value.style.transformOrigin = 'left top'
		console.log(props.width * Number(scale))
		console.log(props.height * Number(scale))
		if (widthScale > heightScale) {
			scaleRef.value.style.marginLeft = (screenWidth - Number.parseInt((props.width * Number(scale)).toFixed(2))) / 2 + 'px'
		} else {
			scaleRef.value.style.marginTop = (screenHeight - Number.parseInt((props.height * Number(scale)).toFixed(2))) / 2 + 'px'
		}
		scaleRef.value.style.marginLeft = (screenWidth - Number.parseInt((props.width * Number(scale)).toFixed(2))) / 2 + 'px'
	}
	onMounted(() => {
		reRender()
		window.addEventListener('resize', _.debounce(reRender, 500), false)
		document.addEventListener('DOMContentLoaded', _.debounce(reRender, 500), false)
	})
</script>
