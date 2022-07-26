import Vue from 'vue'
import App from './App.vue'

// 加载全局样式文件、
import "./styles/index.less"
// 加载字体图标样式
import "./styles/iconfont/iconfont.css"

// 导入路由
import router from './router'

// 导入 Vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);



Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
