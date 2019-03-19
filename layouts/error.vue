<template>
  <div 
    class="container mx-auto flex items-center justify-center text-center" 
    style="height:100vh">
    <div class="p-4">
      <div class="text-primary text-xl lg:text-5xl">
        {{ error.statusCode }}
      </div>
      <div class="p-2">
        {{ error.message.split(':').shift() }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'default',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
}
</script>
