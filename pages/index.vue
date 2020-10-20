<template>
  <team-firestore-slot v-slot="{ data, functions }">
    <div v-if="data.gameMetadata">
      <landing-screen
        v-if="
          data.gameMetadata.HasGameStarted === false ||
          data.gameMetadata.QuestionNumber > data.questionSet.length
        "
      />
      <create-team-screen
        v-else-if="data.gameMetadata.QuestionNumber === 0 && !data.teamId"
        @submit-team-name="functions.setTeamName($event)"
      />
      <waiting-to-start-screen
        v-else-if="data.gameMetadata.QuestionNumber === 0 && data.teamId"
      />
      <answering-screen
        v-else-if="
          data.gameMetadata.QuestionNumber > 0 && !data.answeredCurrentQuestion
        "
        :question="data.currentQuestion"
        :question-number="data.gameMetadata.QuestionNumber"
        @erase-current-answer="currentAnswer = null"
        @answer-question="
          currentAnswer = $event.answer
          functions.submitAnswer($event.answer, $event.wager)
        "
      />
      <answered-screen
        v-else-if="
          data.gameMetadata.QuestionNumber > 0 && data.answeredCurrentQuestion
        "
        :question="data.currentQuestion"
        :answer="currentAnswer"
      />
    </div>
  </team-firestore-slot>
</template>

<script lang="ts">
import TeamFirestoreSlot from '@/services/teamFirestoreSlot.vue'
import { defineComponent } from '@vue/composition-api'
import AnsweredScreen from '~/screens/player/AnsweredScreen.vue'
import AnsweringScreen from '~/screens/player/AnsweringScreen.vue'
import LandingScreen from '~/screens/player/LandingScreen.vue'
import CreateTeamScreen from '~/screens/player/CreateTeamScreen.vue'
import WaitingToStartScreen from '~/screens/player/WaitingToStartScreen.vue'

export default defineComponent({
  components: {
    TeamFirestoreSlot,
    AnsweredScreen,
    AnsweringScreen,
    LandingScreen,
    CreateTeamScreen,
    WaitingToStartScreen,
  },
  data() {
    return {
      currentAnswer: null,
    }
  },
})
</script>
