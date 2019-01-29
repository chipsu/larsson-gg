<template>
  <div class="px-4 py-8 lg:py-24">
    <h2 v-if="this.$slots.heading" class="text-2xl lg:text-5xl font-bold text-red uppercase mb-4">
      <slot name="heading" />
    </h2>
    <slot />
  </div>
</template>
