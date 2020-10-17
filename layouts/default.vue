<template>
  <div class="bg-blue-600 min-h-screen text-white font-semibold">
    <main class="max-w-screen-xl m-auto">
      <h1>test</h1>
      <h2>test</h2>
      <h3>test</h3>
      <nuxt />
    </main>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;500;700&display=swap');

html,
body {
  font-family: 'Roboto', sans-serif;
}

h1 {
  @apply text-5xl;
}
h2 {
  @apply text-4xl;
}
h3 {
  @apply text-2xl;
}
a {
  @apply text-blue-600 underline;
}
</style>
