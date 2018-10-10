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
import vueLogoQrcode from './lib';
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
