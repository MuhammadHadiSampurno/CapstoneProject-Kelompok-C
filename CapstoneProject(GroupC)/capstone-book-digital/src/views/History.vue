<template>
  <div class="history-page">
    <AppNavbar />

    <main class="history-content">

      <section class="page-header">

        <div>
          <h1>History</h1>

          <p>
            Buku yang baru saja Anda buka.
          </p>
        </div>

        <button
          v-if="historyBooks.length > 0"
          type="button"
          class="clear-history-button"
          @click="clearHistoryData"
        >
          Hapus History
        </button>

      </section>

      <section class="history-section">

        <div class="section-heading">
          <h2>
            Riwayat Buku
          </h2>

          <span class="book-count">
            {{ historyBooks.length }} buku
          </span>
        </div>

        <BookGrid
          v-if="historyBooks.length > 0"
          :books="historyBooks"
        />

        <div
          v-else
          class="empty-state"
        >
          <h3>Belum Ada History</h3>

          <p>
            Buku yang Anda buka akan muncul di halaman ini.
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
import {
  computed,
  ref
} from 'vue'

import AppNavbar from '../components/AppNavbar.vue'
import BookGrid from '../components/BookGrid.vue'

import bookData from '../data/bookData'

import {
  getLoggedInUser
} from '../services/authService'

import {
  getHistory,
  clearHistory
} from '../services/storageService'

export default {
  name: 'History',

  components: {
    AppNavbar,
    BookGrid
  },

  setup() {
    const currentUser = getLoggedInUser()

    const historyVersion = ref(0)

    const historyBooks = computed(() => {
      historyVersion.value

      if (!currentUser) {
        return []
      }

      const historyIds = getHistory(
        currentUser.id
      )

      return historyIds
        .map(id => {
          return bookData.find(
            book => book.id === id
          )
        })
        .filter(Boolean)
    })

    function clearHistoryData() {
      if (!currentUser) {
        return
      }

      clearHistory(currentUser.id)

      historyVersion.value++
    }

    return {
      historyBooks,
      clearHistoryData
    }
  }
}
</script>

<style scoped>
.history-page {
  min-height: 100vh;
  background-color: var(--color-secondary);
}

.history-content {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;

  padding: 0 32px 60px;
}

.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  gap: 20px;

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

.clear-history-button {
  flex-shrink: 0;

  padding: 9px 15px;

  border: 1px solid #d1d5db;
  border-radius: var(--radius-sm);

  background-color: var(--color-white);
  color: #6b7280;

  font-size: 13px;
  font-weight: 600;
}

.clear-history-button:hover {
  border-color: #9ca3af;
  color: var(--color-black);
}

.history-section {
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
  .history-content {
    padding: 0 18px 40px;
  }

  .page-header {
    align-items: flex-start;
    flex-direction: column;

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