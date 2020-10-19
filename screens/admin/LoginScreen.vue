<template>
  <div class="flex flex-col justify-items-center">
    <h1 class="mb-4">Login To Access Admin</h1>
    <form
      class="flex flex-col items-start w-auto"
      @submit.prevent="handleSubmit"
    >
      <label for="password" class="text-lg">Enter Password</label>
      <input
        id="password"
        v-model="password"
        type="password"
        name="password"
        class="w-1/2 mt-2 mb-4 xl:w-1/2"
        autofocus
      />
      <button type="submit" class="">Login</button>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  setup(_props, { emit }) {
    const password = ref('password')

    const handleSubmit = () => {
      if (password.value === 'password') emit('logged-in')
      else {
        password.value = ''
        window.alert('Password is incorrect')
      }
    }

    return { password, handleSubmit }
  },
})
</script>
