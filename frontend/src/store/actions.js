import axios from 'axios';
var url = 'http://localhost:3000/api/';

export default {
  getListAccountUser({
    commit
  }, iduser) {
    var urls = url + 'account/' + iduser;
    axios.get(urls).then(rs => {
      var result = {
        listAccountUser: rs.data
      }
      commit('getListAccountUser', result);
    })
  },

  closeAccount({
    commit
  }, info) {
    var urlsDelete = url + 'account/' + info.accountNum;
    axios.delete(urlsDelete).then(rs => {
      if (rs.data.status === 1) {
        var urlsGet = url + 'account/' + info.iduser;
        axios.get(urlsGet).then(rs2 => {
          commit('closeAccount', rs2.data);
        })
      } else {
        var result = {
          status: rs.data.status,
          messageRequest: rs.data.messageRequest
        }
        commit('closeAccount', result);
      }
    })
  },

  getListTransactionHistory({commit}, numAcc) {
    var urls = url + 'transaction/' + numAcc;
    if (numAcc != "") {
      axios.get(urls).then(rs => {
        commit('getListTransactionHistory', rs.data);
      })
    }
  },

  getListReceiver({commit}, iduser) {
    var urls = url + 'receiver/' + iduser;
    axios.get(urls)
    .then(rs => {
      commit('getListReceiver', rs.data);
    })
  },

  setMessage({commit}, msg) {
    commit('setMessage', msg);
  },

  applyEliminate({commit}, numAcc) {
    commit('applyEliminate', numAcc);
  }
}