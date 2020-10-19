<template>
  <div>
    <h1>Teams Logging In</h1>
    <p>
      Press the X to delete a team before the game starts in case of duplicates
    </p>
    <button class="my-8 text-2xl" @click="$emit('start-game')">
      Start Game
    </button>
    <br />
    <h2 class="inline border-b">Teams Currently Aboard</h2>
    <ul class="ml-5">
      <li
        v-for="team in teams"
        :key="team.id"
        class="my-5 text-3xl font-semibold"
      >
        <button
          class="px-2 py-1 text-sm bg-red-600 rounded"
          @click="$emit('delete-team', team)"
        >
          X
        </button>
        {{ team.Name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    teams: { type: Array, default: () => [] },
  },
})
</script>
