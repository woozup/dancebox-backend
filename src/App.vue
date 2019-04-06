<template>
  <div id="app">
    <router-view/>
    <footer class="footer"/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
  .footer{
    height: 100px;
  }
</style>
