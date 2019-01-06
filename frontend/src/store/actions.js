import axios from 'axios';
var url = 'http://localhost:3000/api/';

export default {
  getAccount({
    commit
  }, account) {
    return new Promise((resolve, reject) => {
      const urls = url + 'user/login';
      axios.post(urls, account).then(rs => {
        commit('getAccount', rs.data);
        resolve(rs.data);
      }).catch(err => {
        reject(err);
      })
    })
  },
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

  getListTransactionHistory({
    commit
  }, numAcc) {
    var urls = url + 'transaction/' + numAcc;
    if (numAcc != "") {
      axios.get(urls).then(rs => {
        commit('getListTransactionHistory', rs.data);
      })
    }
  },

  getListReceiver({
    commit
  }, iduser) {
    var urls = url + 'receiver/' + iduser;
    axios.get(urls)
      .then(rs => {
        commit('getListReceiver', rs.data);
      })
  },

  setMessage({
    commit
  }, msg) {
    commit('setMessage', msg);
  },

  applyEliminate({
    commit
  }, numAcc) {
    commit('applyEliminate', numAcc);
  },

  initMenuUser({commit}, iduser) {
    var menu = [
      {
        name: "Quản lý tài khoản thanh toán",
        ref: "/listaccount"
      },
      {
        name: "Chuyển khoản nội bộ",
        ref: "/transfers"
      },
      {
        name: "Thiết lập danh sách người nhận",
        ref: "/listreceiver/" + iduser  
      }
    ]
    commit('initMenuUser', menu);
  },
}