<template>
  <div class="image-text">
    <div
      :is="tag"
      v-bind="attrs"
      class="inline-block px-4 py-4 lg:px-8 lg:py-4 md:mx-8 text-2xl lg:text-5xl uppercase font-bold text-red"
      style="background:rgba(255,255,255,.75)"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    attrs: {
      type: Object,
      default: () => { return {} }
    }
  }
}
</script>
