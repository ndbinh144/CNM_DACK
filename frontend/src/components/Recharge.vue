<template>
  <div>
    <h2 style="margin-top:150px;" class="title">NẠP TIỀN</h2>
    <p class="text-danger">{{ Message }}</p>
    <!-- Chọn tài khoản -->
    <div class="input-group mb-3 inputCtx">
      <div class="input-group-prepend">
        <span
          class="input-group-text btn btn-info inputText"
          id="basic-addon1"
        >Số tài khoản</span>
      </div>
      <input
        type="text"
        class="form-control"
        placeholder="Nhập số tài khoản"
        aria-describedby="basic-addon1"
        v-model="numberAcount"
      >
    </div>
    <!-- Số tiền nạp -->
    <div class="input-group margin_form inputCtx">
      <div class="input-group-prepend">
        <span class="input-group-text inputText">Số tiền nạp</span>
      </div>
      <input class="form-control" v-model="money" placeholder="Nhập số tiền cần nạp">
    </div>
    <!-- Btn xác nhận -->
    <button style="margin-top:30px;" class="btn btn-success btn_transfers" @click="add">Xác nhận</button>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      Message: "",
      numberAcount: "",
      money: ""
    };
  },
  methods: {
    add() {
      if (!!this.numberAcount) {
        if (!!this.money) {
          const temp = {
            accNum: this.numberAcount,
            money: this.money,
          };
          this.$store.dispatch("addMoney", temp);
          this.Message = "Nạp thành công!";
        } else {
          this.Message = "Chưa nhập số tiền";
        }
      } else {
        this.Message = "Chưa nhập số tài khoản";
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