<template>
  <div 
    :style="containerStyle" 
    class="relative w-full overflow-hidden bg-black">
    <img
      ref="tmp"
      :class="imageClass"
      :style="placeholderStyle"
      :src="source(src, placeholder)"
      :alt="alt"
      @load="loaded.placeholder=true"
    >
    <img
      ref="img"
      :class="imageClass"
      :style="realStyle"
      :data-src="source(src, normal)"
      :alt="alt"
      @load="loaded.real=true"
    >
  </div>
</template>

<script>
/*eslint-disable */
// https://gist.github.com/davidtheclark/5515733
function isElementInViewport(el) {
  var rect = el.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  )
}

function calculateSizes() {
  const ratios = {
    square: [1, 1],
    wide: [16, 9],
    ultrawide: [3, 1],
  }
  const widths = {
    auto: 'auto',
    xl: 1920,
    lg: 1600,
    base: 1280,
    sm: 920,
    xs: 640,
    placeholder: 160,
  }
  let sizes = {}
  for (let wk in widths) {
    for (let rk in ratios) {
      sizes[wk + '_' + rk] = [widths[wk], ratios[rk]]
    }
  }
  return sizes
}

function fromWindowSize(i) {
  const size = i ? window.innerHeight : window.innerWidth
  let result = size
  for (let k in imageSizes) {
    if (parseInt(imageSizes[k][i]) < 1) {
      continue
    }
    if (imageSizes[k][i] > size) {
      result = imageSizes[k][i]
    } else if (imageSizes[k][i] < size) {
      break
    }
  }
  return result
}

function imageSize(size, normal = null) {
  if (normal === null) {
    normal = size
  }
  if (size in imageSizes) {
    size = imageSizes[size]
  }
  if (!size instanceof Array || size.length != 2) {
    throw 'Invalid size: ' + JSON.stringify(size)
  }
  for (let i = 0; i < size.length; ++i) {
    const val = size[i]
    if (val == 'auto') {
      if (process.browser) {
        size[i] = fromWindowSize(i)
        continue
      } else {
        size[i] = imageSizes[normal][i]
        continue
      }
    } else if (val instanceof Array) {
      if (val.length != 2) {
        throw 'Invalid ratio for size: ' + JSON.stringify(size)
      }
      size[i] = Math.floor((size[i ? 0 : 1] * val[1]) / val[0])
      continue
    } else if (parseInt(val) < 1) {
      throw 'Invalid size: ' + JSON.stringify(size)
    }
  }
  return size
}

const imageSizes = calculateSizes()

export default {
  props: {
    format: {
      type: String,
      default: 'wide',
    },
    src: {
      type: String,
      default: null,
    },
    alt: {
      type: String,
      default: '',
    },
  },
  data() {
    const normal = 'auto_' + this.format
    const placeholder = 'placeholder_' + this.format
    const size = imageSize(placeholder)
    return {
      loaded: {
        placeholder: false,
        real: false,
      },
      imageClass: 'absolute transition pin-x center-y block w-full',
      placeholder: placeholder,
      normal: normal,
      containerStyle: {
        height: 0,
        paddingTop: (size[1] / size[0]) * 100.0 + '%',
      },
    }
  },
  computed: {
    placeholderStyle() {
      return {
        opacity: this.loaded.placeholder ? 1 : 0,
      }
    },
    realStyle() {
      return {
        opacity: this.loaded.real ? 1 : 0,
      }
    },
  },
  methods: {
    source(url, size = 'auto', quality = 80) {
      if (process.env.imageUrl && url.indexOf('://') == -1) {
        url =
          process.env.imageUrl.replace(/\/$/, '') + '/' + url.replace(/^\//, '')
      }
      if (!process.env.imaginaryUrl) {
        if (size.indexOf('placeholder_') > -1) {
          return url.replace('.jpg', '.placeholder.jpg')
        }
        return url
      }
      size = imageSize(size, this.normal)
      const key = url.indexOf('://') == -1 ? 'file' : 'url'
      if (key == 'url') {
        const imaginaryEnabledUrl = process.env.imaginaryEnabledUrl
        if (
          !imaginaryEnabledUrl ||
          !new RegExp(imaginaryEnabledUrl).test(url)
        ) {
          return url
        }
      }
      return (
        process.env.imaginaryUrl +
        'resize?' +
        key +
        '=' +
        url +
        '&width=' +
        size[0] +
        '&height=' +
        size[1] +
        '&quality=' +
        quality
      )
    },
    loadIfInView() {
      let img = this.$refs.img
      if (isElementInViewport(img)) {
        img.src = img.dataset['src']
        return true
      }
      return false
    },
    scrollListener(event) {
      if (this.loadIfInView()) {
        this.removeEventListeners()
      }
    },
    attachEventListeners() {
      document.addEventListener('scroll', this.scrollListener)
      document.addEventListener('resize', this.scrollListener)
    },
    removeEventListeners() {
      document.removeEventListener('scroll', this.scrollListener)
      document.removeEventListener('resize', this.scrollListener)
    },
  },
  mounted() {
    if (process.browser && !this.loaded.real) {
      const init = () => {
        if (!this.loadIfInView()) {
          this.attachEventListeners()
        }
      }
      if ('requestAnimationFrame' in window) {
        requestAnimationFrame(init)
      } else {
        init()
      }
    }
  },
  destroyed() {
    if (process.browser) {
      this.removeEventListeners()
    }
  },
}
/*eslint-enable */
</script>

<style scoped>
img[lazy='loaded'] {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
}
</style>
