<template>
  <div>
    <h2 class="title">TẠO TÀI KHOẢN THANH TOÁN</h2>
    <p class="text-danger">{{ Message }}</p>
    <!-- Chọn tài khoản -->
    <div class="input-group mb-3 inputCtx">
      <div class="input-group-prepend">
        <span
          class="input-group-text btn btn-info inputText"
          id="basic-addon1"
          @click="chooseAccount"
        >TK người sử dụng</span>
      </div>
      <input
        type="text"
        class="form-control"
        placeholder="Nhập tài khoản ngưởi sử dụng"
        aria-describedby="basic-addon1"
        v-model="username"
      >
    </div>
    <!-- Tạo số tài khoản -->
    <div class="input-group margin_form inputCtx">
      <div class="input-group-prepend">
        <span
          class="input-group-text btn btn-info inputText"
          @click="createBalance"
        >Tạo số tài khoản</span>
      </div>
      <input class="form-control inputDisabled" v-model="numberAccount" disabled>
    </div>
    <!-- Số dư tài khoản -->
    <div class="input-group margin_form inputCtx">
      <div class="input-group-prepend">
        <span class="input-group-text inputText">Số dư tài khoản</span>
      </div>
      <input class="form-control" placeholder="Nhập số dư tài khoản" v-model="sodu">
    </div>
    <!-- Btn xác nhận -->
    <button class="btn btn-success btn_transfers" @click="createAcc">Xác nhận</button>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      Message: "",
      isDisplayMsg: "none",
      ColorMsg: "red",
      inputAcount: "",
      username: "",
      numberAccount: "",
      sodu: ""
    };
  },
  methods: {
    chooseAccount() {},
    createBalance() {
      this.$store.dispatch("createAccountNum", this.username).then(result => {
        if (result.numAccountString) {
          this.numberAccount = result.numAccountString;
        }
      });
    },
    createAcc() {
      if (!!this.username) {
        this.$store.dispatch("initUser", this.username).then(result => {
          if (result.length == 0) {
            this.Message = "Tài khoản không tồn tại";
          } else if (!!this.numberAccount) {
            const account = { iduser: this.username, numberaccount: this.numberAccount, balance:this.sodu };
            this.$store.dispatch("createAccount", account);

            alert("Tạo tài khoản thành công!");
            this.username = "";
            this.numberAccount = "";
            this.sodu = "";
          } else {
            this.Message = "Hãy tạo số tài khoản";
          }
        });
      }
      else {
        this.Message = "Tài khoản không được để trống!";
      }
    }
  }
};
</script>

<style scoped>
.title {
  margin-top: 2rem;
  font-family: sans-serif;
  color: cadetblue;
}
.notice {
  font-size: 1.2rem;
}
.inputCtx {
  width: 60%;
  margin: 0 auto;
  margin-bottom: 1rem;
  text-align: left;
}
.btn_Search {
  margin-left: 0.5rem;
}
.inputDisabled {
  background-color: rgb(245, 245, 239);
}
.inputText {
  width: 11rem;
}
</style>