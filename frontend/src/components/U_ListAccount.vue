<template>
  <div>
    <h2 class="title">DANH SÁCH TÀI KHOẢN THANH TOÁN</h2>
    <label class="notice" :style="{ display: isDisplayMsg, color: colorMsg }">{{ Message }}</label>
    <table class="table" id="tableHead">
      <thead>
        <tr>
          <th class="column1 btn-info">STT</th>
          <th class="column2 btn-info">Số tài khoản</th>
          <th class="column2 btn-info">Số dư hiện tại</th>
          <th class="column2 btn-info">Xem lịch sử giao dịch</th>
          <th class="cloumn2 btn-info">Đóng tài khoản</th>
        </tr>
      </thead>
    </table>
    <div class="rollTable">
      <table class="table" id="tableBody">
        <tbody>
          <tr v-for="(account, index) in listAccountUser" :key="index">
            <td class="column1">{{ index + 1 }}</td>
            <td class="column2">{{ account.NUMBERACCOUNT }}</td>
            <td class="column2">{{ account.BALANCE }}</td>
            <td class="column2">
              <button class="btn btn-info" @click="viewHistory(account.NUMBERACCOUNT)">Xem</button>
            </td>
            <td class="column2">
              <button
                class="btn btn-warning"
                @click="closeAccount(account.NUMBERACCOUNT, account.BALANCE)"
              >Đóng</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Modal Component -->
    <b-modal ref="myModalRef" hide-footer title="Vui lòng chọn tài khoản để chuyển số dư" size="lg">
      <div class="d-block text-center">
        <table class="table" id="tableHead">
          <thead>
            <tr>
              <th class="column1 btn-info">STT</th>
              <th class="column4 btn-info">Số tài khoản</th>
              <th class="column4 btn-info">Số dư</th>
            </tr>
          </thead>
        </table>
        <div class="rollTable">
          <table class="table">
            <tbody>
              <tr
                v-for="(account, index) in listAccountTransfers"
                :key="index"
                @click="chooseAccTransfer(account.NUMBERACCOUNT)"
              >
                <td class="column1">{{ index + 1 }}</td>
                <td class="column4">{{ account.NUMBERACCOUNT }}</td>
                <td class="column4">{{ account.BALANCE }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">Đóng</b-btn>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";
export default {
  computed: {
    listAccountUser() {
      return this.$store.state.listAccountUser;
    },
    listAccountTransfers() {
      return this.$store.getters.displayTransfersAccount;
    },
    iduser() {
      return this.$store.state.iduser;
    },
    numAccountEliminate() {
      return this.$store.state.numAccountEliminate;
    },
    lenListAccountUser() {
      return this.$store.state.lenListAccountUser;
    },
    messageRequest() {
      return this.$store.state.messageRequest;
    }
  },
  data() {
    return {
      Message: "",
      colorMsg: "red",
      isDisplayMsg: "none",
      ColorMsg: "blue",
      url: "http://localhost:3000/api/",
      indexActive: 0,
      balanceDelete: ""
    };
  },
  methods: {
    ...mapActions(["getListAccountUser"]),
    closeAccount(accountNum, balance) {
      var self = this;
      self.$dialog.confirm({
        message: "Đóng tài khoản này ?",
        onConfirm: () => {
          self.ColorMsg = "blue";
          self.balanceDelete = balance;
          if (self.lenListAccountUser > 1) {
            // Kiểm tra số dư có lớn hơn 0
            var urls = self.url + "account/checkbalance";
            axios
              .post(urls, {
                accountnumber: accountNum
              })
              .then(rs => {
                if (rs.data.status === 2) {
                  // Tài khoản hết tiền
                  var info = {
                    accountNum: accountNum,
                    iduser: self.iduser
                  };
                  self.$store.dispatch("closeAccount", info);
                  self.displayMessage("Đóng thành công tài khoản", "blue");
                } else if (rs.data.status === 1) {
                  // Tài khoản còn số dư
                  self.$store.dispatch("applyEliminate", accountNum);
                  self.displayModal();
                }
              });
          } else {
            self.displayMessage("Phải duy trì ít nhất một tài khoản", "red");
          }
        }
      });
    },
    viewHistory(accountNum) {
      var self = this;
      self.$router.push("/viewhistory/" + accountNum);
    },

    chooseAccTransfer(numAccChoosed) {
      var self = this;
      var numAccSource = self.$store.state.numAccountEliminate;
      var urls = self.url + "transaction";
      axios
        .post(urls, {
          accSource: numAccSource,
          accDestiny: numAccChoosed,
          amount: self.balanceDelete,
          content: ""
        })
        .then(rs => {
          if (rs.data.status === 1) {
            self.displayMessage(
              "Chuyển khoản và đóng thành công tài khoản",
              "blue"
            );
            var info = {
              accountNum: numAccSource,
              iduser: self.iduser
            };
            self.$store.dispatch("closeAccount", info);
            self.getListAccountUser(self.iduser);
          } else {
            self.displayMessage(
              "Chuyển khoảng và đóng tài khoản thất bại",
              "red"
            );
          }
        });
      self.hideModal();
    },

    displayMessage(msg, color) {
      this.Message = msg;
      this.colorMsg = color;
      this.isDisplayMsg = "block";
    },
    displayModal() {
      this.$refs.myModalRef.show();
    },
    hideModal() {
      this.$refs.myModalRef.hide();
    }
  },
  mounted() {
    var self = this;
    self.getListAccountUser(self.iduser);
  }
};
</script>

<style scoped>
.notice {
  font-size: 1.5rem;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
#tableHead {
  width: 90%;
  margin: 0 auto;
}
.rollTable {
  width: 90%;
  margin: 0 auto;
  height: 24.5rem;
  overflow: auto;
  border-left: 0.1rem solid rgb(168, 163, 163);
  border-right: 0.1rem solid rgb(168, 163, 163);
  border-bottom: 0.1rem solid rgb(168, 163, 163);
}
#tableBody {
  width: 100%;
}
.column1 {
  width: 10%;
  text-align: center;
}
.column2 {
  width: 25%;
  text-align: center;
}
.column4 {
  width: 40%;
  text-align: center;
}
th,
td {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: 1.2rem;
}
tr:hover {
  background-color: rgb(210, 230, 231);
}

button {
  font-size: 1.1rem;
}
</style>