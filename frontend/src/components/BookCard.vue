<script setup lang="ts">
defineProps({
  book: {
    type: Object,
    default: () => {}
  }
})
</script>

<template>
  <a :href="`/books/${book.id}`" class="group">
    <div
      class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
    >
      <img
        src="../assets/book-cover.jpeg"
        alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
        class="h-full w-full object-cover object-center group-hover:opacity-75"
      />
    </div>
    <h3 class="mt-4 text-xl text-slate-700 font-bold">{{ book.title }}</h3>
    <h4 class="text-sm text-slate-500">Author: {{ book.author }}</h4>
    <p class="mt-1 text-lg font-medium text-slate-900">${{ book.price }}</p>
  </a>
</template>
