<template>
  <div>
    <!-- TODO: This becomes visible once hero is not in viev -->
    <!-- <div class="container mx-auto px-4 py-2">
      <div class="flex">
        <logo />
        <div class="ml-auto">[MENU]</div>
      </div>
    </div> -->

    <div ref="top" class="fixed z-10 pin-l pin-r" @mousemove="topHidden=false">
      <div class="container mx-auto relative h-0">
        <div class="transition" :style="topStyle" style="background:rgba(0,0,0,.1)">
          <Burger class="mx-2 w-12 h-12 ml-auto" :active="menuOpen" :hidden="topHidden" @click.native="toggleMenu" />
        </div>
      </div>
    </div>

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
import Logo from '~/components/Logo.vue'
import Burger from '~/components/Burger.vue'

export default {
  components: {
    Logo,
    Burger
  },
  data() {
    return {
      topHidden: true,
      scrollY: 0,
      menuOpen: false,
      menuWidth: '16rem'
    }
  },
  mounted() {
    this.$nextTick(this.addListeners)
  },
  beforeDestroy() {
    this.removeListeners()
  },
  methods: {
    addListeners() {
      if (process.browser) {
        // Hide top on scroll down
        document.addEventListener('scroll', this.onScroll)

        // Reveal top nav
        setTimeout(() => {
          this.topHidden = false
        }, 500)
      }
    },
    removeListeners() {
      if (process.browser) {
        document.removeEventListener('scroll', this.onScroll)
      }
    },
    onScroll(event) {
      let delta = window.scrollY - this.scrollY
      this.topHidden = window.scrollY < 0 || delta > 0
      this.scrollY = window.scrollY
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen
    }
  },
  computed: {
    topStyle() {
      return {
        transform: this.menuOpen ? 'translateX(-' + this.menuWidth + ')' : '',
      }
    },
  }
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

.menu {
  transform: translateX(0%);
  transition: all .3s ease-in-out;
}

.slide-enter-active .menu,
.slide-leave-active .menu {
  transform: translateX(-100%);
}

.slide-enter-active .overlay,
.slide-leave-active .overlay {
  opacity: 0 !important;
}

.gradient {
  background: linear-gradient(to right, rgba(0,0,0,.8), transparent)
}
</style>
