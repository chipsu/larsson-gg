<template>
  <svg
    :viewBox="viewBox"
  >
    <g
      v-for="(_, x) in w"
      :key="x"
    >
      <rect
        v-for="(_, y) in h"
        :key="y"
        :x="x"
        :y="y"
        :opacity="opacity(x, y)"
        :fill="fill"
        width="1"
        height="1"
      />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    w: {
      type: Number,
      default: 4,
    },
    h: {
      type: Number,
      default: 8,
    },
    fill: {
      type: String,
      default: '#fff',
    },
  },
  data() {
    return {
      viewBox: '0 0 ' + this.w + ' ' + this.h,
    }
  },
  methods: {
    opacity(x, y) {
      const w = this.w
      const xx = ((w - x) * 0.75) / w
      const zz = (w - x) * 0.15
      return xx + Math.random() * zz
    },
  },
}
</script>
