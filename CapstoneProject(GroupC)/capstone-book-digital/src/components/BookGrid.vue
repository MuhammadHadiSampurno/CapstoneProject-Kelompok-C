<template>
  <div class="book-grid">
    <BookCard
      v-for="book in books"
      :key="book.id"
      :book="book"
    />
  </div>
</template>

<script>
import BookCard from './BookCard.vue'

export default {
  name: 'BookGrid',

  components: {
    BookCard
  },

  props: {
    books: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.book-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
}

@media (max-width: 1100px) {
  .book-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 800px) {
  .book-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
  }
}

@media (max-width: 520px) {
  .book-grid {
    grid-template-columns: 1fr;
  }
}
</style>