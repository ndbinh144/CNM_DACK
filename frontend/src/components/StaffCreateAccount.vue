<template>
  <div>
    <h2 style="margin-top:150px;" class="title">TẠO TÀI KHOẢN THANH TOÁN</h2>
    <label class="notice" :style="{ display: isDisplayMsg, color: ColorMsg }">{{ Message }}</label>
    <!-- Chọn tài khoản -->
    <div class="input-group mb-3 inputCtx">
      <div class="input-group-prepend">
        <span
          class="input-group-text btn btn-info inputText"
          id="basic-addon1"
          @click="chooseAccount"
        >Chọn tài khoản</span>
      </div>
      <input
        type="text"
        class="form-control"
        placeholder="Nhập tên tài khoản"
        aria-describedby="basic-addon1"
        id="number_account"
        v-model="inputAcount">
    </div>
    <!-- Tạo số tài khoản -->
    <div class="input-group margin_form inputCtx">
      <div class="input-group-prepend">
        <span class="input-group-text btn btn-info inputText" @click="createBalance">Tạo số dư tài khoản</span>
      </div>
      <input class="form-control inputDisabled" disabled/>
    </div>
    <!-- Số dư tài khoản -->
    <div class="input-group margin_form inputCtx">
      <div class="input-group-prepend">
        <span class="input-group-text inputText">Số dư tài khoản</span>
      </div>
      <input class="form-control" id="inputBalance" v-model="balance" placeholder="Nhập số dư tài khoản"/>
    </div>
    <!-- Btn xác nhận -->
    <button style="margin-top:30px;" class="btn btn-success btn_transfers">Xác nhận</button>
  
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      Message: "",
      isDisplayMsg: "none",
      ColorMsg: "red",
      inputAcount: "",
      balance: "",
      url: "http://localhost:3000/api/"
    };
  },
  methods: {
    chooseAccount() {},
    createBalance() {
      var self = this;
      self.isDisplayMsg = "none";
      if (
        self.inputAcount != "" &&
        self.balance != ""
      ){
        if(
          self.isValid(self.inputAcount) &&
          self.isValid(self.balance)
        ){
          var urls = self.url + "account";
          axios 
            .post(urls,{
              inputAcount: self.inputAcount,
              balance: self.balance,
              type: 0
            })
            .then(rs => {
              if(rs.data.status === 1) {
                self.displaySuccessMsg("Đăng ký thành công tài khoản");
              }
              else if(rs.data.status === 2) {
                self.displayErrorMsg("Tên tài khoản đã tồn tại")
              }else {
                self.displayErrorMsg("Đăng ký thất bại ,vui lòng thử lại sau");
              }
            })
        } else {
          self.displayErrorMsg("Các thông tin không được có ký tự đặc biệt")
        }
      } else {
        self.displayErrorMsg("Hãy nhập đủ thông tin");
      }
    },
    displayErrorMsg(msg) {
      this.ColorMsg = "red";
      this.Message = msg;
      this.isDisplayMsg = "block";
    },
    displaySuccessMsg(msg) {
      this.ColorMsg = "rgb(10, 173, 10)";
      this.Message = msg;
      this.isDisplayMsg = "block";
    },
    isValid(str) {
      var pattern = new RegExp(/[~`!#$%^&*+=\-[\]\\';,/{}|\\":<>?]/);
      if (pattern.test(str)) {
        return false;
      }
      return true;
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