<template>
  <div class="container">{{ questionSets }}</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { firestore } from 'firebase'

interface Data {
  questionSets: firestore.DocumentData | undefined
}

export default defineComponent({
  data(): Data {
    return {
      questionSets: undefined,
    }
  },
})
</script>
