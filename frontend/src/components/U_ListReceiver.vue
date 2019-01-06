<template>
  <div>
    <h2 class="title">THIẾT LẬP DANH SÁCH NGƯỜI NHẬN</h2>
    <label class="notice" :style="{ display: isDisplayMsg, color: ColorMsg }">{{ Message }}</label>
    <div class="list_Container">
      <label class="title_list">Thêm người nhận:</label>
      <div class="row">
        <div class="col-sm-5">
          <input
            type="text"
            class="form-control"
            v-model="accNum"
            placeholder="Nhập số tài khoản người nhận mới"
          >
        </div>
        <div class="col-sm-5">
          <input type="text" class="form-control" v-model="name" placeholder="Nhập tên gợi nhớ">
        </div>
        <div class="col-sm-2">
          <button class="btn btn-info form-control" @click="addNew">Thêm</button>
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
          </tr>
        </thead>
      </table>
      <div class="rollTable">
        <table class="table" id="tableBody">
          <tbody>
            <tr v-for="(acc, index) in listReceiver" :key="index">
              <td class="column1">{{ index + 1 }}</td>
              <td class="column2">{{ acc.NUMBERACCOUNT }}</td>
              <td class="column2">{{ acc.NAME }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";
export default {
  computed: {
    iduserStore() {
      return this.$store.state.iduser;
    },
    listReceiver() {
      return this.$store.state.listReceiver;
    }
  },
  data() {
    return {
      isDisplayMsg: "none",
      Message: "",
      ColorMsg: "red",
      accNum: "",
      name: "",
      url: "http://localhost:3000/api/"
    };
  },
  props: ["iduser"],
  methods: {
    ...mapActions(["getListReceiver"]),
    addNew() {
      var self = this;
      self.isDisplayMsg = "none";
      if (self.accNum != "") {
        var urls = self.url + "account/checkaccount";
        axios
          .post(urls, {
            accNum: self.accNum,
            iduser: self.iduser
          })
          .then(rs => {
            if (rs.data.status === 1) {
              var urls2 = self.url + "receiver";
              axios
                .post(urls2, {
                  iduser: self.iduser,
                  accNum: self.accNum,
                  name: self.name
                })
                .then(rs => {
                  if (rs.data.status === 1) {
                    self.getListReceiver(self.iduser);
                    self.showMessage("Thêm thành công tài khoản", "blue");
                  }
                });
            } else if (rs.data.status === 2) {
              self.showMessage("Số tài khoản này không tồn tại", "red");
            } else {
              self.showMessage("Số tài khoản này đã có trong danh sách", "red");
            }
          });
      } else {
        self.showMessage("Hãy nhập thông tin số tài khoản", "red");
      }
    },

    showMessage(msg, color) {
      this.isDisplayMsg = "block";
      this.Message = msg;
      this.ColorMsg = color;
    }
  },
  mounted() {
    var self = this;
    if (self.iduser) {
      self.getListReceiver(self.iduser);
    }
  }
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
  margin-top: 0.5rem;
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
  width: 40%;
  text-align: center;
}
th,
td {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: 1.2rem;
}
tr:hover {
  background-color: rgb(210, 230, 231);
}
</style>