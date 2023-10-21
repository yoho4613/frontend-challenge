<script lang="ts" setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import BookDetailCard from '../components/BookDetailCard.vue'

const route = useRoute()

const book = ref({})
const isLoading = ref(false)

let isPurchase = ref(false)

const purchaseBook = async (id: string) => {
  if (id) {
    try {
      isPurchase.value = true
      const response = await axios.post(`/books/${id}/purchase`)
      if (response.status === 200) {
        const { data } = response
        await fetchBook()
        alert(`You have successfully purchased ${data?.book?.title}`)
        isPurchase.value = false
      }
    } catch (err) {
      console.log(err)
      isPurchase.value = false
    }
  }
}

const fetchBook = async () => {
  try {
    const response = await axios.get(`/books/${route.params.slug}`)
    book.value = response.data.book
  } catch (err) {
    console.log(err)
    isLoading.value = false
  }
}

onMounted(async () => {
  isLoading.value = true
  await fetchBook()
  isLoading.value = false
})
</script>
<template>
  <div>
    <span v-if="isLoading" class="fixed h-screen w-screen flex justify-center items-center">
      <svg
        class="animate-spin -ml-1 mr-3 h-10 w-10 text-indigo-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </span>
    <BookDetailCard v-else :book="book" @purchase="purchaseBook" :isPurchase="isPurchase" />
  </div>
</template>
