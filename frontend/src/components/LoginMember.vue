<template>
  <div class="modal-card" style="margin-top:100px;">
    <section class="modal-card-body">
      <login-logo>
        <img class="menu_img" src="../assets/login.png" fluid alt="Responsive image">
      </login-logo>
      <h3 class="title has-text-centered has-text-dark">Member Login</h3>
      <div class="box">
        <b-field>
          <b-input v-model="username" placeholder="Username" maxlength="10"></b-input>
        </b-field>

        <b-field>
          <b-input
            v-model="password"
            type="password"
            placeholder="Password"
            minlength="6"
            password-reveal
          ></b-input>
        </b-field>
        <b-field>
          <a
            class="password-remind-link has-text-dark is-pulled-right"
            @click="passwordReminder()"
          >I forgot my password</a>
        </b-field>
        <vue-recaptcha
          ref="recaptcha"
          @verify="onCaptchaVerified"
          sitekey="6LcBWIMUAAAAAGNnweTaAA8tJKIGf7NdadNWFBc_"
        ></vue-recaptcha>
        <template v-if="disable === true">
          <p class="text-danger">Vui lòng check captcha!</p>
        </template>
        <button
          style="margin-top:50px;"
          class="button is-dark is-large is-fullwidth"
          @click="submit()"
        >Login</button>
      </div>
      <div class="has-text-centered">
        <router-link v-on:click.native="closeModal()" to="/register">Signup!</router-link>
      </div>
    </section>
  </div>
</template>

<script>
import VueRecaptcha from "vue-recaptcha";
export default {
  data() {
    return {
      username: "",
      password: "",
      disable: true
    };
  },
  components: { VueRecaptcha },
  methods: {
    passwordReminder() {
      this.$parent.close();
      this.$modal.open({
        parent: this,
        hasModalCArd: true,
        props: {}
      });
    },
    closeModal() {
      this.$parent.close();
    },
    onCaptchaVerified(recaptchaToken) {
      this.disable = recaptchaToken ? false : true;
    },
    submit() {
      if (!this.disable) this.$router.replace("/listaccount");
    }
  }
};
</script>

<style>
.menu_img {
  height: 2.5rem;
  width: 2.5rem;
}
</style>
