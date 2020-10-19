<template>
  <div
    class="flex flex-wrap items-center p-4 m-4 border-2 border-white rounded"
  >
    <div>
      <h2 class="self-start font-light">
        {{ questionSet.QuestionSetName }}
      </h2>
      <div class="">
        <div class="mr-4">
          <p class="mt-2 border-t">Created: {{ dateCreated }}</p>
          <p>{{ numQuestions }} Questions</p>
        </div>
      </div>
    </div>
    <div class="ml-12">
      <button class="my-2" @click="$emit('edit-game', questionSet)">
        Edit Questions
      </button>
      <button class="bg-green-600" @click="$emit('start-game', questionSet)">
        Start Game
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    questionSet: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    dateCreated() {
      const date: Date = this.questionSet.DateCreated.toDate()
      return window.Intl.DateTimeFormat('en-US', {}).format(date)
    },
    numQuestions(): string {
      return String(this.questionSet.Questions.length)
    },
  },
})
</script>

<style scoped>
button {
  @apply mx-2 text-2xl;
}
</style>
