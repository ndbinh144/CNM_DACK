<template>
  <div>
    <h2 class="title">XEM LỊCH SỬ GIAO DỊCH</h2>
    <div class="main_view">
      <label class="title_view">Số tài khoản: {{ numaccount }}</label>
      <div class="noHistory" v-if="listTransactionHistory.length === 0">
        <label>Tài khoản chưa được giao dịch</label>
      </div>
      <div class="viewHistory" v-for="(transaction, index) in listTransactionHistory" :key="index">
        <label class="title_content" v-if="checkIsSend(transaction.ACCOUNTSOURCE) === true">Loại giao dịch: Chuyển tiền</label>
        <label class="title_content" v-if="checkIsSend(transaction.ACCOUNTSOURCE) === false">Loại giao dịch: Nhận tiền</label>
        <ul>
          <li class="content">- Thời gian: {{ transaction.TIME }}</li>
          <li class="content">- Số tiền chuyển: {{ transaction.AMOUNT }}</li>
          <li class="content" v-if="checkIsSend(transaction.ACCOUNTSOURCE) === true">- Người nhận: {{ transaction.ACCOUNTDESTINY }}</li>
          <li class="content" v-if="checkIsSend(transaction.ACCOUNTSOURCE) === false">- Người gửi: {{ transaction.ACCOUNTSOURCE }}</li>
          <li class="content">- Nội dung chuyển: {{ transaction.CONTENT }}</li>
        </ul>
      </div>
      <div class="exit">
        <router-link to="/listaccount">Quay về</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  computed: {
    numAccountHistory() {
      return this.$store.state.numAccountHistory;
    },
    listTransactionHistory() {
      return this.$store.state.listTransactionHistory;
    }
  },
  methods: {
    ...mapActions(["getListTransactionHistory"]),
    checkIsSend(accNum) {
      if (this.numaccount === accNum) {
        return true;
      }
      return false;
    }
  },
  props:  ['numaccount'],
  mounted() {
    var self = this;
    if (self.numaccount) {
      self.getListTransactionHistory(self.numaccount);
    }
  }
};
</script>

<style scoped>
.main_view {
  width: 80%;
  margin: 0 auto;
  text-align: left;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
.title_view {
  font-size: 1.2rem;
  margin: 1rem;
  font-weight: 600;
}
#tableHead {
  width: 100%;
  margin: 0 auto;
}
.rollTable {
  width: 100%;
  margin: 0 auto;
  height: 23rem;
  overflow: auto;
  border-left: 0.1rem solid rgb(168, 163, 163);
  border-right: 0.1rem solid rgb(168, 163, 163);
  border-bottom: 0.1rem solid rgb(168, 163, 163);
}
#tableBody {
  width: 100%;
}
.column1 {
  width: 10%;
  text-align: center;
}
.column2 {
  width: 22.5%;
  text-align: center;
}
th, td {
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: 1.15rem;
}
.viewHistory {
  border: .1rem solid rgb(50, 207, 235);
  border-radius: .3rem;
  padding: 1rem;
  font-size: 1.2rem;
  width: 95%;
  margin: 0 auto;
  margin-bottom: 1rem;
}
.content {
  word-wrap: break-word;
}
.title_content {
  font-size: 1.3rem;
  font-weight: 600;
  margin-left: .8rem;
}
.exit, .noHistory {
  margin: 1.5rem;
  font-size: 1.2rem;
  text-align: center;
}
</style>