<template>
  <div>
    <h3 class="inline text-3xl border-b">{{ team.Name }}</h3>
    <div v-if="currentAnswer" class="font-medium">
      <p class="text-2xl font-medium">
        Answer:
        <span class="text-2xl not-italic font-light">{{
          currentAnswer.Text
        }}</span>
      </p>
      <p class="text-2xl font-medium">
        Wager:
        <span class="text-2xl not-italic font-light">{{
          currentAnswer.Wager
        }}</span>
      </p>
    </div>
    <div v-else class="font-semibold">
      <p class="text-2xl font-medium">
        Answer:
        <span class="text-2xl italic font-light">pending</span>
      </p>
      <p class="text-2xl font-medium">
        Wager:
        <span class="text-2xl italic font-light">pending</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    team: { type: Object, default: () => ({}) },
    currentQuestion: { type: Number, required: true },
  },
  computed: {
    currentAnswer(): number {
      return this.team.Answers[this.currentQuestion - 1]
    },
  },
})
</script>
