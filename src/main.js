import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// bus
import VueBus from "vue-bus";
Vue.use(VueBus);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
