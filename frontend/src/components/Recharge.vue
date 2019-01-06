<template>
  <div>
    <h2 style="margin-top:150px;" class="title">NẠP TIỀN</h2>
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
    <!-- Số tiền nạp -->
    <div class="input-group margin_form inputCtx">
      <div class="input-group-prepend">
        <span class="input-group-text inputText">Số tiền nạp</span>
      </div>
      <input class="form-control" id="money" v-model="money" placeholder="Nhập số tiền cần nạp"/>
    </div>
    <!-- Btn xác nhận -->
    <button style="margin-top:30px;" class="btn btn-success btn_transfers">Xác nhận</button>
  
  </div>
</template>

<script>
export default {}
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