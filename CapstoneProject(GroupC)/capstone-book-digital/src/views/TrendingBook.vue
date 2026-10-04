<template>
  <div class="trending-book-page">
    <AppNavbar />

    <main class="trending-book-content">

      <section class="page-header">
        <span class="trending-label">
          Trending Book
        </span>

        <h1>
          Buku yang Sedang Populer
        </h1>

        <p>
          Koleksi buku yang diurutkan berdasarkan tingkat popularitas.
        </p>
      </section>

      <section class="trending-section">

        <div class="section-heading">
          <div>
            <h2>
              Trending Books
            </h2>

            <p>
              Urutan berdasarkan popularity score tertinggi.
            </p>
          </div>

          <span class="book-count">
            {{ trendingBooks.length }} buku
          </span>
        </div>

        <BookGrid :books="trendingBooks" />

      </section>

    </main>
  </div>
</template>

<script>
import { computed } from 'vue'
import AppNavbar from '../components/AppNavbar.vue'
import BookGrid from '../components/BookGrid.vue'
import bookData from '../data/bookData'

export default {
  name: 'TrendingBook',

  components: {
    AppNavbar,
    BookGrid
  },

  setup() {
    const trendingBooks = computed(() => {
      return [...bookData].sort(
        (a, b) => b.popularityScore - a.popularityScore
      )
    })

    return {
      trendingBooks
    }
  }
}
</script>

<style scoped>
.trending-book-page {
  min-height: 100vh;
  background-color: var(--color-secondary);
}

.trending-book-content {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 32px 60px;
}

.page-header {
  padding: 60px 0 40px;
}

.trending-label {
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

.trending-section {
  width: 100%;
}

.section-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  gap: 20px;
  margin-bottom: 24px;
}

.section-heading h2 {
  margin: 0;

  color: var(--color-black);

  font-size: 24px;
  font-weight: 600;
}

.section-heading p {
  margin: 5px 0 0;

  color: var(--color-gray);

  font-size: 14px;
}

.book-count {
  flex-shrink: 0;

  color: var(--color-gray);

  font-size: 14px;
}

@media (max-width: 768px) {
  .trending-book-content {
    padding: 0 18px 40px;
  }

  .page-header {
    padding-top: 40px;
  }

  .page-header h1 {
    font-size: 28px;
  }

  .section-heading h2 {
    font-size: 20px;
  }
}

@media (max-width: 520px) {
  .section-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }
}
</style>