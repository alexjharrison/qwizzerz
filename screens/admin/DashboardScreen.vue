<template>
  <div>
    <h1 class="text-center">Admin Dashboard</h1>
    <section>
      <h2>Create a new Question Set</h2>
      <p>Click below to populate questions for a new game</p>
      <button
        class="mt-5 text-2xl text-gray-900 bg-orange-400 border-blue-800"
        @click="$emit('edit-game')"
      >
        Create New Set
      </button>
    </section>
    <hr />
    <section>
      <h2>Saved Games</h2>
      <select-game-box
        v-for="questionSet in questionSets"
        :key="questionSet.id"
        :question-set="questionSet"
        @edit-game="$emit('edit-game', $event)"
        @start-game="$emit('start-game', $event)"
      />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import SelectGameBox from '~/components/dashboard/SelectGameBox.vue'

export default defineComponent({
  props: {
    questionSets: {
      type: Array,
      default: () => [],
    },
  },
  components: { SelectGameBox },
})
</script>

<style scoped>
section {
  @apply my-12;
}
</style>
