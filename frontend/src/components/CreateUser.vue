<template>
  <div>
    <h2 class="title">TẠO TÀI KHOẢN NGƯỜI DÙNG</h2>
    <label class="notice" :style="{ display: isDisplayMsg, color: ColorMsg }">{{ Message }}</label>
    <!-- username -->
    <div class="form-group row inputCtx">
      <label for="inputUsername" class="col-sm-3 col-form-label">Tên tài khoản</label>
      <div class="col-sm-9">
        <input
          type="text"
          class="form-control"
          id="inputUsername"
          v-model="iduser"
          placeholder="Nhập tên tài khoản"
        >
      </div>
    </div>
    <!-- password -->
    <div class="form-group row inputCtx">
      <label for="inputPassword" class="col-sm-3 col-form-label">Mật khẩu</label>
      <div class="col-sm-9">
        <input
          type="password"
          class="form-control col"
          id="inputPassword"
          v-model="password"
          placeholder="Nhập mật khẩu"
        >
      </div>
    </div>
    <!-- password confirm -->
    <div class="form-group row inputCtx">
      <label for="inputRePassword" class="col-sm-3 col-form-label">Xác nhận mật khẩu</label>
      <div class="col-sm-9">
        <input
          type="password"
          class="form-control"
          id="inputRePassword"
          placeholder="Nhập mật khẩu xác nhận"
          v-model="repassword"
        >
      </div>
    </div>
    <!-- name -->
    <div class="form-group row inputCtx">
      <label for="inputName" class="col-sm-3 col-form-label">Tên người dùng</label>
      <div class="col-sm-9">
        <input
          type="text"
          class="form-control"
          id="inputName"
          v-model="name"
          placeholder="Nhập tên người dùng"
        >
      </div>
    </div>
    <!-- phone number -->
    <div class="form-group row inputCtx">
      <label for="inputPhone" class="col-sm-3 col-form-label">Số điện thoại</label>
      <div class="col-sm-9">
        <input
          type="text"
          class="form-control"
          id="inputPhone"
          v-model="phonenumber"
          placeholder="Nhập số điên thoại"
        >
      </div>
    </div>
    <!-- Email -->
    <div class="form-group row inputCtx">
      <label for="inputEmail" class="col-sm-3 col-form-label">Email</label>
      <div class="col-sm-9">
        <input
          type="email"
          class="form-control"
          id="inputEmail"
          v-model="email"
          placeholder="Nhập email"
        >
      </div>
    </div>
    <!-- Btn xác nhận -->
    <button class="btn btn-success btn_transfers" @click="createUser">Xác nhận</button>
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
      iduser: "",
      password: "",
      repassword: "",
      name: "",
      phonenumber: "",
      email: "",
      url: "http://localhost:3000/api/"
    };
  },
  methods: {
    createUser() {
      var self = this;
      self.isDisplayMsg = "none";
      if (
        self.iduser != "" &&
        self.password != "" &&
        self.repassword != "" &&
        self.name != "" &&
        self.phonenumber != "" &&
        self.email != ""
      ) {
        if (
          self.isValid(self.iduser) &&
          self.isValid(self.password) &&
          self.isValid(self.repassword) &&
          self.isValid(self.name) &&
          self.isValid(self.phonenumber) &&
          self.isValid(self.email)
        ) {
          if (self.password === self.repassword) {
            if (self.validateEmail(self.email)) {
              var urls = self.url + "user";
              axios
                .post(urls, {
                  iduser: self.iduser,
                  password: self.password,
                  name: self.name,
                  phonenumber: self.phonenumber,
                  email: self.email,
                  type: 0
                })
                .then(rs => {
                  if (rs.data.status === 1) {
                    self.displaySuccessMsg("Đăng ký thành công tài khoản");
                  } else if (rs.data.status === 2) {
                    self.displayErrorMsg("Tên tài khoản đã tồn tại");
                  } else {
                    self.displayErrorMsg("Đăng ký thất bại, vui lòng thử lại sau");
                  }
                });
            } else {
              self.displayErrorMsg(
                "Nhập sai Email, vui lòng nhập đúng định dạng"
              );
            }
          } else {
            self.displayErrorMsg("Mật khẩu và mật khẩu xác nhận không giống");
          }
        } else {
          self.displayErrorMsg("Các thông tin không được có ký tự đặc biệt");
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
    },
    validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
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
  text-align: left;
  margin-bottom: 1rem;
}
</style>