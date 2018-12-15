<template>
  <div>
    <h2 class="title">CHUYỂN KHOẢN</h2>
    <div class="form_transfers">
      <div class="row">
        <div class="col-sm-8">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span
                class="input-group-text btn btn-info"
                id="basic-addon1"
                @click="chooseAccount"
              >Chọn tài khoản</span>
            </div>
            <input
              type="text"
              class="form-control"
              placeholder="Nhập số tài khoản"
              aria-describedby="basic-addon1"
              id="number_account"
              v-model="inputAcountSource"
            >
          </div>
        </div>
        <div class="col-sm-4" :style="{ display: isInputAccountSource }">
          <label class="label-info">Số dư tài khoản: {{ surplus }}</label>
        </div>
      </div>
    </div>
    <!-- Modal Component -->
    <b-modal ref="myModalRef" hide-footer title="Chọn tài khoản" size="lg">
      <div class="d-block text-center">
        <h5>Hello From My Modal!</h5>
        <h5>Hello From My Modal!</h5>
        <h5>Hello From My Modal!</h5>
        <h5>Hello From My Modal!</h5>
        <h5>Hello From My Modal!</h5>
        <h5>Hello From My Modal!</h5>
        <h5>Hello From My Modal!</h5>
        <h5>Hello From My Modal!</h5>
        <h5>Hello From My Modal!</h5>
        <h5>Hello From My Modal!</h5>
        <h5>Hello From My Modal!</h5>
        <h5>Hello From My Modal!</h5>
        <h5>Hello From My Modal!</h5>
        <h5>Hello From My Modal!</h5>
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
      surplus: 10000000000,
      inputAcountSource: "",
      isInputAccountSource: "none",
      isCardModalActive: false
    };
  },
  methods: {
    chooseAccount() {
      this.$refs.myModalRef.show();
    },
    hideModal () {
      this.$refs.myModalRef.hide()
    },
    setInputAccountSource() {
      this.isInputAccountSource = "block";
    }
  },
  watch: {
    inputAcountSource() {
      this.setInputAccountSource();
    }
  }
};
</script>

<style scoped>
.title {
  margin: 1rem;
  margin-bottom: 2rem;
  font-family: sans-serif;
  color: cadetblue;
}
.form_transfers {
  width: 60rem;
  margin: 0 auto;
}
.label-info {
  font-weight: 600;
  margin: 0.5rem;
}
#modal_account {
  width: 100rem;
}
</style>