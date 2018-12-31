<template>
  <div>
    <h2 class="title">THIẾT LẬP DANH SÁCH NGƯỜI NHẬN</h2>
    <label class="notice" :style="{ display: isDisplayMsg, color: ColorMsg }">{{ Message }}</label>
    <div class="list_Container">
      <label class="title_list">Thêm người nhận:</label>
      <div class="row">
        <div class="col-sm-5">
          <input type="text" class="form-control" placeholder="Nhập số tài khoản người nhận mới">
        </div>
        <div class="col-sm-5">
          <input type="text" class="form-control" placeholder="Nhập tên gợi nhớ">
        </div>
        <div class="col-sm-2">
          <button class="btn btn-info" @click="addNew">Thêm</button>
        </div>
      </div>
    </div>

    <div class="list_Container">
      <label class="title_list">Danh sách người nhận hiện có:</label>
      <table class="table" id="tableHead">
        <thead>
          <tr>
            <th class="column1 btn-info">STT</th>
            <th class="column2 btn-info">Số tài khoản</th>
            <th class="column2 btn-info">Tên gợi nhớ</th>
            <th class="column3 btn-info"></th>
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
export default {
  data() {
    return {
      isDisplayMsg: "none",
      Message: "",
      ColorMsg: "red"
    };
  },
  methods: {
    addNew() {
      
    }
  },
};
</script>

<style scoped>
.list_Container {
  width: 80%;
  margin: 0 auto;
  text-align: left;
}
.title_list {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: .5rem;
  margin-left: 1rem;
  margin-bottom: 1rem;
}
.notice {
  font-size: 1.2rem;
}
#tableHead {
  width: 100%;
  margin: 0 auto;
}
.rollTable {
  width: 100%;
  margin: 0 auto;
  height: 16rem;
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
}
th, td {
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: 1.2rem;
}
</style>