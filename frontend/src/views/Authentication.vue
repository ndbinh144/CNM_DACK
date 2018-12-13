<template>
  <div class="authentication">
    <Login />
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'

export default {
  name: 'authentication',
  components: {
    Login
  }
}
</script>
