<template>
  <div
    class="button-gray"
    @click="logout"
  >
    Logout
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

<style  lang="scss" scoped>
.button-gray {
  margin-left: auto;
  margin-right: auto;
  font-size: 18px;
  color:  #929292;
  border: 2px solid #929292;
  border-radius: 5px;
  background: #fff;
  padding: 5px;
  width: 360px;
  box-sizing: border-box;
  &:hover {
    color: #fff;
    background:  #929292;
  }
}
</style>
