<template>
  <div id="app">
    <Header />
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
export default {
  components: {
    Header
  }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  min-height: 40.5rem;
  background-color: rgb(251, 253, 251);
}
</style>
