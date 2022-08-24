<!--
 * @Author: Xu Wang
 * @Date: 2022-08-20 01:39:32
 * @LastEditTime: 2022-08-25 00:37:43
 * @LastEditors: Xu Wang
 * @Description: 
-->
<template>
	<div ref="remRef" :style="{ width: widthRem, height: heightRem }">
		<slot></slot>
	</div>
</template>
<script lang="ts" setup name="BigScreenRem">
	import { computed, onMounted, ref } from 'vue'
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
	const remRef = ref()
	const fontSize = ref(192)
	const widthRem = computed(() => {
		return (Number.parseFloat(props.width.toString()) / props.rootValue).toFixed(5) + 'rem'
	})
	const heightRem = computed(() => {
		return (Number.parseFloat(props.height.toString()) / props.rootValue).toFixed(5) + 'rem'
	})
	const reRender = () => {
		const docEl: HTMLElement = document.documentElement
		const screenWidth: number = docEl.clientWidth
		const screenHeight: number = docEl.clientHeight
		if (!screenWidth || !screenHeight) return

		const screenRatio: number = screenWidth / screenHeight
		const screenRatioDesign: number = props.width / props.height

		if (screenRatio > screenRatioDesign) {
			// screenRatio > screenRatioDesign 说明屏幕比较宽 则 高度撑满 左右居中
			console.log('screenRatio > screenRatioDesign 说明屏幕比较宽 则 高度撑满 左右居中')
			// 这边之所以 * screenRatioDesign 是因为 postcss 默认的 rootValue 是 1920 / 10
			// 用高度计算 fontSize 则需要把之前的关系乘上去
			fontSize.value = (screenHeight / 10) * screenRatioDesign
		} else if (screenRatio < screenRatioDesign) {
			// screenRatio < screenRatioDesign 说明屏幕比较长 则宽度撑满 上下居中
			console.log('screenRatio < screenRatioDesign 说明屏幕比较长 则宽度撑满 上下居中')
			fontSize.value = screenWidth / 10
		} else {
			fontSize.value = screenWidth / 10
		}
		document.documentElement.style.fontSize = fontSize.value.toFixed(5) + 'px'
	}
	onMounted(() => {
		reRender()
		window.addEventListener('resize', _.debounce(reRender, 500), false)
		document.addEventListener('DOMContentLoaded', _.debounce(reRender, 500), false)
	})
</script>
