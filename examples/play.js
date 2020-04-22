import Vue from 'vue';
import Element from 'main/index.js';
import ElementExtend from 'main/extend.js';
import App from './play/index.vue';
import 'packages/theme-chalk/src/index.scss';
import 'packages-my/theme-chalk/src/index.scss';

Vue.use(Element);
Vue.use(ElementExtend);

new Vue({ // eslint-disable-line
  render: h => h(App)
}).$mount('#app');
