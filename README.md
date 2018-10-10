# vue-logo-qrcode

> - 一个用于生成带 logo 的 二维码的 vue 组件
> - 基于 [qr-code-with-logo](https://github.com/HerbLuo/qr-code-with-logo) 封装
> - 提供了几个主要的方法封装,如果不能满足定制需求,可以直接使用[qr-code-with-logo](https://github.com/HerbLuo/qr-code-with-logo)参考本插件代码进行自己封装
> - 后期会加入全参数定制,以及示例页面

## 安装

```bash
npm install @njshaoshao/vue-logo-qrcode
```

## 使用示例

```html
<template>
    <div id="app">
        <vueLogoQrcode ref="qrcode"
                       :content="content"
                       :width="width"
                       :autoGen="true"
                       @click.native="downloadImage"></vueLogoQrcode>
    </div>
</template>

<script>
import vueLogoQrcode from '@njshaoshao/vue-logo-qrcode';
export default {
    name: 'app',
    components: { vueLogoQrcode },
    data() {
        return {
            content: "shaojiasong",
            width: 200
        }
    },
    methods: {
        downloadImage() {
            this.$refs.qrcode.genQrCodeImageDownload();
        }
    }
}
</script>

<style lang="scss">
</style>
```

## 参数介绍
| 参数            | 说明                    | 默认值        |
| --------------- | ----------------------- | ------------- |
| content         | 二维码内容              | ''            |
| width           | 二维码图片大小          | 100           |
| logoSrc         | logo url (跨域会有问题) | 一个vue的logo |
| logoRadius      | logo 的圆角             | 8             |
| autoGen         | 是否监听 参数变化       | false         |
| showImmediately | 是否立即显示            | true          |
| mode            | image/canvas 选择       | image         |

## 方法介绍
| 方法名                 | 说明           |
| ---------------------- | -------------- |
| genQrCode              | 生成二维码     |
| genQrCodeImageDownload | 下载二维码图片 |

## 开发进度
- [x] 基础功能
- [ ] 高级定制
- [ ] 示例代码
- [ ] 在线demo

## 本地运行(fork下来自己玩)

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
