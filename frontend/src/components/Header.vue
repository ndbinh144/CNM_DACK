<template>
  <div>
    <b-navbar toggleable="md" class="header">
      <img
        class="menu_img"
        src="../assets/menu_ico.png"
        fluid
        alt="Responsive image"
        @click="displayMenu"
      >

      <h1 class="header_Title">SPA Internet Banking</h1>

      <b-collapse is-nav id="nav_collapse">
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form id="searchBox">
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Tìm kiếm thông tin"/>
            <b-button size="sm" class="my-2 my-sm-0 btn btn-success" type="button">Tìm kiếm</b-button>
          </b-nav-form>

          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em class="user">{{ iduser }}</em>
            </template>
            <b-dropdown-item href="#">Thông tin</b-dropdown-item>
            <b-dropdown-item href="#">Đăng xuất</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="menu">
      <div class="list_menu" id="list_menu">
        <b-list-group class="content_menu">
          <b-list-group-item
            @mouseover="mouseOverItem(index)"
            @mouseleave="mouseLeaveItem(index)"
            :class="{ active: index == indexActive }"
            v-for="(menu, index) in menuUser"
            :key="index"
            @click="chooseItem"
          >
          <router-link :to="{ path: menu.ref }">{{ menu.name }}</router-link>
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      indexActive: -1
    };
  },
  computed: {
    type() {
      return this.$store.state.type;
    },
    iduser() {
      return this.$store.state.iduser;
    },
    menuUser() {
      return this.$store.state.menuUser;
    }
  },
  mounted() {
    var self = this;
    self.initMenuUser(self.iduser);
  },
  methods: {
    ...mapActions(["initMenuUser"]),
    displayMenu() {
      this.changeDisplayMenu();
    },
    chooseItem() {
      this.changeDisplayMenu();
    },
    changeDisplayMenu() {
      document.getElementById("list_menu").classList.toggle("show");
    },
    mouseOverItem(index) {
      this.indexActive = index;
    },
    mouseLeaveItem(index) {
      if (index === this.indexActive) {
        this.indexActive = -1;
      }
    }
  }
};
</script>

<style scoped>
.header {
  height: 4rem;
  background-color: rgb(15, 230, 176);
}
.header_Title {
  font-family: fantasy;
  margin-left: 6rem;
  color: lightcoral;
}
#searchBox {
  margin-right: 4rem;
}
.menu_img {
  height: 2.5rem;
  width: 2.5rem;
  position: absolute;
}
.menu {
  position: fix;
  float: left;
}
.list_menu {
  position: absolute;
  text-align: left;
  padding: 0.2rem;
  background-color: rgb(7, 97, 74);
  display: none;
  box-shadow: 0rem .5rem 1.2rem 0rem gray;
  z-index: 999;
}
.show {
  display: block;
}
.user {
  color: teal;
  font-weight: 800;
}
</style>