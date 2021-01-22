<template>
  <div>
    <div v-if="isAuth">
      <p>{{ userInfo.username }}</p>
      <Logout @LoggedIn="catchIsLoggedIn" />
    </div>
    <div v-else>
      <div v-if="isShowLoginFrom">
        <Login @LoggedIn="catchIsLoggedIn" />
        <div>
          <p>アカウントをお持ちでない方は</p>
          <button @click="showSignupFrom">
            アカウントを作成する
          </button>
        </div>
      </div>
      <div v-else>
        <SignUp />
        <div>
          <p>すでにアカウントをお持ちの方は</p>
          <button @click="showLoginFrom">
            ログイン
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Login from '@/components/Login.vue'
import SignUp from '@/components/SignUp.vue'
import Logout from '@/components/Logout.vue'

export default {
  name: 'Account',
  components: {
    Login,
    SignUp,
    Logout
  },
  data () {
    return {
      isAuth: null,
      isShowLoginFrom: true,
      userInfo: ''
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.isLoggedIn
    }
  },

  mounted () {
    if (localStorage.token) {
      this.isAuth = true
      this.getUserInfo()
    } else {
      this.isAuth = false
    }
  },
  methods: {
    getUserInfo () {
      axios
        .get('https://server-auto-settap.herokuapp.com/auth/user/', {
          headers: {
            Authorization: `token ${localStorage.token}`
          }
        })
        .then((response) => {
          this.userInfo = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    showSignupFrom () {
      this.isShowLoginFrom = false
    },
    showLoginFrom () {
      this.isShowLoginFrom = true
    },
    catchIsLoggedIn (value) {
      this.isAuth = value
      if (value) {
        this.getUserInfo()
      }
    }
  }
}
</script>

<style>

</style>
