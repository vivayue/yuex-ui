import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import toast from "./components/toast/index";
// import paging from "./components/pager";
import "./assets/style/reset.less";
// Vue.use(paging);
Vue.config.productionTip = false;

Vue.use(toast);
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
