<template>
  <main>
    <slot
      :data="{ gameMetadata, teamId, currentQuestion }"
      :functions="{ submitAnswer, setTeamName }"
    />
  </main>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { firestore } from 'firebase'
import { Question } from '~/types'

interface Data {
  gameMetadata: firebase.firestore.DocumentData | any
  teamId: string
  questionSet: string[]
}

export default defineComponent({
  data(): Data {
    return {
      gameMetadata: {},
      teamId: '',
      questionSet: [],
    }
  },
  beforeMount() {
    this.teamId = window.localStorage.getItem('team_id') || ''
    this.fetchMetadata()
  },
  watch: {
    'gameMetadata.HasGameStarted'(val) {
      if (val === false) this.setTeamId('')
    },
  },
  computed: {
    currentQuestion(): string {
      return this.questionSet[this.gameMetadata.QuestionNumber - 1] || ''
    },
  },
  methods: {
    setTeamName(name: string): void {
      this.$fireStore
        .collection('Teams')
        .add({ Name: name, Answers: [] })
        .then(res => {
          this.setTeamId(res.id)
        })
    },
    setTeamId(id: string): void {
      this.teamId = id
      window.localStorage.setItem('team_id', this.teamId)
    },
    submitAnswer(answer: string, wager: number): void {
      this.$fireStore
        .collection('Teams')
        .doc(this.teamId)
        .update({
          Answers: firestore.FieldValue.arrayUnion({
            Text: answer,
            Wager: wager,
            QuestionNumber: this.gameMetadata.QuestionNumber,
          }),
        })
    },
    fetchQuestions(): void {
      const { QuestionSetId } = this.gameMetadata
      this.$fireStore
        .collection('QuestionSets')
        .doc(QuestionSetId)
        .onSnapshot((querySnapshot: firestore.DocumentData) => {
          this.questionSet = querySnapshot
            .data()
            .Questions.map((question: Question) => question.Question)
        })
    },
    fetchMetadata(): void {
      this.$fireStore
        .collection('GameMetadata')
        .doc('status')
        .onSnapshot(querySnapshot => {
          this.gameMetadata = querySnapshot.data()
          this.fetchQuestions()
          if (this.gameMetadata.HasGameStarted === false) this.setTeamId('')
        })
    },
  },
})
</script>
