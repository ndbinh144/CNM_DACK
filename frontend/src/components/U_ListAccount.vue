<template>
  <div>
    <h2 class="title">DANH SÁCH TÀI KHOẢN THANH TOÁN</h2>
    <table class="table" id="tableHead">
      <thead>
        <tr>
          <th class="column1">STT</th>
          <th class="column2">Số tài khoản</th>
          <th class="column2">Số dư hiện tại</th>
        </tr>
      </thead>
    </table>
    <div class="rollTable">
      <table class="table" id="tableBody">
        <tbody>
          <tr v-for="(account, index) in list" :key="index">
            <td class="column1">{{ index+1 }}</td>
            <td class="column2">{{ account.id }}</td>
            <td class="column2">{{ account.surplus }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#tableHead {
  width: 65%;
  margin: 0 auto;
}
.rollTable {
  width: 65%;
  margin: 0 auto;
  height: 24.5rem;
  overflow: auto;
  border: 0.1rem solid rgb(168, 163, 163);
}
#tableBody {
  width: 100%;
}
.column1 {
  width: 20%;
  text-align: center;
}
.column2 {
  width: 40%;
  text-align: center;
}
th {
  background-color: rgb(71, 227, 233);
  font-size: 1.2rem;
}
</style>