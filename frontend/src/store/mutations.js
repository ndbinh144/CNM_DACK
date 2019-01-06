export default {
  getAccount(state, data) {
    localStorage.access_token = data.access_token;
    localStorage.refresh_token = data.refresh_token;
    state.iduser = data.user.IDUSER;
    state.userType = data.user.TYPE;
  },

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