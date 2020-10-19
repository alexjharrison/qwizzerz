<template>
  <main>
    <slot
      :data="{ gameMetadata, questionSets, teams }"
      :functions="{
        nextQuestion,
        openForTeams,
        endGame,
        saveQuestionSet,
        deleteQuestionSet,
        deleteTeam,
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
      this.$fireStore
        .collection('QuestionSets')
        .orderBy('DateCreated', 'desc')
        .onSnapshot(querySnapshot => {
          this.questionSets = querySnapshot.docs.reduce(
            (acc: firestore.DocumentData[], doc) => [
              ...acc,
              { ...doc.data(), id: doc.id },
            ],
            []
          )
        })
    },
    fetchTeams(): void {
      this.$fireStore.collection('Teams').onSnapshot(querySnapshot => {
        this.teams = querySnapshot.docs.reduce(
          (acc: firestore.DocumentData[], doc) => [
            ...acc,
            { ...doc.data(), id: doc.id },
          ],
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
    openForTeams(gameId: string): void {
      this.$fireStore.collection('GameMetadata').doc('status').update({
        HasGameStarted: true,
        QuestionSetId: gameId,
      })
    },
    endGame(): void {
      this.$fireStore.collection('GameMetadata').doc('status').update({
        QuestionSetId: null,
        QuestionNumber: 0,
        HasGameStarted: false,
      })
      this.$fireStore
        .collection('Teams')
        .get()
        .then(docs => {
          docs.forEach(doc => doc.ref.delete())
        })
    },
    saveQuestionSet(questionSet: QuestionSet): void {
      const { id, ...questionSetWithoutId } = questionSet
      if (id) {
        this.$fireStore
          .collection('QuestionSets')
          .doc(id)
          .update(questionSetWithoutId)
      } else {
        this.$fireStore.collection('QuestionSets').add({
          ...questionSetWithoutId,
          DateCreated: firestore.Timestamp.now(),
        })
      }
    },
    deleteQuestionSet(id: string): void {
      this.$fireStore.collection('QuestionSets').doc(id).delete()
    },
    deleteTeam(id: string): void {
      this.$fireStore.collection('Teams').doc(id).delete()
    },
  },
})
</script>
