import axios from 'axios'

export default {
    getAccount(state, account){
				state.account = account;
				axios.post('http://localhost:3000/api/user/login', account)
				.then(req => {
            if (!req.data.token) {
                this.loginFailed()
                return
              }
              this.error = false
              localStorage.token = req.data.access_token
              this.$router.replace(this.$route.query.redirect || '/')
        })
        .catch(() => {
            this.error = 'Login failed!'
            delete localStorage.token
        })
    }
}
