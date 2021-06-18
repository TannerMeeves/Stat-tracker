<template>
  <div id="app">
    <header id="header">
      <h1>Basketball Stats Tracker</h1>
      <router-link to="/help"><h4>Help</h4></router-link>
    </header>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #ffd68f;
  height: 47em;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

header {
  background-color: white;
}

h4 {
  position: absolute;
  float: right;
  right: 60px;
  top: 10px;
}

#header h1 {
  padding: 0em 0em .75em 0em;
}
</style>
