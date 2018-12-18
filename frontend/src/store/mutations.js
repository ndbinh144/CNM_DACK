import axios from 'axios'

export default {
    getAccount(state, account){
        axios.post('http://localhost:3000/api/user/login', account)
        .then(req => {
            if (!req.data.access_token) {
                this.loginFailed()
                return
            }
            this.error = false;
            localStorage.access_token = req.data.access_token;
            localStorage.refresh_token = req.data.refresh_token;
            state.account = true;
        })
        .catch(() => {
            this.error = 'Login failed!'
            delete localStorage.access_token
            delete localStorage.refresh_token
        })
    }
}
