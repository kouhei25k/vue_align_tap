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
  inject: ['API_URL'],
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
      const url = `${this.API_URL}/auth/logout/`
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
