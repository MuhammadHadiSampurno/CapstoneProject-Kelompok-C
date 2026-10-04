<template>
  <div class="search-book-page">
    <AppNavbar />

    <main class="search-book-content">

      <section class="page-header">
        <h1>Search Book</h1>

        <p>
          Temukan buku berdasarkan judul atau nama penulis.
        </p>
      </section>

      <section class="search-section">
        <div class="search-box-wrapper">
          <input
            v-model="searchKeyword"
            type="text"
            class="search-input"
            placeholder="Cari judul buku atau nama penulis..."
          />

          <button
            v-if="searchKeyword"
            type="button"
            class="clear-button"
            @click="clearSearch"
          >
            ×
          </button>
        </div>
      </section>

      <section class="result-section">

        <div class="result-header">
          <h2>
            {{ searchKeyword ? 'Hasil Pencarian' : 'Semua Buku' }}
          </h2>

          <span class="result-count">
            {{ filteredBooks.length }} buku
          </span>
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
          <h3>Buku tidak ditemukan</h3>

          <p>
            Tidak ada buku yang sesuai dengan kata kunci
            "{{ searchKeyword }}".
          </p>

          <button
            type="button"
            class="reset-button"
            @click="clearSearch"
          >
            Tampilkan Semua Buku
          </button>
        </div>

      </section>

    </main>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import AppNavbar from '../components/AppNavbar.vue'
import BookGrid from '../components/BookGrid.vue'
import bookData from '../data/bookData'

export default {
  name: 'SearchBook',

  components: {
    AppNavbar,
    BookGrid
  },

  setup() {
    const searchKeyword = ref('')

    const filteredBooks = computed(() => {
      const keyword = searchKeyword.value
        .trim()
        .toLowerCase()

      if (!keyword) {
        return bookData
      }

      return bookData.filter(book => {
        const title = book.title.toLowerCase()
        const author = book.author.toLowerCase()

        return (
          title.includes(keyword) ||
          author.includes(keyword)
        )
      })
    })

    function clearSearch() {
      searchKeyword.value = ''
    }

    return {
      searchKeyword,
      filteredBooks,
      clearSearch
    }
  }
}
</script>

<style scoped>
.search-book-page {
  min-height: 100vh;
  background-color: var(--color-secondary);
}

.search-book-content {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 32px 60px;
}

.page-header {
  padding: 60px 0 30px;
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

.search-section {
  margin-bottom: 40px;
}

.search-box-wrapper {
  position: relative;

  width: 100%;
  max-width: 700px;
}

.search-input {
  width: 100%;
  height: 48px;

  padding: 0 48px 0 16px;

  border: 1px solid var(--color-light-gray);
  border-radius: var(--radius-md);

  background-color: var(--color-white);
  color: var(--color-black);

  font-size: 14px;

  outline: none;

  box-shadow: var(--shadow-sm);

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.search-input::placeholder {
  color: #9ca3af;
}

.search-input:focus {
  border-color: var(--color-primary);

  box-shadow:
    0 0 0 3px rgba(0, 91, 170, 0.08);
}

.clear-button {
  position: absolute;

  top: 50%;
  right: 12px;

  width: 28px;
  height: 28px;

  transform: translateY(-50%);

  border: none;
  border-radius: 50%;

  background-color: #f0f2f5;
  color: #6b7280;

  font-size: 20px;
  line-height: 1;

  cursor: pointer;
}

.clear-button:hover {
  background-color: #e5e7eb;
  color: var(--color-black);
}

.result-section {
  width: 100%;
}

.result-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 24px;
}

.result-header h2 {
  margin: 0;

  color: var(--color-black);

  font-size: 24px;
  font-weight: 600;
}

.result-count {
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
  margin: 10px auto 24px;

  color: var(--color-gray);

  font-size: 14px;
}

.reset-button {
  padding: 10px 18px;

  border: 1px solid var(--color-primary);
  border-radius: var(--radius-sm);

  background-color: var(--color-primary);
  color: var(--color-white);

  font-size: 14px;
  font-weight: 600;

  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.reset-button:hover {
  background-color: var(--color-primary-dark);
  border-color: var(--color-primary-dark);
}

@media (max-width: 768px) {
  .search-book-content {
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

@media (max-width: 520px) {
  .result-header {
    align-items: flex-start;
    gap: 10px;
  }
}
</style>