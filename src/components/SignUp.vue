<template>
  <div>
    <div>
      <label for="">ユーザーネーム</label>
      <input
        v-model="username"
        type="text"
      >
    </div>
    <div>
      <label for="">パスワード</label>
      <input
        v-model="password"
        type="text"
      >
    </div>
    <div>
      <label for="">もう一度パスワードを入力してください</label>
      <input
        v-model="password2"
        type="text"
      >
    </div>
    <button @click="signup">
      アカウントを作成する
    </button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password1: '',
      password2: ''

    }
  },
  methods: {
    signup () {
      const formData = new FormData()
      const url = 'https://server-auto-settap.herokuapp.com/auth/registration/'

      console.log(this.username)

      formData.append('username', this.username)
      formData.append('password1', this.password1)
      formData.append('password2', this.password2)
      axios
        .post(url, formData)
        .then((response) => {
          console.log('Success!!')
          localStorage.setItem('token', response.data.key)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style>

</style>
