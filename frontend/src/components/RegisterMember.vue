<template>
    <div class="modal-card" style="margin-top:30px;">
        <section class="modal-card-body">
            <login-logo>
                <img
                    class="menu_img"
                    src="../assets/signup.png"
                    fluid
                    alt="Responsive image"
                >
            </login-logo>
            <h3 class="title has-text-centered has-text-dark">Sign Up</h3>
            <div class="box">
                    <b-field>
                        <b-input v-model="name" type="name" placeholder="Full Name">
                        </b-input>
                    </b-field>

                    <b-field>
                        <b-input v-model="phone" type="phone" placeholder="Phone Number">
                        </b-input>
                    </b-field>

                    <b-field>
                        <b-input v-model="email" type="email" placeholder="E-Mail">
                        </b-input>
                    </b-field>

                    <b-field>
                        <b-input v-model="password" type="password" placeholder="Password" minlength="6" password-reveal>
                        </b-input>
                    </b-field>

                    <button style="margin-top: 50px;" class="button is-dark is-large is-fullwidth" @click="doRegister()">
                        Register
                    </button>
                </div>
                <div class="has-text-centered">
                    <router-link v-on:click.native="closeModal()" to="/loginmem">Login</router-link>
                </div>
        </section>
    </div>
</template>

<script>

export default {
  name: 'LoginModal',
  data () {
    return {
      name: '',
      mail: '',
      password: '',
    }
  },
  methods: {
    closeModal() {
        this.$parent.close()
    },
    doRegister() {
        this.$parent.close()
        this.$router.push('/loginmem')
    }
  }
}
</script>

<style scoped>
.menu_img {
  height: 2.5rem;
  width: 2.5rem;
}
</style>

