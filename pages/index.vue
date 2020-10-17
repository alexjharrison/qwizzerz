<template>
  <team-firestore-slot v-slot="slotProps">
    {{ slotProps }}
    <button @click="slotProps.functions.setTeamName('poopers')">
      set team name
    </button>
    <button @click="slotProps.functions.submitAnswer('my answer', 2)">
      submit answer
    </button>
  </team-firestore-slot>
</template>

<script lang="ts">
import TeamFirestoreSlot from '@/services/teamFirestoreSlot.vue'
import { defineComponent } from '@vue/composition-api'
import { firestore } from 'firebase'

interface Data {
  questionSets: firestore.DocumentData | undefined
}

export default defineComponent({
  components: { TeamFirestoreSlot },
})
</script>
