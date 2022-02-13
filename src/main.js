import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import {router} from  './router/index.js'
import { library } from '@fortawesome/fontawesome-svg-core'; 
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(
  fas,
  far,
  fab
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false

export const mofaApiInfo = {
   requestUrl : "http://apis.data.go.kr/1262000/",
   serviceKey : "serviceKey=dZzpRZXHtwvV1EXFqZd2pMdafCSAEzE%2Bze5XLaWmhL401G2v3rR%2FQViVia3LNGnTHHmiB2VLQz03b8kO5i9ZNg%3D%3D",
} 

new Vue({
  router,
  axios,
  render: h => h(App),
}).$mount('#app')
