<template>
  <div 
    :is="tag" 
    class="uppercase font-bold leading-none flex">
    <span class="text-primary">larsson</span>
    <span class="text-grey">.gg</span>
  </div>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'div',
    },
  },
}
</script>
