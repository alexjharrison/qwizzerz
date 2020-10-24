<template>
  <main>
    <slot
      :data="{
        gameMetadata,
        teamId,
        currentQuestion,
        answeredCurrentQuestion,
        questionSet,
        teamInfo,
        currentAnswer,
      }"
      :functions="{ submitAnswer, setTeamName }"
    >
    </slot>
  </main>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { firestore } from 'firebase'
import { Question } from '~/types'

interface Data {
  gameMetadata: firebase.firestore.DocumentData | any
  teamInfo: firebase.firestore.DocumentData | any
  teamId: string
  questionSet: string[]
}

export default defineComponent({
  data(): Data {
    return {
      gameMetadata: {},
      teamId: '',
      teamInfo: {},
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
    answeredCurrentQuestion(): boolean {
      if (!this.teamInfo.Answers || !this.gameMetadata.QuestionNumber)
        return false
      return Boolean(
        this.teamInfo.Answers[this.gameMetadata.QuestionNumber - 1]
      )
    },
    currentAnswer(): string {
      return !this.teamInfo ||
        !this.teamInfo.Answers ||
        !this.gameMetadata.QuestionNumber ||
        !this.teamInfo.Answers[this.gameMetadata.QuestionNumber - 1]
        ? ''
        : this.teamInfo.Answers[this.gameMetadata.QuestionNumber - 1].Text
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
      this.fetchTeamInfo(id)
    },
    submitAnswer(Text: string, Wager: number): void {
      if (!this.teamId) return

      const Answers = this.teamInfo.Answers.map(({ ...vals }) => ({ ...vals }))
      Answers[this.gameMetadata.QuestionNumber - 1] = { Text, Wager }
      for (let i = 0; i < Answers.length; i++) {
        if (!Answers[i]) Answers[i] = { Text: '', Wager: '' }
      }
      this.$fireStore.collection('Teams').doc(this.teamId).update({ Answers })
    },
    fetchTeamInfo(teamId: string): void {
      if (!teamId) return

      this.$fireStore
        .collection('Teams')
        .doc(teamId)
        .onSnapshot((querySnapshot: firestore.DocumentData) => {
          this.teamInfo = querySnapshot.data()
        })
    },
    fetchQuestions(): void {
      if (!this.gameMetadata.QuestionSetId) return

      const { QuestionSetId } = this.gameMetadata
      this.$fireStore
        .collection('QuestionSets')
        .doc(QuestionSetId)
        .onSnapshot((querySnapshot: firestore.DocumentData) => {
          this.questionSet = querySnapshot
            .data()
            .Questions.map((question: Question) => question.Question)
          this.fetchTeamInfo(this.teamId)
        })
    },
    fetchMetadata(): void {
      this.$fireStore
        .collection('GameMetadata')
        .doc('status')
        .onSnapshot(querySnapshot => {
          if (
            querySnapshot.data()!.QuestionNumber !==
            this.gameMetadata.QuestionNumber
          ) {
          }
          this.gameMetadata = querySnapshot.data()
          this.fetchQuestions()
          if (this.gameMetadata.HasGameStarted === false) this.setTeamId('')
        })
    },
  },
})
</script>
