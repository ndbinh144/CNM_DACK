export default {
  getListAccountUser(state, data) {
    state.listAccountUser = data;
    state.lenListAccountUser = data.length;
  }
}