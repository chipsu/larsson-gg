<template>
  <div class="image-text">
    <div
      :is="tag"
      v-bind="attrs"
      class="inline-block px-2 py-2 md:px-4 md:py-4 lg:px-8 lg:py-4 md:mx-8 text-xl md:text-2xl lg:text-5xl uppercase font-bold text-primary bg-white-75"
    >
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    attrs: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
}
</script>
