<template>
  <div class="burger transition relative cursor-pointer" :class="{'hover:bg-red': !hidden}">
    <div class="transition absolute pin-l pin-t pin-r mx-2 rounded-full bg-white" v-for="i in [0,1,2]" :key="i" :style="barStyle(i)" />
  </div>
</template>

<script>
// TODO: Hover effects
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    barStyle(i) {
      let map = {
        active: [
          { transform: 'translateY(-100%) rotate(225deg)', top: '50%', },
          { transform: 'translateY(-100%) rotate(135deg)', top: '50%', },
          { transform: 'translateY(-100%) rotate(-135deg)', top: '50%', boxShadow: 'none', },
        ],
        hidden: [
          { transform: 'translateY(-4rem) rotate(25deg)', top: '50%', },
          { transform: 'translateY(-4rem) rotate(50deg)', top: '50%', },
          { transform: 'translateY(-4rem) rotate(-25deg)', top: '50%', },
        ],
      }
      let h = 0.2
      let state = {}
      if(this.active) state = map.active[i]
      else if(this.hidden) state = map.hidden[i]
      return Object.assign({
        top: ((i * 0.5) + 1.0 - h * 0.5) + 'rem',
        height: h + 'rem',
        transform: 'scale(1)',
        boxShadow: '0 0 0.25rem rgba(0,0,0,.5)',
      }, state)
    },
  },
}
</script>
