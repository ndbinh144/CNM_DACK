<template>
  <div>
    <h2 class="title">TẠO TÀI KHOẢN NGƯỜI DÙNG</h2>
    <label class="notice" :style="{ display: isDisplayMsg, color: ColorMsg }">{{ Message }}</label>
    <!-- username -->
    <div class="form-group row inputCtx">
      <label for="inputUsername" class="col-sm-3 col-form-label">Tên tài khoản</label>
      <div class="col-sm-9">
        <input type="text" class="form-control" id="inputUsername" placeholder="Nhập tên tài khoản">
      </div>
    </div>
    <!-- password -->
    <div class="form-group row inputCtx">
      <label for="inputPassword" class="col-sm-3 col-form-label">Mật khẩu</label>
      <div class="col-sm-9">
        <input type="text" class="form-control col" id="inputPassword" placeholder="Nhập mật khẩu">
      </div>
    </div>
    <!-- password confirm -->
    <div class="form-group row inputCtx">
      <label for="inputRePassword" class="col-sm-3 col-form-label">Xác nhận mật khẩu</label>
      <div class="col-sm-9">
        <input
          type="text"
          class="form-control"
          id="inputRePassword"
          placeholder="Nhập mật khẩu xác nhận"
        >
      </div>
    </div>
    <!-- name -->
    <div class="form-group row inputCtx">
      <label for="inputName" class="col-sm-3 col-form-label">Tên người dùng</label>
      <div class="col-sm-9">
        <input type="text" class="form-control" id="inputName" placeholder="Nhập tên người dùng">
      </div>
    </div>
    <!-- phone number -->
    <div class="form-group row inputCtx">
      <label for="inputPhone" class="col-sm-3 col-form-label">Số điện thoại</label>
      <div class="col-sm-9">
        <input type="text" class="form-control" id="inputPhone" placeholder="Nhập số điên thoại">
      </div>
    </div>
    <!-- Email -->
    <div class="form-group row inputCtx">
      <label for="inputEmail" class="col-sm-3 col-form-label">Email</label>
      <div class="col-sm-9">
        <input type="email" class="form-control" id="inputEmail" placeholder="Nhập email">
      </div>
    </div>
    <!-- Btn xác nhận -->
    <button class="btn btn-success btn_transfers">Xác nhận</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Message: "aaaaaaa",
      isDisplayMsg: "none",
      ColorMsg: "red"
    };
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