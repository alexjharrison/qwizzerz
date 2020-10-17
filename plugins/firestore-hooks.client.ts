// import { Context } from '@nuxt/types'
// // import { Inject } from '@nuxt/types/app'
// import { reactive } from '@vue/composition-api'
// import Vue from 'vue'

// export default ({ app: { $fireStore } }: Context /*, inject: Inject*/) => {
//   // inject('fetch', { fetchGameStatus })
//   Vue.prototype.$fetch = { fetchGameStatus }

//   let gameStatus: any
//   function fetchGameStatus() {
//     $fireStore
//       .collection('GameMetadata')
//       .doc('status')
//       .onSnapshot((status) => (gameStatus = reactive({ ...status.data() })))
//     return gameStatus
//   }
// }
