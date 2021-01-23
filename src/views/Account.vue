<template>
  <div>
    <div v-if="isAuth">
      <p>こんにちは {{ userInfo.username }} さん</p>
      <Logout @LoggedIn="catchIsLoggedIn" />
    </div>
    <div v-else>
      <div v-if="isShowLoginFrom">
        <Login @LoggedIn="catchIsLoggedIn" />
        <div class="other-option">
          <p>アカウントをお持ちでない方は</p>
          <div
            class="button-gray"
            @click="showSignupFrom"
          >
            アカウントを作成する
          </div>
        </div>
      </div>
      <div v-else>
        <SignUp @signup="showLoginFrom" />
        <div class="other-option">
          <p>すでにアカウントをお持ちの方は</p>
          <div
            class="button-gray"
            @click="showLoginFrom"
          >
            ログイン
          </div>
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
  inject: ['API_URL'],
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
    console.log(this.API_URL)
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
        .get(`${this.API_URL}/auth/user/`, {
          headers: {
            Authorization: `token ${localStorage.token}`
          }
        })
        .then(response => {
          this.userInfo = response.data
        })
        .catch(error => {
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

<style lang="scss" scoped>
.other-option{
  margin-top: 20px;
  p{
    margin-bottom: 10px;
  }
}
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
