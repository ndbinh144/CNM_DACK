<template>
    <div class="modal-card" style="margin-top:100px;">
        <section class="modal-card-body">
            <login-logo></login-logo>
            <h3 class="title has-text-centered has-text-dark">Member Login</h3>
            <div class="box">
                    <b-field>
                        <b-input v-model="mail" type="email" placeholder="E-Mail">
                        </b-input>
                    </b-field>

                    <b-field>
                        <b-input v-model="password" type="password" placeholder="Password" minlength="6" password-reveal>
                        </b-input>
                    </b-field>
                    <b-field>
                        <a class="password-remind-link has-text-dark is-pulled-right" @click="passwordReminder()">I forgot my password</a>
                    </b-field>
                    <button style="margin-top:50px;" class="button is-dark is-large is-fullwidth" @click="doLogin()">
                        Login
                    </button>
                </div>
                <div class="has-text-centered">
                    <router-link v-on:click.native="closeModal()" to="/register">Signup!</router-link>
                </div>
        </section>
    </div>
</template>

<script>

export default {
  name: 'LoginModal',
  data () {
    return {
      mail: '',
      password: '',
    }
  },
  methods: {
    passwordReminder() {
        this.$parent.close()
        this.$modal.open({
            parent: this,
            hasModalCArd: true,
            props: {
            }
        })
    },
    closeModal() {
        this.$parent.close()
    },
    doLogin() {
        this.$parent.close()
        this.$router.push('/accountmg')
    }
  }
}
</script>
