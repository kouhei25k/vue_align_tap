<template>
  <div class="login-container">
    <h3>ログイン</h3>
    <div class="login-form">
      <div class="form-item">
        <label>ユーザー名</label>
        <input
          v-model="username"
          type="text"
        >
      </div>
      <div class="form-item">
        <label>パスワード</label>
        <input
          v-model="password"
          type="password"
        >
      </div>
      <div
        class="button"
        @click="login"
      >
        Login
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  inject: ['API_URL'],
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      if (!this.username || !this.password) {
        alert('ユーザー名とパスワードを入力してください')
      } else {
        const formData = new FormData()
        const url = `${this.API_URL}/auth/login/`
        formData.append('username', this.username)
        formData.append('password', this.password)
        axios
          .post(url, formData)
          .then(response => {
            console.log('Success!!')
            localStorage.setItem('token', response.data.key)
            this.sendisLoggedin()
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    sendisLoggedin () {
      this.$emit('LoggedIn', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  margin: auto;
  border: 2px solid #505050;
  border-radius: 5px;
  width: 360px;
  padding: 30px;
  box-sizing: border-box;
  h3 {
    margin-top: 0;
  }
  .login-form {
    .button {
      margin-top: 30px;
      font-size: 18px;
      color: #42b983;
      border: 2px solid #42b983;
      border-radius: 5px;
      background: #fff;
      padding: 5px;
      box-sizing: border-box;
      &:hover {
        color: #fff;
        background: #42b983;
      }
    }
    .form-item {
      width: 100%;
      margin-bottom: 20px;
      input {
        width: 100%;
        padding: 5px;
        box-sizing: border-box;
      }
      label {
        float: left;
        display: block;
        margin-bottom: 3px;
      }
    }
  }
}
</style>
