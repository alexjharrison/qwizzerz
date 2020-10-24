<template>
  <div class="p-6 text-center">
    <h1>Question #{{ questionNumber }}</h1>
    <p class="mt-5 text-2xl">{{ question }}</p>
    <form
      class="flex flex-col"
      @submit.prevent="$emit('answer-question', { answer, wager })"
    >
      <label for="answer">Answer</label>
      <textarea
        id="answer"
        v-model="answer"
        name="answer"
        type="text"
        class="p-2 text-black"
        required
      />
      <label for="wager">Wager</label>
      <input
        id="wager"
        v-model.number="wager"
        name="wager"
        type="number"
        class="w-16 m-auto text-center"
        required
      />
      <button type="submit" class="self-center mt-8">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    question: { type: String, required: true },
    questionNumber: { type: Number, required: true },
  },
  data: () => ({ answer: null, wager: null }),
})
</script>
