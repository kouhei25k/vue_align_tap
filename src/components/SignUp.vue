<template>
  <div class="signup-container">
    <h3>アカウント作成</h3>
    <div class="signup-form">
      <div class="form-item">
        <label for="">ユーザーネーム</label>
        <input
          v-model="username"
          type="text"
        >
      </div>
      <div class="form-item">
        <label for="">パスワード</label>
        <input
          v-model="password1"
          type="password"
        >
      </div>
      <div class="form-item">
        <label for="">もう一度パスワードを入力してください</label>
        <input
          v-model="password2"
          type="password"
        >
      </div>
      <div
        class="button"
        @click="signup"
      >
        アカウントを作成する
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
      password1: '',
      password2: ''

    }
  },
  methods: {
    signup () {
      if (!this.username || !this.password1 || !this.password2) {
        alert('ユーザー名とパスワードを入力してください')
      } else if (this.password1 !== this.password2) {
        alert('パスワードが一致しません')
        this.password1 = this.password2 = ''
      } else {
        const formData = new FormData()
        const url = `${this.API_URL}/auth/registration/`

        console.log(this.username)

        formData.append('username', this.username)
        formData.append('password1', this.password1)
        formData.append('password2', this.password2)
        axios
          .post(url, formData)
          .then((response) => {
            console.log('Success!!')
            localStorage.setItem('token', response.data.key)
            this.$emit('signup')
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.signup-container {
  margin: auto;
  border: 2px solid #505050;
  border-radius: 5px;
  width: 300px;
  padding: 30px;
  h3 {
    margin-top: 0;
  }
  .signup-form {
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
