import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: 'cuongtnz',
    list_Menu: [
      {
        id: 1,
        menuName: "Chuyển khoản"
      },
      {
        id: 2,
        menuName: "Xem lịch sử giao dịch"
      },
      {
        id: 2,
        menuName: "Đóng tài khoản"
      }
    ]
  },
  mutations: {

  },
  actions: {

  }
})
