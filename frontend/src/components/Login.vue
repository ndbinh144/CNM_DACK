<template>
  <div class="modal-card">
    <section class="modal-card-body">
      <h1>{{ accounts }}</h1>
      <h3 class="title has-text-centered has-text-dark">Login</h3>
      <div class="box">
        <form ref="form" lazy-validation>
          <b-field label="Username">
            <b-input v-model="username" placeholder="Username" maxlength="30"></b-input>
          </b-field>
          <b-field label="Password">
            <b-input
              v-model="password"
              type="password"
              placeholder="Password"
              password-reveal
            ></b-input>
          </b-field>
          <b-field>
            <a
              class="password-remind-link has-text-dark is-pulled-right"
              @click="passwordReminder()"
            >I forgot my password</a>
          </b-field>
          <button
            type="button"
            class="button is-dark is-large is-fullwidth"
            @click="submit"
          >Login</button>
        </form>
      </div>
      <div class="has-text-centered">
        <router-link v-on:click.native="closeModal()" to="/register">Signup!</router-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      error: false
    }
  },
  updated () {
    if (localStorage.token) {
      this.$router.replace(this.$route.query.redirect || '/')
    }
  },
  methods: {
    submit () {
      const account = {username: this.username, password: this.password};
      this.$store.dispatch("getAccount", account);
    }
  },
  computed: {
    accounts() {
      return this.$store.state.account;
    }
  }
};
</script>