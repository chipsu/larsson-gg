<template>
  <div class="overflow-hidden">
    <div ref="top" class="fixed z-50 pin-l pin-r" @mousemove="topHidden=false">
      <div class="container mx-auto relative h-0">
        <div class="transition" :style="topStyle">
          <div class="flex items-center">
            <nuxt-link to="/" class="md:hidden transition px-4"  :style="logoStyle">
              <Logo class="text-xl" />
            </nuxt-link>
            <nuxt-link to="/" class="hidden md:block transition px-4" :style="mdLogoStyle">
              <Logo class="text-xl" />
            </nuxt-link>
            <Burger class="mx-2 w-12 h-12 ml-auto" :active="menuOpen" :hidden="topHidden" @click.native="toggleMenu()" />
          </div>
        </div>
      </div>
    </div>

    <div ref="nav" class="fixed z-40 pin-l pin-r">
      <div class="container mx-auto relative h-0">
        <div class="transition overflow-hidden flex items-center justify-center" :style="menuStyle">
          <div class="text-center text-white">
            <pre style="display:none">
            https://cloud.docker.com/repository/docker/chipu/larsson-gg
            https://github.com/chipsu/larsson-gg
            404 cute
            tests

            {{$route.path}}
            </pre>
            <div class="flex flex-col">
              <nuxt-link class="transition px-8 py-2 my-2 text-3xl hover:bg-red" to="/blog/" @click="toggleMenu">Blog</nuxt-link>
              <nuxt-link class="transition px-8 py-2 my-2 text-3xl hover:bg-red" to="/blog/" @click="toggleMenu">Github</nuxt-link>
              <nuxt-link class="transition px-8 py-2 my-2 text-3xl hover:bg-red" to="/blog/" @click="toggleMenu">DockerHub</nuxt-link>
              <div class="p-2 mt-8">
                version:{{buildVersion}}
              </div>
              <div class="p-2">
                <a href="https://travis-ci.org/chipsu/larsson-gg" target="_blank">
                  <img src="https://travis-ci.org/chipsu/larsson-gg.svg?branch=master" />
                </a>
              </div>
            </div>
          </div>
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
      buildVersion: process.env.buildVersion
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
        document.addEventListener('keydown', this.onKeyDown)

        // Reveal top nav
        setTimeout(() => {
          this.topHidden = false
        }, 500)

        // Close menu on navigation
        this.$router.beforeEach((to, from, next) => {
          this.toggleMenu(false)
          next()
        })
      }
    },
    removeListeners() {
      if (process.browser) {
        document.removeEventListener('scroll', this.onScroll)
        document.removeEventListener('keydown', this.onKeyDown)
      }
    },
    onScroll(event) {
      let delta = window.scrollY - this.scrollY
      this.topHidden = window.scrollY < 0 || delta > 0
      this.scrollY = window.scrollY
    },
    onKeyDown(event) {
      if (event.keyCode == 27) {
        this.toggleMenu(false)
      }
    },
    toggleMenu(open = null) {
      this.menuOpen = open === null ? !this.menuOpen : open
    }
  },
  computed: {
    topStyle() {
      return {
        background: 'rgba(0,0,0,' + (this.topHidden || this.menuOpen ? '0' : '0.1') + ')',
      }
    },
    logoStyle() {
      const visible = this.menuOpen || !this.topHidden
      return {
        transform: visible ? 'translateY(0%)' : 'translateY(-200%)',
      }
    },
    mdLogoStyle() {
      const visible = this.$route.path == '/' ? this.menuOpen : this.menuOpen || !this.topHidden
      return {
        transform: visible ? 'translateY(0%)' : 'translateY(-200%)',
        opacity: visible ? 1 : 0,
      }
    },
    menuStyle() {
      return {
        height: this.menuOpen ? '100vh' : 0,
        background: 'rgba(0,0,0,.75)',
        transform: this.menuOpen ? 'translateY(0%)' : 'translateY(-100%)',
      }
    }
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
