<template>
  <login-screen v-if="!isLoggedIn" @logged-in="isLoggedIn = true" />
  <admin-firestore-slot v-else v-slot="{ data, functions }">
    <div v-if="data.gameMetadata">
      <dashboard-screen
        v-if="
          !data.gameMetadata.HasGameStarted &&
          currentScreen === 'DashboardScreen'
        "
        :question-sets="data.questionSets"
        @start-game="
          functions.openForTeams($event.id)
          loadedQuestionSet = $event
        "
        @edit-game="
          currentScreen = 'EditGameScreen'
          loadedQuestionSet = $event
        "
      />
      <edit-game-screen
        v-else-if="
          !data.gameMetadata.HasGameStarted &&
          currentScreen === 'EditGameScreen'
        "
        :question-set="loadedQuestionSet"
        @back="
          currentScreen = 'DashboardScreen'
          loadedQuestionSet = {}
        "
        @save-question-set="functions.saveQuestionSet($event)"
        @delete-question-set="functions.deleteQuestionSet($event)"
      />
      <team-logging-in-screen
        v-else-if="
          data.gameMetadata.HasGameStarted &&
          data.gameMetadata.QuestionNumber === 0
        "
        :teams="data.teams"
        @start-game="functions.nextQuestion"
        @delete-team="functions.deleteTeam($event.id)"
      />
      <game-over-screen
        v-else-if="
          data.gameMetadata.HasGameStarted &&
          data.questionSets[0] &&
          data.gameMetadata.QuestionNumber >
            data.questionSets.find(
              set => set.id === data.gameMetadata.QuestionSetId
            ).Questions.length
        "
        @reset-game="functions.endGame"
      />
      <view-answers-screen
        v-else-if="
          data.gameMetadata.HasGameStarted &&
          data.gameMetadata.QuestionNumber > 0
        "
        :teams="data.teams"
        :meta-data="data.gameMetadata"
        :question-set="loadedQuestionSet"
        @next-question="functions.nextQuestion"
      />
      <div v-else>
        You shouldn't be seeing this. Something went wrong. My B.
      </div>
    </div>
    <spinner v-else />
  </admin-firestore-slot>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import adminFirestoreSlot from '~/services/adminFirestoreSlot.vue'
import Spinner from '~/components/Spinner.vue'
import LoginScreen from '~/screens/admin/LoginScreen.vue'
import DashboardScreen from '~/screens/admin/DashboardScreen.vue'
import TeamLoggingInScreen from '~/screens/admin/TeamLoggingInScreen.vue'
import ViewAnswersScreen from '~/screens/admin/ViewAnswersScreen.vue'
import EditGameScreen from '~/screens/admin/EditGameScreen.vue'
import GameOverScreen from '~/screens/admin/GameOverScreen.vue'

export default defineComponent({
  components: {
    adminFirestoreSlot,
    LoginScreen,
    DashboardScreen,
    TeamLoggingInScreen,
    ViewAnswersScreen,
    EditGameScreen,
    GameOverScreen,
    Spinner,
  },
  data: () => ({
    isLoggedIn: false,
    currentScreen: 'DashboardScreen',
    loadedQuestionSet: {},
  }),
  watch: {
    currentScreen() {
      window.scrollTo(0, 0)
    },
  },
})
</script>
