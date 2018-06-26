import Vue from 'vue';
import App from './App.vue';
import VueTouch from 'vue-touch';
import './registerServiceWorker';

VueTouch.config.press = {
  time: 44,
  threshold: 1000
};

Vue.use(VueTouch);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
