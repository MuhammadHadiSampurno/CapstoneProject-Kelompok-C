<template>
  <div class="bookmark-page">
    <AppNavbar />

    <main class="bookmark-content">

      <section class="page-header">
        <h1>Bookmark</h1>

        <p>
          Buku yang Anda simpan untuk dibaca kembali.
        </p>
      </section>

      <section class="bookmark-section">

        <div class="section-heading">
          <h2>
            Buku Tersimpan
          </h2>

          <span class="book-count">
            {{ bookmarkedBooks.length }} buku
          </span>
        </div>

        <BookGrid
          v-if="bookmarkedBooks.length > 0"
          :books="bookmarkedBooks"
        />

        <div
          v-else
          class="empty-state"
        >
          <h3>Belum Ada Bookmark</h3>

          <p>
            Simpan buku yang ingin Anda baca kembali
            melalui halaman detail buku.
          </p>

          <router-link
            to="/search-book"
            class="action-button"
          >
            Cari Buku
          </router-link>
        </div>

      </section>

    </main>
  </div>
</template>

<script>
import { computed } from 'vue'

import AppNavbar from '../components/AppNavbar.vue'
import BookGrid from '../components/BookGrid.vue'

import bookData from '../data/bookData'

import {
  getLoggedInUser
} from '../services/authService'

import {
  getBookmarks
} from '../services/storageService'

export default {
  name: 'Bookmark',

  components: {
    AppNavbar,
    BookGrid
  },

  setup() {
    const currentUser = getLoggedInUser()

    const bookmarkedBooks = computed(() => {
      if (!currentUser) {
        return []
      }

      const bookmarkIds = getBookmarks(
        currentUser.id
      )

      return bookmarkIds
        .map(id => {
          return bookData.find(
            book => book.id === id
          )
        })
        .filter(Boolean)
    })

    return {
      bookmarkedBooks
    }
  }
}
</script>

<style scoped>
.bookmark-page {
  min-height: 100vh;
  background-color: var(--color-secondary);
}

.bookmark-content {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;

  padding: 0 32px 60px;
}

.page-header {
  padding: 60px 0 40px;
}

.page-header h1 {
  margin: 0;

  color: var(--color-black);

  font-size: 32px;
  font-weight: 600;
}

.page-header p {
  margin: 8px 0 0;

  color: var(--color-gray);

  font-size: 15px;
}

.bookmark-section {
  width: 100%;
}

.section-heading {
  display: flex;
  align-items: center;
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

.book-count {
  color: var(--color-gray);

  font-size: 14px;
}

.empty-state {
  padding: 70px 20px;

  text-align: center;

  background-color: var(--color-white);

  border: 1px solid var(--color-light-gray);
  border-radius: var(--radius-lg);
}

.empty-state h3 {
  margin: 0;

  color: var(--color-black);

  font-size: 20px;
}

.empty-state p {
  max-width: 500px;

  margin: 10px auto 24px;

  color: var(--color-gray);

  font-size: 14px;
}

.action-button {
  display: inline-block;

  padding: 10px 18px;

  border-radius: var(--radius-sm);

  background-color: var(--color-primary);
  color: var(--color-white);

  font-size: 14px;
  font-weight: 600;
}

.action-button:hover {
  background-color: var(--color-primary-dark);
}

@media (max-width: 768px) {
  .bookmark-content {
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
</style>