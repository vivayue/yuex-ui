import Vue from 'vue'
import pager from './paging.vue'
const Components = {
  pager
}

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name])
})

export default Components