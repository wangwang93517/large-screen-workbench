
> 基于现目前所做数据可视化项目的不同分辨率兼容需求总结以下适配几种方案供参考。

## 常见的屏幕尺寸：

- 1280 * 720 ： 笔记本
- 1366 * 768 ： 普通液晶显示器
- 1920 * 1080： 高清液晶显示器
- 2560 * 1440： 2K高清显示器
- 4096 * 2160： 4K高清显示器

## rem 方案
> 开发过程中根据设计图标注的数值进行开发，借助 `postcss-pxtorem` 设置 `root` 的 `font-size` 和自动将 `px` 转化为 `rem`

### vue3 事例代码
```html
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
            // console.log('screenRatio > screenRatioDesign 说明屏幕比较宽 则 高度撑满 左右居中')
            // 这边之所以 * screenRatioDesign 是因为 postcss 默认的 rootValue 是 1920 / 10
            // 用高度计算 fontSize 则需要把之前的关系乘上去
            fontSize.value = (screenHeight / 10) * screenRatioDesign
        } else if (screenRatio < screenRatioDesign) {
            // screenRatio < screenRatioDesign 说明屏幕比较长 则宽度撑满 上下居中
            // console.log('screenRatio < screenRatioDesign 说明屏幕比较长 则宽度撑满 上下居中')
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
```
### 效果截图 （红色背景为内容区 黑色背景为整个页面区）
#### 1920 * 1080 在 1280 * 720 上的显示效果
![1920 * 1080 在 1280 * 720 上的显示效果](https://img-blog.csdnimg.cn/8cc31e4cfd664409aa87b49dfd3dcd3c.png#pic_center)
#### 1920 * 1080 在 1366 * 768 上的显示效果
![1920 * 1080 在 1366 * 768 上的显示效果](https://img-blog.csdnimg.cn/e5cb463c95f041d2a4e8ecea2f9cbbca.png#pic_center)
#### 1920 * 1080 在 1920 * 1080 上的显示效果
![1920 * 1080 在 1920 * 1080 上的显示效果](https://img-blog.csdnimg.cn/95cecb2384354359be5a9dafe82a4041.png#pic_center)
#### 1920 * 1080 在 2560 * 1440 上的显示效果
![1920 * 1080 在 2560 * 1440 上的显示效果](https://img-blog.csdnimg.cn/3e688fa961784c398886fd86fcdff8aa.png#pic_center)
#### 1920 * 1080 在 4096 * 2160 上的显示效果
![1920 * 1080 在 4096 * 2160 上的显示效果](https://img-blog.csdnimg.cn/0cc665b44bef4c6798af51b557331a0a.png#pic_center)

## scale 方案
> 开发过程中根据设计图标注的数值进行开发，通过计算实际的宽高比与设计稿的宽高比，从而进行缩放

### vue3 事例代码
```html
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
```
### 效果截图 （红色背景为内容区 黑色背景为整个页面区）
####  1920 * 1080 在 1280 * 720 上的显示效果
![1920 * 1080 在 1280 * 720 上的显示效果](https://img-blog.csdnimg.cn/c95f694f80bf461381a3fd55d1e750b1.png#pic_center)
#### 1920 * 1080 在 1366 * 768 上的显示效果
![1920 * 1080 在 1366 * 768 上的显示效果](https://img-blog.csdnimg.cn/81edf7081fe64c9a94e21b2c1970001d.png#pic_center)
#### 1920 * 1080 在 1920 * 1080 上的显示效果
![1920 * 1080 在 1920 * 1080 上的显示效果](https://img-blog.csdnimg.cn/85e2bd46488e427b8bcb3a62f31237eb.png#pic_center)
#### 1920 * 1080 在 2560 * 1440 上的显示效果
![1920 * 1080 在 2560 * 1440 上的显示效果](https://img-blog.csdnimg.cn/47d7a1778852493595e8b8424d2d0e7e.png#pic_center)
#### 1920 * 1080 在 4096 * 2160 上的显示效果
![1920 * 1080 在 4096 * 2160 上的显示效果](https://img-blog.csdnimg.cn/8c9dc9c835e64b95b193ac2a589981bc.png#pic_center)
## zoom 方案
> 开发过程中根据设计图标注的数值进行开发，通过计算实际的宽高比与设计稿的宽高比，设置 `zoom` 的大小。

### vue3 事例代码
```html
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
```
### 效果截图 （红色背景为内容区 黑色背景为整个页面区）
####  1920 * 1080 在 1280 * 720 上的显示效果
![1920 * 1080 在 1280 * 720 上的显示效果](https://img-blog.csdnimg.cn/7627df4cbb1a43b5ade22ffd788e363b.png#pic_center)
####  1920 * 1080 在 1366 * 768 上的显示效果
![1920 * 1080 在 1366 * 768 上的显示效果](https://img-blog.csdnimg.cn/284707fe631a4ec0bbe644a681ee7962.png#pic_center)
####  1920 * 1080 在 1920 * 1080 上的显示效果
![1920 * 1080 在 1920 * 1080 上的显示效果](https://img-blog.csdnimg.cn/a10742c224254d00ad2371ac97282216.png#pic_center)
#### 1920 * 1080 在 2560 * 1440 上的显示效果
![1920 * 1080 在 2560 * 1440 上的显示效果](https://img-blog.csdnimg.cn/b4d7bab694474e8299684153d1c1d082.png#pic_center)
#### 1920 * 1080 在 4096 * 2160 上的显示效果
![1920 * 1080 在 4096 * 2160 上的显示效果](https://img-blog.csdnimg.cn/4b9c2f54434b4bc299da9748c3dbd19d.png#pic_center)

## 注意事项
- `scale` 进行缩小缩放时候，虽然内容缩小了，但是占用的空间却没有变化。这也就是为什么`1920 * 1080 在 1280 * 720 上的显示效果` 和 `1920 * 1080 在 1366 * 768 上的显示效果` 下方有一块黑色区块的原因
- `zoom` 最初仅在 `Internet Explorer` 中实现。尽管其他一些浏览器也支持该属性，但推荐使用`transform: scale()` 来缩放内容。
- `transform: scale()` 与 `zoom` 的工作方式不同。例如，如果在 `html` 或 `body` 元素上使用`transform: scale(0.6)` ，那么它会调整整个页面的大小，显示一个缩小的页面，周围有巨大的白色边距，而 `zoom: 0.6` 缩放页面上的元素，但不缩放绘制元素的页面本身。

## 参考链接
- [大屏数据可视化——屏幕适配方案(多分辨率下）](https://blog.csdn.net/m0_67401153/article/details/123305112)
- [Can I use zoom](https://caniuse.com/?search=zoom)
