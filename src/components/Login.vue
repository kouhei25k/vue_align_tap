<template>
  <div>
    <div>
      <label for="">username</label>
      <input
        v-model="username"
        type="text"
      >
    </div>
    <div>
      <label for="">password</label>
      <input
        v-model="password"
        type="text"
      >
    </div>
    <button @click="login">
      Login
    </button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      username: 'testsan',
      password: 'test0000'

    }
  },
  methods: {
    login () {
      const formData = new FormData()
      const url = 'http://127.0.0.1:8000/auth/login/'
      formData.append('username', this.username)
      formData.append('password', this.password)
      axios
        .post(url, formData)
        .then((response) => {
          console.log('Success!!')
          localStorage.setItem('token', response.data.key)
          this.sendisLoggedin()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    sendisLoggedin () {
      this.$emit('LoggedIn', true)
    }

  }
}
</script>

<style>

</style>
