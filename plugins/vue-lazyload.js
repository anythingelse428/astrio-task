import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

export default (context, inject) => {
  Vue.use(VueLazyload, {
    preLoad: 100,
    error: require('~~/assets/blank.jpg'),
    loading: require('~~/assets/svg/loading.svg'),
    attempt: 3,
    lazyComponent: true,
    observer: true,
    throttleWait: 50
  })
}
