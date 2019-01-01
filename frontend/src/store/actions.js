import axios from 'axios';
var url = 'http://localhost:3000/api/';

export default {
  getListAccountUser({
    commit
  }, iduser) {
    var urls = url + 'account/' + iduser;
    axios.get(urls).then(rs => {
      commit('getListAccountUser', rs.data.listAccountUser);
    })
  }
}