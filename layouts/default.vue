<template>
  <div>
    <!-- TODO: This becomes visible once hero is not in viev -->
    <!-- <div class="container mx-auto px-4 py-2">
      <div class="flex">
        <logo />
        <div class="ml-auto">[MENU]</div>
      </div>
    </div> -->
    <nuxt/>
    <!-- <pre>OVERLAY_MENU</pre>
    <pre>title,email,swedish/english toggle</pre>
    <div class="container mx-auto px-4 py-2">
      <pre>Something funny here</pre>
      <pre>Random image maybe</pre>
      <pre>Scroll for effect</pre>
      <pre>Retro mode?</pre>
    </div> -->
  </div>
</template>

<script>
//import Logo from '~/components/Logo.vue'

export default {
  /* components: {
    Logo
  } */
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  color: #000;
  background: #fff;
}
</style>
