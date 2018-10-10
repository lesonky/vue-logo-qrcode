<template>
    <div class="sjs-logo-qrcode__container"
         :style="containerStyle">
        <img ref="image"
             v-show="done && mode === 'image'"
             alt="qrcode">
        <canvas ref="canvas"
                v-show="done && mode === 'canvas'"
                alt="qrcode"></canvas>
    </div>
</template>

<script>
import QrCodeWithLogo from 'qr-code-with-logo'
import LocalImage from '../assets/logo.png'
const METHOD_MAP = {
    image: 'toImage',
    canvas: 'toCanvas'
}

export default {
    name: 'VueLogoQrcode',
    data() {
        return {
            done: false // 二维码是否已经生成
        }
    },
    props: {
        // 二维码内容
        content: {
            type: String,
            default: ''
        },
        // 二维码图片大小
        width: {
            type: Number,
            defaule: 100
        },
        // logo url
        logoSrc: {
            type: String,
            default: LocalImage
        },
        // logo 的圆角
        logoRadius: {
            type: Number,
            default: 8
        },
        // 是否监听 参数变化
        autoGen: {
            type: Boolean,
            default: false
        },
        // 是否立即显示
        showImmediately: {
            type: Boolean,
            default: true
        },
        mode: {
            type: String,
            default: 'image',
            validator: function (value) {
                // 可选 image canvas
                return ['image', 'canvas'].indexOf(value) !== -1
            }
        }
    },
    computed: {
        containerStyle() {
            return {
                width: this.width + 'px',
                height: this.width + 'px'
            }
        }
    },
    methods: {
        // 生成二维码图片
        genQrCode(options) {
            options = options || this._$getGenOptions();
            QrCodeWithLogo[METHOD_MAP[this.mode]](options).then(() => {
                this.done = true;
            })
        },
        // 通过文件的形式输出
        genQrCodeImageDownload() {
            let options = this._$getGenOptions(true);
            QrCodeWithLogo.toImage(options);
        },
        // 内部方法,添加监听
        _$addWatchs() {
            if (this._$watchs) {
                return;
            } else {
                this._$watchs = Object.keys(this.$options.props).filter(item => !['autoGen', 'showImmediately'].includes(item)).map(item => {
                    this.$watch(item, this.genQrCode);
                })
            }
        },
        // 内部方法,移除监听
        _$removeWatchs() {
            this._$watchs && this._$watchs.forEach(item => item());
            this._$watchs = null;
        },
        // 内部方法,获取配置
        _$getGenOptions(download) {
            let options = {
                image: this.$refs.image,
                canvas: this.$refs.canvas,
                content: this.content,
                width: this.width,
                logo: {
                    src: this.logoSrc,
                    radius: this.logoRadius
                }
            }
            // 配置是否是下载
            download && (options.download = true);
            return options;
        }
    },
    created() {
        // 初始化监听
        if (this.autoGen) {
            this._$addWatchs()
        }
    },
    mounted() {
        // 立即生成
        if (this.content && this.showImmediately) {
            this.genQrCode();
        }
    },
    watch: {
        autoGen(newVal) {
            if (newVal) {
                this._$addWatchs();
            } else {
                _$this.removeWatchs();
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.sjs-logo-qrcode__container {
    display: inline-block;
    vertical-align: baseline;
    canvas {
        height: 100%;
        width: 100%;
    }
    img {
        height: 100%;
        width: 100%;
    }
}
</style>
