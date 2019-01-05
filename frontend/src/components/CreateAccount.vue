<template>
  <div>
    <h2 class="title">TẠO TÀI KHOẢN THANH TOÁN</h2>
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
      <input class="form-control" placeholder="Nhập số dư tài khoản"/>
    </div>
    <!-- Btn xác nhận -->
    <button class="btn btn-success btn_transfers">Xác nhận</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Message: "",
      isDisplayMsg: "none",
      ColorMsg: "red",
      inputAcount: ""
    };
  },
  methods: {
    chooseAccount() {},
    createBalance() {}
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