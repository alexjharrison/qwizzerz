<template>
  <div class="min-h-screen font-semibold text-white bg-blue-600">
    <app-header class="mb-4" />
    <main class="max-w-screen-xl m-auto xl:px-8 md:px-3">
      <nuxt />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import AppHeader from '~/components/AppHeader.vue'

export default defineComponent({
  components: { AppHeader },
})
</script>

<style>
html,
body {
  font-family: 'Roboto', sans-serif;
}

* {
  @apply text-lg;
}

h1 {
  @apply text-5xl leading-none font-medium;
}
h2 {
  @apply text-4xl leading-none font-medium;
}
h3 {
  @apply text-2xl leading-none font-medium;
}
a {
  @apply text-blue-600 underline;
}
p,
a,
span,
label,
div {
  @apply font-light;
}
button {
  @apply text-xl border border-purple-900 bg-purple-600 rounded-xl py-1 px-2;
}
input {
  @apply text-lg p-1 text-black rounded border border-blue-300;
}
</style>
