<template>
  <div 
    v-if="src" 
    class="lg:-mx-32 bg-grey relative overflow-hidden">
    <div class="hidden lg:block absolute pin-l w-32 h-full z-10">
      <Pixels
        :w="4"
        :h="large?28:16"
        class="absolute w-full"
        style="top:50%;transform:translateY(-50%);"
      />
    </div>
    <div class="hidden lg:block absolute pin-r w-32 h-full z-10">
      <Pixels
        :w="4"
        :h="large?28:16"
        class="absolute w-full"
        style="top:50%;transform:translateY(-50%) scaleX(-1);"
      />
    </div>
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
