<template>
  <div>
    <h2 class="title">CHUYỂN KHOẢN</h2>
    <label class="notice_error" :style="{ display: showMessage, color: colorMsg }">{{ Message }}</label>
    <div class="row main_view">
      <div class="col-sm-8">
        <!-- Nhập tài khoản chuyển tiền -->
        <div class="input-group mb-3">
          <div class="input-group-prepend inputText">
            <span
              class="input-group-text btn btn-info inputText"
              id="basic-addon1"
              @click="displayModal1"
            >Chọn tài khoản</span>
          </div>
          <input
            type="text"
            class="form-control inputText"
            placeholder="Nhập số tài khoản chuyển tiền"
            aria-describedby="basic-addon1"
            id="number_account"
            v-model="accountSource"
          >
        </div>

        <!-- Nhập tài khoản nhận tiền -->
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span
              class="input-group-text btn btn-info inputText"
              id="basic-addon1"
              @click="displayModal2"
            >Chọn tài khoản</span>
          </div>
          <input
            type="text"
            class="form-control inputText"
            placeholder="Nhập số tài khoản nhận tiền"
            aria-describedby="basic-addon1"
            id="number_account"
            v-model="accountDestiny"
          >
        </div>

        <!-- Nhập số tiền -->
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text inputText" id="basic-addon1">Số tiền chuyển</span>
          </div>
          <input
            type="text"
            class="form-control inputText"
            placeholder="Nhập số tiền cần chuyển"
            aria-describedby="basic-addon1"
            id="money"
            v-model="inputMoney"
          >
        </div>

        <!-- Nhập nội dung chuyển -->
        <div class="input-group margin_form">
          <div class="input-group-prepend">
            <span class="input-group-text inputText">Nhập nội dung</span>
          </div>
          <textarea
            class="form-control inputText"
            placeholder="Nhập nội dung chuyển"
            aria-label="With textarea"
            v-model="content"
          ></textarea>
        </div>

        <!-- Chọn hình thức thanh toán -->
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text inputText" id="basic-addon1">Chọn hình thức</span>
          </div>
          <select class="form-control inputText">
            <option value="sourcePay" selected>Người nhận trả phí</option>
            <option value="destinyPay">Người gửi trả phí</option>
          </select>
        </div>
      </div>

      <!-- Thông tin người nhận -->
      <div class="col-sm-4">
        <div class="accountDestiny">
          <div class="title_info">
            <label>Thông tin người nhận</label>
          </div>
          <div class="info_Account">
            <!-- <p>Chủ tài khoản: {{ accountDestiny.name }}</p> -->
            <p>Số tài khoản: {{ numAcc }}</p>
            <p>Chủ tài khoản: {{ name }}</p>
            <p>Số điện thoại: {{ phonenumber }}</p>
            <p>Email: {{ email }}</p>
          </div>
        </div>
      </div>
    </div>
    <button class="btn btn-success btn_transfers" @click="transfer()">Xác nhận</button>

    <!-- Modal danh sách tài khoản có thể gửi -->
    <b-modal ref="Modal1" hide-footer title="Chọn tài khoản" size="lg">
      <div class="d-block text-center">
        <table class="table">
          <thead>
            <tr>
              <th class="column1 btn-info">STT</th>
              <th class="column2 btn-info">Số tài khoản</th>
              <th class="column2 btn-info">Số dư</th>
            </tr>
          </thead>
        </table>
        <div class="rollTable">
          <table class="table">
            <tbody>
              <tr
                v-for="(account, index) in listAccountUser"
                v-bind:key="index"
                @click="setAccountSource(account.NUMBERACCOUNT)"
              >
                <td class="column1">{{ index + 1 }}</td>
                <td class="column2">{{ account.NUMBERACCOUNT }}</td>
                <td class="column2">{{ account.BALANCE }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <b-btn class="mt-3" variant="outline-danger" block @click="hideModal1">Đóng</b-btn>
    </b-modal>

    <!-- Modal danh sách tài khoản nhận -->
    <b-modal ref="Modal2" hide-footer title="Chọn tài khoản" size="lg">
      <div class="d-block text-center">
        <table class="table">
          <thead>
            <tr>
              <th class="column1 btn-info">STT</th>
              <th class="column2 btn-info">Số tài khoản</th>
              <th class="column2 btn-info">Tên gợi nhớ</th>
            </tr>
          </thead>
        </table>
        <div class="rollTable">
          <table class="table">
            <tbody>
              <tr
                v-for="(account, index) in listReceiver"
                v-bind:key="index"
                @click="setAccountDestiny(account.NUMBERACCOUNT)"
              >
                <td class="column1">{{ index + 1 }}</td>
                <td class="column2">{{ account.NUMBERACCOUNT }}</td>
                <td class="column2">{{ account.NAME }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <b-btn class="mt-3" variant="outline-danger" block @click="hideModal2">Đóng</b-btn>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";
export default {
  name: "Transfers",
  computed: {
    iduser() {
      return this.$store.state.iduser;
    },
    listAccountUser() {
      return this.$store.state.listAccountUser;
    },
    listReceiver() {
      return this.$store.state.listReceiver;
    },
    url() {
      return this.$store.state.url;
    }
  },
  data() {
    return {
      Message: "",
      colorMsg: "",
      showMessage: "none",
      accountSource: "",
      accountDestiny: "",
      inputMoney: "",
      content: "",
      showErrorMsg: "none",
      numAcc: "",
      name: "",
      phonenumber: "",
      email: ""
    };
  },
  methods: {
    ...mapActions(["getListAccountUser", "getListReceiver"]),
    displayModal1() {
      this.$refs.Modal1.show();
    },
    hideModal1() {
      this.$refs.Modal1.hide();
    },
    displayModal2() {
      this.$refs.Modal2.show();
    },
    hideModal2() {
      this.$refs.Modal2.hide();
    },
    hideErrorMsg() {
      this.showErrorMsg = "none";
    },
    displayErrorMsg() {
      this.showErrorMsg = "block";
    },
    setAccountSource(accNum) {
      var self = this;
      self.accountSource = accNum;
      self.hideModal1();
    },
    setAccountDestiny(accNum) {
      var self = this;
      self.accountDestiny = accNum;
      self.hideModal2();
    },
    checkAccountDestiny() {
      var self = this;
      var urls = self.url + "account/infoaccount/" + self.accountDestiny;
      axios.get(urls).then(rs => {
        if (rs.data.status === 1) {
          self.numAcc = rs.data.info.numberaccount;
          self.name = rs.data.info.name;
          self.phonenumber = rs.data.info.phonenumber;
          self.email = rs.data.info.email;
        } else {
          self.numAcc = "";
          self.name = "";
          self.phonenumber = "";
          self.email = "";
        }
      });
    },
    transfer() {
      var self = this;
      self.showMessage = "none";
      if (
        self.accountSource !== "" &&
        self.accountDestiny !== "" &&
        self.inputMoney !== ""
      ) {
        if (self.accountSource === self.accountDestiny) {
          self.displayMessage("Hai tài khoản không được giống nhau", "red");
        } else {
          if (self.isNumeric(self.inputMoney)) {
            if (self.checkAmount(self.inputMoney)) {
              var urlcheckSource = self.url + "account/checkaccountuser";
              var urlcheckDestiny =
                self.url + "account/infoaccount/" + self.accountDestiny;
              axios
                .post(urlcheckSource, {
                  iduser: self.iduser,
                  accNum: self.accountSource
                })
                .then(rs => {
                  if (rs.data.status === 1) {
                    axios.get(urlcheckDestiny).then(rs2 => {
                      if (rs2.data.status === 1) {
                        var urlcheckamount = self.url + "/account/checkamount";
                        axios
                          .post(urlcheckamount, {
                            amount: self.inputMoney,
                            accNum: self.accountSource
                          })
                          .then(rs3 => {
                            if (rs3.data.status === 1) {
                              var urlTransaction = self.url + "transaction";
                              axios
                                .post(urlTransaction, {
                                  accSource: self.accountSource,
                                  accDestiny: self.accountDestiny,
                                  amount: self.inputMoney,
                                  content: self.content
                                })
                                .then(rs => {
                                  if (rs.data.status === 1) {
                                    self.displayMessage(
                                      "Giao dịch thành công",
                                      "blue"
                                    );
                                    self.getListAccountUser(self.iduser);
                                  }
                                });
                            } else {
                              self.displayMessage(
                                "Tài khoản không đủ tiền",
                                "red"
                              );
                            }
                          });
                      } else {
                        self.displayMessage(
                          "Số tài khoản nhận không tồn tại",
                          "red"
                        );
                      }
                    });
                  } else {
                    self.displayMessage(
                      "Số tài khoản chuyển không phải của bạn",
                      "red"
                    );
                  }
                });
            } else {
              self.displayMessage("Số tiền gửi phải lớn hơn 0", "red");
            }
          } else {
            self.displayMessage("Nhập sai số tiền gửi", "red");
          }
        }
      } else {
        self.displayMessage("Vui lòng nhập đủ thông tin", "red");
      }
    },

    isNumeric(num) {
      return !isNaN(num);
    },

    checkAmount(amount) {
      return parseFloat(amount) > 0;
    },

    displayMessage(msg, color) {
      var self = this;
      self.Message = msg;
      self.colorMsg = color;
      self.showMessage = "block";
    }
  },
  watch: {
    accountDestiny() {
      return this.checkAccountDestiny();
    }
  },

  mounted() {
    var self = this;
    self.getListAccountUser(self.iduser);
    self.getListReceiver(self.iduser);
  }
};
</script>

<style scoped>
.title {
  margin: 2rem;
  font-family: sans-serif;
  color: cadetblue;
}
.main_view {
  width: 90%;
  margin: 0 auto;
  margin-bottom: 1.5rem;
  text-align: left;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
.margin_form {
  margin-bottom: 1rem;
}
.label-info {
  font-weight: 600;
  margin: 0.5rem;
}
.notice_error {
  color: red;
  font-style: italic;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: 1.5rem;
}
#modal_account {
  width: 100rem;
}
table {
  margin: 0 auto;
}
.rollTable {
  width: 100%;
  margin: 0 auto;
  margin-top: -1.55rem;
  height: 22rem;
  overflow: auto;
  border: 0.1rem solid rgb(168, 163, 163);
}
.column1 {
  width: 20%;
}
.column2 {
  width: 40%;
}
::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  font-style: italic;
  color: grey;
}
.btn_transfers {
  margin: 1rem;
}
.accountDestiny {
  border: 0.1rem solid rgb(166, 239, 248);
  border-radius: 0.5rem;
  padding: 1rem;
}
.title_info {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  color: rgb(59, 127, 129);
  font-size: 1.6rem;
  font-weight: 600;
  text-align: center;
}
.info_Account {
  background-color: rgb(229, 243, 238);
  padding: 0.5rem;
  font-size: 1.2rem;
  border: 0.1rem solid rgb(137, 202, 204);
  border-radius: 0.4rem;
}
.inputText {
  width: 10rem;
  font-size: 1.1rem;
}
tr:hover {
  background-color: rgb(210, 230, 231);
}
</style>