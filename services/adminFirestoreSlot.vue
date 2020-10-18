<template>
  <main>
    <slot
      :data="{ gameMetadata, questionSets, teams }"
      :functions="{
        nextQuestion,
        openForTeams,
        endGame,
        saveNewGame,
        updateGameQuestions,
      }"
    />
  </main>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { firestore } from 'firebase'
import { QuestionSet } from '~/types'

interface Data {
  gameMetadata: firebase.firestore.DocumentData | any
  questionSets: firebase.firestore.DocumentData[]
  teams: firebase.firestore.DocumentData[]
}

export default defineComponent({
  data(): Data {
    return {
      gameMetadata: undefined,
      questionSets: [],
      teams: [],
    }
  },
  beforeMount() {
    this.fetchMetadata()
    this.fetchTeams()
    this.fetchQuestionSets()
  },
  methods: {
    fetchMetadata(): void {
      this.$fireStore
        .collection('GameMetadata')
        .doc('status')
        .onSnapshot(querySnapshot => (this.gameMetadata = querySnapshot.data()))
    },
    fetchQuestionSets(): void {
      this.$fireStore.collection('QuestionSets').onSnapshot(querySnapshot => {
        this.questionSets = querySnapshot.docs.reduce(
          (acc: firestore.DocumentData[], doc) => [...acc, doc.data()],
          []
        )
      })
    },
    fetchTeams(): void {
      this.$fireStore.collection('Teams').onSnapshot(querySnapshot => {
        this.teams = querySnapshot.docs.reduce(
          (acc: firestore.DocumentData[], doc) => [...acc, doc.data()],
          []
        )
      })
    },
    nextQuestion(): void {
      this.$fireStore
        .collection('GameMetadata')
        .doc('status')
        .update({
          QuestionNumber: this.gameMetadata.QuestionNumber + 1,
        })
    },
    openForTeams(): void {
      this.$fireStore.collection('GameMetadata').doc('status').update({
        HasGameStarted: true,
      })
    },
    endGame(): void {
      this.$fireStore.collection('GameMetadata').doc('status').update({
        QuestionSetId: null,
        QuestionNumber: 0,
        HasGameStarted: false,
      })
    },
    saveNewGame(newGameQuestions: QuestionSet): void {
      this.$fireStore.collection('QuestionSets').add(newGameQuestions)
    },
    updateGameQuestions(id: string, updateQuestions: QuestionSet): void {
      this.$fireStore.collection('QuestionSets').doc(id).update(updateQuestions)
    },
  },
})
</script>
