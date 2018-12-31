<template>
  <div>
    <h2 class="title">XEM LỊCH SỬ GIAO DỊCH</h2>
    <div class="main_view">
      <label class="title_view">Số tài khoản:</label>
      <table class="table" id="tableHead">
        <thead>
          <tr>
            <th class="column1 btn-info">STT</th>
            <th class="column2 btn-info">Số tài khoản nhận</th>
            <th class="column2 btn-info">Tên người nhận</th>
            <th class="column2 btn-info">Thời gian</th>
            <th class="column2 btn-info">Số tiền chuyển</th>
          </tr>
        </thead>
      </table>
      <div class="rollTable">
        <table class="table" id="tableBody">
          <tbody>
            <tr></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.main_view {
  width: 80%;
  margin: 0 auto;
  text-align: left;
}
.title_view {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
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
</style>