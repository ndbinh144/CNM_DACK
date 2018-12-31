<template>
  <div>
    <h2 class="title">DANH SÁCH TÀI KHOẢN THANH TOÁN</h2>
    <table class="table" id="tableHead">
      <thead>
        <tr>
          <th class="column1 btn-info">STT</th>
          <th class="column2 btn-info">Số tài khoản</th>
          <th class="column2 btn-info">Số dư hiện tại</th>
          <th class="cloumn3 btn-info"></th>
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
  width: 80%;
  margin: 0 auto;
}
.rollTable {
  width: 80%;
  margin: 0 auto;
  height: 24.5rem;
  overflow: auto;
  border-left: 0.1rem solid rgb(168, 163, 163);
  border-right: 0.1rem solid rgb(168, 163, 163);
  border-bottom: 0.1rem solid rgb(168, 163, 163);
}
#tableBody {
  width: 100%;
}
.column1 {
  width: 20%;
  text-align: center;
}
.column2 {
  width: 30%;
  text-align: center;
}
.column3 {
  width: 20%;
  text-align: center;
}
th, td {
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: 1.2rem;
}
</style>