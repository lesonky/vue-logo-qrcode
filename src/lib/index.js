import vueLogoQrcode from './vue-logo-qrcode';

vueLogoQrcode.install = (Vue ,options) => {
  Vue.component(vueLogoQrcode.name,vueLogoQrcode);
}

export default vueLogoQrcode;