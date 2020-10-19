<template>
  <form @submit.prevent="handleSave">
    <div class="flex items-center justify-between">
      <h1 class="mb-4">Game Question Set</h1>
      <button type="button" @click="$emit('back')">&lt; Back</button>
    </div>
    <label for="question-set-name">Enter Question Set Name</label>
    <input
      id="question-set-name"
      v-model="questionSetName"
      name="question-set-name"
      type="text"
      required
    />
    <hr class="mb-4" />
    <h3>Questions / Answers</h3>
    <div v-for="(question, i) in formQuestions" :key="i" class="py-8 border-b">
      <label :for="`question-${i}`"
        >Question #{{ i + 1 }}
        <button
          class="px-1 py-0 mb-2 ml-1 text-base bg-red-600 rounded"
          type="button"
          @click.prevent="formQuestions.splice(i, 1)"
        >
          X
        </button></label
      >
      <input
        :id="`question-${i}`"
        v-model="formQuestions[i].Question"
        :name="`question-${i}`"
        type="text"
        required
      />
      <label :for="`answer-${i}`">Answer #{{ i + 1 }}</label>
      <input
        :id="`answer-${i}`"
        v-model="formQuestions[i].Answer"
        :name="`answer-${i}`"
        type="text"
        required
      />
    </div>
    <button
      class="px-1 py-0 mt-6 text-base text-gray-900 bg-orange-400 rounded"
      type="button"
      @click.prevent="addQuestion"
    >
      Add New Question +
    </button>
    <div class="flex items-center mt-6">
      <button class="mr-4 bg-green-900" type="submit">Save Questions</button>
      <button
        class="text-base text-gray-900 bg-yellow-200"
        type="button"
        @click.prevent="$emit('back')"
      >
        Cancel without Saving
      </button>
      <button
        class="ml-auto text-base text-gray-900 bg-red-600 mr-7"
        type="button"
        @click.prevent="
          $emit('delete-question-set', questionSet.id)
          $emit('back')
        "
      >
        !!! Delete Question Set !!!
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    questionSet: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      formQuestions: (this.questionSet.id && [
        ...this.questionSet.Questions,
      ]) || [{ Question: '', Answer: '' }],
      questionSetName: this.questionSet.QuestionSetName || '',
    }
  },
  methods: {
    addQuestion() {
      this.formQuestions = [...this.formQuestions, { Question: '', Answer: '' }]
    },
    handleSave() {
      this.$emit('save-question-set', {
        ...this.questionSet,
        QuestionSetName: this.questionSetName,
        Questions: this.formQuestions,
      })
      this.$emit('back')
    },
  },
})
</script>

<style scoped>
input {
  @apply block mb-5 w-full;
}
</style>
