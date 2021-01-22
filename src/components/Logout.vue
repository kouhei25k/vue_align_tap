<template>
  <div>
    <button @click="logout">
      Logout
    </button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Logout',
  data () {
    return {
      username: '',
      password: ''

    }
  },
  methods: {
    logout () {
      this.$emit('LoggedIn', false)
      const formData = new FormData()
      const url = 'http://127.0.0.1:8000/auth/logout/'
      axios
        .post(url, formData, {
          headers: {
            Authorization: `token ${localStorage.token}`
          }
        })
        .then((response) => {
          console.log('Success!!')
          localStorage.removeItem('token')
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
