export default {
  displayTransfersAccount(state) {
    state.listAccountTransfers = [];
    var len = state.lenListAccountUser;
    for (var i = 0; i < len; ++i) {
      if (state.listAccountUser[i].NUMBERACCOUNT != state.numAccountEliminate) {
        state.listAccountTransfers = [
          ...state.listAccountTransfers,
          state.listAccountUser[i]
        ]
      }
    }
    return state.listAccountTransfers;
  }
}