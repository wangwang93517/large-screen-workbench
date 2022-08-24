<!--
 * @Author: Xu Wang
 * @Date: 2022-08-20 01:08:57
 * @LastEditTime: 2022-08-25 00:44:13
 * @LastEditors: Xu Wang
 * @Description: 
-->
<script setup lang="ts">
	import { ref } from 'vue'
	import BigScreenRem from './components/BigScreenRem.vue'
	import BigScreenScale from './components/BigScreenScale.vue'
	import BigScreenZoom from './components/BigScreenZoom.vue'
	const type = ref('zoom')
</script>

<template>
	<div class="animate__animated animate__zoomIn">
		<BigScreenRem v-if="type == 'rem'" :width="1920" :height="1080" :root-value="192" class="bg-red-700 text-white text-xl flex justify-center items-center flex-col text-center mx-auto my-0">
			<div>REM</div>
			<div>1920 * 1080</div>
		</BigScreenRem>

		<BigScreenScale v-else-if="type == 'scale'" :width="1920" :height="1080" :root-value="192" class="bg-red-700 text-white text-xl flex justify-center items-center flex-col text-center mx-auto my-0">
			<div>SCALE</div>
			<div>1920 * 1080</div>
		</BigScreenScale>

		<BigScreenZoom v-else-if="type == 'zoom'" :width="1920" :height="1080" :root-value="192" class="bg-red-700 text-white text-xl flex justify-center items-center flex-col text-center mx-auto my-0">
			<div>ZOOM</div>
			<div>1920 * 1080</div>
		</BigScreenZoom>
	</div>
</template>
<style lang="less" scoped>
	.animate__animated {
		animation-duration: 1s;
		animation-fill-mode: both;
	}

	.animate__zoomIn {
		animation-name: zoomIn;
		animation-timing-function: ease-in-out;
	}
	@keyframes zoomIn {
		from {
			opacity: 0;
			-webkit-transform: scale3d(0.3, 0.3, 0.3);
			transform: scale3d(0.3, 0.3, 0.3);
		}

		50% {
			opacity: 1;
		}
	}
</style>
