<template>
  <div class="p-4 text-center">
    <h1>Locked In</h1>
    <h2 class="mt-6 mb-2">Question</h2>
    <p class="text-2xl">{{ question }}</p>
    <h2 class="mt-6 mb-2">My Answer</h2>
    <p class="text-2xl">{{ answer }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    question: { type: String, require: true },
    answer: { type: String, required: true },
  },
})
</script>
