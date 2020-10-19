<template>
  <div>
    <h1>Game Has Ended</h1>
    <p class="my-10">Good Game Y'all</p>
    <button @click="$emit('reset-game')">
      Reset Everything, Call it a Night
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({})
</script>
