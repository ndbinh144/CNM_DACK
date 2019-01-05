export default {
  getListAccountUser(state, data) {
    state.listAccountUser = data.listAccountUser;
    state.lenListAccountUser = data.listAccountUser.length;
  },

  closeAccount(state, data) {
    if (data.status === 1) {
      state.listAccountUser = data.listAccountUser;
      state.lenListAccountUser = data.listAccountUser.length;
      state.messageRequest = data.messageRequest;
    } else {
      state.messageRequest = data.messageRequest;
    }
  },

  setMessage(state, data) {
    state.messageRequest = data;
  },

  applyEliminate(state, data) {
    state.numAccountEliminate = data;
  },

  getListTransactionHistory(state, data) {
    state.listTransactionHistory = data;
  }
}