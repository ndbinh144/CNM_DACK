export default {
  getListAccountUser(state, data) {
    state.listAccountUser = data.listAccountUser;
    state.lenListAccountUser = data.listAccountUser.length;
  },

  closeAccount(state, data) {
    state.listAccountUser = data;
    state.lenListAccountUser = data.length;
  },

  getListReceiver(state, data) {
    state.listReceiver = data;
  },

  setMessage(state, data) {
    state.messageRequest = data;
  },

  applyEliminate(state, data) {
    state.numAccountEliminate = data;
  },

  getListTransactionHistory(state, data) {
    state.listTransactionHistory = data;
  },

  initMenuUser(state, data) {
    state.menuUser = data;
  }
}