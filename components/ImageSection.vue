<template>
  <div 
    v-if="src" 
    class="bg-grey relative overflow-hidden">
    <VImage 
      :src="src" 
      :alt="alt" 
      :format="large?'wide':'ultrawide'" 
      class="block w-full"/>
    <div class="absolute pin flex items-center">
      <div class="container mx-auto relative z-10 p-4">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
import VImage from '~/components/Image'
import Pixels from '~/components/Pixels.vue'

export default {
  components: {
    VImage,
    Pixels,
  },
  props: {
    src: {
      type: String,
      default: null,
    },
    alt: {
      type: String,
      default: '',
    },
    large: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
