<template>
  <div>
    <h3 class="inline text-3xl border-b">{{ team.Name }}</h3>
    <div v-if="currentAnswer" class="font-medium">
      <p>
        Answer: <span class="not-italic">{{ currentAnswer.Text }}</span>
      </p>
      <p>
        Wager: <span class="not-italic">{{ currentAnswer.Wager }}</span>
      </p>
    </div>
    <div v-else class="font-semibold">
      <p>Answer: <span class="pending">pending</span></p>
      <p>Wager: <span class="pending">pending</span></p>
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

<style scoped>
p {
  @apply font-medium text-2xl;
}
span {
  @apply font-light text-2xl;
}
.pending {
  @apply font-light italic text-xl;
}
</style>
