<template>
  <div v-if="questions.Questions">
    <div class="flex items-center justify-between">
      <h1 class="mb-8">Question #{{ metaData.QuestionNumber }}</h1>
      <button @click="$emit('next-question')">Next Question -></button>
    </div>
    <div v-if="currentQ">
      <h2>Question</h2>
      <p class="mb-4 text-3xl">{{ currentQ.Question }}</p>
      <h2>Answer</h2>
      <p class="mb-8 text-3xl">{{ currentQ.Answer }}</p>
    </div>
    <view-answer-box
      v-for="team in teams"
      :key="team.id"
      :team="team"
      :current-question="metaData.QuestionNumber"
      class="mb-4"
    />
  </div>
  <spinner v-else />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import ViewAnswerBox from '@/components/viewAnswers/ViewAnswerBox.vue'
import Spinner from '~/components/Spinner.vue'

interface Data {
  questions: any
}

export default defineComponent({
  components: { Spinner, ViewAnswerBox },
  props: {
    teams: { type: Array, default: () => [] },
    metaData: { type: Object, default: () => ({}) },
    questionSet: { type: Object, default: () => ({}) },
  },
  data(): Data {
    return {
      questions: this.questionSet,
    }
  },
  computed: {
    currentQ(): any {
      return this.questions.Questions[this.metaData.QuestionNumber - 1]
    },
  },
  async mounted() {
    const { QuestionSetId } = this.metaData
    if (!this.questionSet.Questions) {
      const newQuestionSet = await this.$fireStore
        .collection('QuestionSets')
        .doc(QuestionSetId)
        .get()
      this.questions = newQuestionSet.data()
    }
  },
})
</script>
