<template>
  <div class="wapper">
    <div id="nav">
      <router-link to="/">
        Home
      </router-link> |
      <router-link to="/base">
        base
      </router-link> |
      <router-link to="/processed">
        processed
      </router-link> |
      <router-link to="/account">
        account
      </router-link>
    </div>
    <div class="main">
      <router-view />
    </div>
  </div>
</template>
<style>
html{
   height: 100vh;
}
body{
  margin: 0;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;

}
.wapper{
  height: 100%;
}

#nav {
  padding: 30px;
  height: 10%;
  box-sizing:border-box
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.main{
  margin-left: 50px;
  margin-right: 50px;
height: 90%;
}

</style>
