<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import BookCard from '../BookCard.vue'

let books = ref([])

const fetchBooks = async () => {
  try {
    const response = await axios.get('/books')
    books.value = response.data.books
  } catch (err) {
    console.log(err)
  }
}
onMounted(() => {
  fetchBooks()
})
</script>
<template>
  <div class="bg-white" id="Products">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 class="sr-only">Books</h2>
      <h2 class="text-center text-2xl mb-16 font-bold">Books</h2>
      <div
        class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
      >
        <BookCard v-for="book in books" :key="book.id" :book="book" />
      </div>
    </div>
  </div>
</template>
