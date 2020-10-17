<template>
  <admin-firestore-slot v-slot="slotProps">
    {{ slotProps }}
    <button @click="slotProps.functions.endGame">reset me</button>
  </admin-firestore-slot>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import adminFirestoreSlot from '~/services/adminFirestoreSlot.vue'

export default defineComponent({
  components: { adminFirestoreSlot },
})
</script>
