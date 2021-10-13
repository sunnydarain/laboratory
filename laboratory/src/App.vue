<template>
  <div id="app">
    <ViewPage />
  </div>
</template>

<script>
import ViewPage from './views'

export default {
  name: 'App',
  components: {
    ViewPage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
</style>
