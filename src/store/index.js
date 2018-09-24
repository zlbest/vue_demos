import Vue from 'vue'
import Vuex from 'vuex'
//import mutations from './mutations'
// 在vue中使用vuex插件
Vue.use(Vuex);
const state = {
  count:1,
  header: '测试示例',
  title: '首页'
};
export default new Vuex.Store({
  state
  //mutations,
  //actions,
  //getters
})
