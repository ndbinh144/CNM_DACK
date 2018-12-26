<template>
  <div>
    <h2 class="title">CHUYỂN KHOẢN</h2>
    <label class="notice_error" :style="{ display: showErrorMsg }">{{ errorMessage }}</label>
    <div class="form_transfers">
      <!-- Nhập tài khoản chuyển tiền -->
      <div class="row">
        <div class="col-sm-8">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span
                class="input-group-text btn btn-info"
                id="basic-addon1"
                @click="chooseAccountSource"
              >Chọn tài khoản</span>
            </div>
            <input
              type="text"
              class="form-control"
              placeholder="Nhập số tài khoản chuyển tiền"
              aria-describedby="basic-addon1"
              id="number_account"
              v-model="inputAcountSource"
            >
          </div>
        </div>
        <div class="col-sm-4" v-if="inputAcountSource != ''" :style="{ display: isInputAccountSource }">
          <p class="label-info">Số dư tài khoản: {{ surplus }}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-8">
          <!-- Nhập tài khoản nhận tiền -->
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span
                class="input-group-text btn btn-info"
                id="basic-addon1"
                @click="chooseAccountDestiny"
              >Chọn tài khoản</span>
            </div>
            <input
              type="text"
              class="form-control"
              placeholder="Nhập số tài khoản nhận tiền"
              aria-describedby="basic-addon1"
              id="number_account"
              v-model="inputAcountDestiny"
            >
          </div>
          <!-- Nhập số tiền -->
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">Số tiền chuyển</span>
            </div>
            <input
              type="text"
              class="form-control"
              placeholder="Nhập số tiền cần chuyển"
              aria-describedby="basic-addon1"
              id="money"
              v-model="inputMoney"
            >
          </div>
          <!-- Nhập nội dung chuyển -->
          <div class="input-group margin_form">
            <div class="input-group-prepend">
              <span class="input-group-text">Nhập nội dung</span>
            </div>
            <textarea
              class="form-control"
              placeholder="Nhập nội dung chuyển"
              aria-label="With textarea"
            ></textarea>
          </div>
          <!-- Chọn hình thức thanh toán -->
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">Chọn hình thức</span>
            </div>
           <select class="form-control">
                <option value="sourcePay" selected>Người nhận trả phí</option>
                <option value="destinyPay">Người gửi trả phí</option>
            </select>
          </div>
        </div>
        <div class="col-sm-4 accountDestiny" v-if="inputAcountDestiny != ''" :style="{ display: isInputAccountDestiny}">
          <label class="title_info">Thông tin người nhận</label>
          <div class="info_Account">
            <!-- <p>Chủ tài khoản: {{ accountDestiny.name }}</p> -->
            <p>Chủ tài khoản:</p>
            <p>Chủ tài khoản:</p>
            <p>Chủ tài khoản:</p>
            <p>Chủ tài khoản:</p>
          </div>
        </div>
      </div>
    </div>
    <button class="btn btn-success btn_transfers">Xác nhận</button>
    <!-- Modal Component -->
    <b-modal ref="myModalRef" hide-footer title="Chọn tài khoản" size="lg">
      <div class="d-block text-center">
        <table class="table">
          <thead>
            <tr>
              <th class="column1">Số tài khoản</th>
              <th class="column1">Chủ sở hữu</th>
              <th class="column1">Số dư</th>
            </tr>
          </thead>
        </table>
        <div class="rollTable">
          <table class="table">
            <tbody>
              <tr
                v-for="item in currList"
                v-bind:key="item.serial"
                @click="setAccount(item.serial)"
              >
                <td class="column1">{{ item.serial }}</td>
                <td class="column1">{{ item.name }}</td>
                <td class="column1">{{ item.surplus }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="number_page">
        <button
          class="btn btn-info btn_page"
          v-for="index in [0, parseInt(length_list_User / 10)]"
          :key="index"
          @click="changePage(index)"
        >{{ index + 1 }}</button>
      </div>
      <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">Đóng</b-btn>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "Transfers",
  data() {
    return {
      errorMessage: "Sai te le hot me",
      surplus: 10000000000,
      inputAcountSource: "",
      inputAcountDestiny: "",
      inputMoney: "",
      showErrorMsg: "none",
      isInputAccountSource: "none",
      isInputAccountDestiny: "none",
      isCardModalActive: false,
      inputSourceAccount: true,
      currList: [],
      pageCurr: 1
    };
  },
  mounted() {
    this.currList = this.getListUserInPage();
  },
  computed: {
    list_User() {
      return this.$store.state.list_User;
    },
    length_list_User() {
      return this.$store.state.length_list_User;
    }
  },
  methods: {
    chooseAccountSource() {
      this.displayModal();
      this.inputSourceAccount = true;
    },
    chooseAccountDestiny() {
      this.displayModal();
      this.inputSourceAccount = false;
    },
    displayModal() {
      this.$refs.myModalRef.show();
    },
    hideModal() {
      this.$refs.myModalRef.hide();
    },
    hideErrorMsg() {
      this.showErrorMsg = "none";
    },
    displayErrorMsg() {
      this.showErrorMsg = "block";
    },
    displaySurlus() {
      this.isInputAccountSource = "block";
    },
    setAccount(serial) {
      var self = this;
      self.hideModal();
      if (self.inputSourceAccount) {
        self.inputAcountSource = serial;
        self.checkSurplus();
      } else {
        self.inputAcountDestiny = serial;
        self.checkInfoDestiny();
      }
    },
    checkSurplus() {
      var self = this;
      // Gọi API lấy số dư của tài khoản
      self.displaySurlus();
    },
    checkInfoDestiny() {
      this.isInputAccountDestiny = "block";
    },
    changePage(index) {
      var self = this;
      if (index + 1 != self.pageCurr) {
        self.currList = [];
        self.pageCurr = index + 1;
        self.currList = self.getListUserInPage();
      }
    },
    getListUserInPage() {
      var self = this;
      var arrUser = [];
      if (self.length_list_User > 10) {
        var maxIndex = self.pageCurr * 10;
        for (var i = maxIndex - 10; i < maxIndex; ++i) {
          if (self.list_User[i] != null) {
            arrUser.push(self.list_User[i]);
          }
        }
        return arrUser;
      }
      return self.list_User;
    }
  },
  watch: {
    inputAcountSource() {
      this.checkSurplus();
    },
    inputAcountDestiny() {
      this.checkInfoDestiny();
    }
  }
};
</script>

<style scoped>
.title {
  margin: 2rem;
  font-family: sans-serif;
  color: cadetblue;
}
.form_transfers {
  width: 65rem;
  margin: 0 auto;
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
  width: 40%;
}
.number_page {
  float: right;
  margin: 1rem;
}
.btn_page {
  margin: 0.5rem;
}
::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  font-style: italic;
  color: grey;
}
.btn_transfers {
  margin: 1rem;
}
.accountDestiny {
  border: .1rem solid rgb(166, 239, 248);
  border-radius: .5rem;
}
.title_info {
  font-family: sans-serif;
  color: cadetblue;
  font-size: 1.5rem;
}
.info_Account {
  text-align: left;
  background-color: rgb(216, 233, 227);
  padding: .5rem;
  font-size: 1.2rem;
}
</style>