<template>
  <div class="text-center">
    <h1>Create a Team Name</h1>
    <form class="mt-12" @submit.prevent="handleSubmit">
      <input
        v-model="name"
        type="text"
        placeholder="enter name"
        required
      /><br />
      <button type="submit" class="mt-4">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  data() {
    return {
      name: '',
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit-team-name', this.name)
    },
  },
})
</script>
