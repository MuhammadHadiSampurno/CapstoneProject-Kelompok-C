<template>
  <div class="category-book-page">
    <AppNavbar />

    <main class="category-book-content">

      <section class="page-header">
        <span class="category-label">
          Category Book
        </span>

        <h1>
          {{ categoryName }}
        </h1>

        <p>
          Koleksi buku berdasarkan kategori {{ categoryName }}.
        </p>
      </section>

      <section class="result-section">

        <div class="result-header">
          <div>
            <h2>
              Buku {{ categoryName }}
            </h2>

            <p>
              {{ filteredBooks.length }} buku tersedia
            </p>
          </div>
        </div>

        <div
          v-if="filteredBooks.length > 0"
          class="book-grid-wrapper"
        >
          <BookGrid :books="filteredBooks" />
        </div>

        <div
          v-else
          class="empty-result"
        >
          <h3>Buku tidak tersedia</h3>

          <p>
            Belum terdapat buku dalam kategori ini.
          </p>
        </div>

      </section>

    </main>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppNavbar from '../components/AppNavbar.vue'
import BookGrid from '../components/BookGrid.vue'
import bookData from '../data/bookData'

export default {
  name: 'CategoryBook',

  components: {
    AppNavbar,
    BookGrid
  },

  setup() {
    const route = useRoute()

    const categoryMap = {
      fiksi: 'Fiksi',
      'non-fiksi': 'Non Fiksi',
      edukasi: 'Edukasi',
      'anak-remaja': 'Anak dan Remaja'
    }

    const categoryName = computed(() => {
      return categoryMap[route.params.category] || 'Kategori'
    })

    const filteredBooks = computed(() => {
      return bookData.filter(
        book => book.category === categoryName.value
      )
    })

    return {
      categoryName,
      filteredBooks
    }
  }
}
</script>

<style scoped>
.category-book-page {
  min-height: 100vh;
  background-color: var(--color-secondary);
}

.category-book-content {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 32px 60px;
}

.page-header {
  padding: 60px 0 40px;
}

.category-label {
  display: inline-block;

  margin-bottom: 10px;
  padding: 5px 10px;

  border-radius: 999px;

  background-color: #eef5fb;
  color: var(--color-primary);

  font-size: 12px;
  font-weight: 600;
}

.page-header h1 {
  margin: 0;

  color: var(--color-black);

  font-size: 32px;
  line-height: 1.3;
  font-weight: 600;
}

.page-header p {
  margin: 8px 0 0;

  color: var(--color-gray);

  font-size: 15px;
}

.result-section {
  width: 100%;
}

.result-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  margin-bottom: 24px;
}

.result-header h2 {
  margin: 0;

  color: var(--color-black);

  font-size: 24px;
  font-weight: 600;
}

.result-header p {
  margin: 5px 0 0;

  color: var(--color-gray);

  font-size: 14px;
}

.empty-result {
  padding: 60px 20px;

  text-align: center;

  background-color: var(--color-white);
  border: 1px solid var(--color-light-gray);
  border-radius: var(--radius-lg);
}

.empty-result h3 {
  margin: 0;

  color: var(--color-black);

  font-size: 20px;
  font-weight: 600;
}

.empty-result p {
  margin: 10px 0 0;

  color: var(--color-gray);

  font-size: 14px;
}

@media (max-width: 768px) {
  .category-book-content {
    padding: 0 18px 40px;
  }

  .page-header {
    padding-top: 40px;
  }

  .page-header h1 {
    font-size: 28px;
  }

  .result-header h2 {
    font-size: 20px;
  }
}
</style>