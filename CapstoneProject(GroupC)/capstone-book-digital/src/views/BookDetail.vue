<template>
  <div class="book-detail-page">
    <AppNavbar />

    <main class="book-detail-content">

      <div v-if="book" class="detail-wrapper">

        <router-link
          to="/search-book"
          class="back-link"
        >
          ← Kembali ke Search Book
        </router-link>

        <section class="book-detail-card">

          <div class="book-cover-section">
            <img
              :src="book.cover"
              :alt="`Cover ${book.title}`"
              class="book-cover"
            />
          </div>

          <div class="book-info-section">

            <span class="book-category">
              {{ book.category }}
            </span>

            <h1 class="book-title">
              {{ book.title }}
            </h1>

            <p class="book-author">
              {{ book.author }}
            </p>

            <div class="book-rating-row">

              <span
                v-if="book.rating !== null"
                class="rating"
              >
                ★ {{ book.rating }}
              </span>

              <span
                v-else
                class="rating unavailable"
              >
                Rating belum tersedia
              </span>

              <span class="popularity">
                Popularity {{ book.popularityScore }}
              </span>

            </div>

            <button
              type="button"
              class="bookmark-button"
              :class="{ bookmarked: isBookmarked }"
              @click="toggleBookmark"
            >
              {{ isBookmarked ? '★' : '☆' }}
              {{ isBookmarked
                ? 'Bookmarked'
                : 'Tambah ke Bookmark'
              }}
            </button>

            <div class="book-description">
              <h2>Deskripsi</h2>

              <p>
                {{ book.description }}
              </p>
            </div>

            <div class="book-metadata">

              <div class="metadata-item">
                <span class="metadata-label">
                  Tahun Terbit
                </span>

                <span class="metadata-value">
                  {{ book.publishedDate || 'Tidak tersedia' }}
                </span>
              </div>

              <div class="metadata-item">
                <span class="metadata-label">
                  Publisher
                </span>

                <span class="metadata-value">
                  {{ book.publisher || 'Tidak tersedia' }}
                </span>
              </div>

              <div class="metadata-item">
                <span class="metadata-label">
                  Bahasa
                </span>

                <span class="metadata-value">
                  {{ book.language || 'Tidak tersedia' }}
                </span>
              </div>

              <div class="metadata-item">
                <span class="metadata-label">
                  ISBN
                </span>

                <span class="metadata-value">
                  {{ book.isbn || 'Tidak tersedia' }}
                </span>
              </div>

            </div>

          </div>

        </section>

      </div>

      <section
        v-else
        class="book-not-found"
      >
        <h1>Buku Tidak Ditemukan</h1>

        <p>
          Data buku yang Anda cari tidak tersedia dalam sistem.
        </p>

        <router-link
          to="/dashboard"
          class="back-button"
        >
          Kembali ke Dashboard
        </router-link>
      </section>

    </main>
  </div>
</template>

<script>
import {
  computed,
  onMounted,
  ref
} from 'vue'

import { useRoute } from 'vue-router'

import AppNavbar from '../components/AppNavbar.vue'

import bookData from '../data/bookData'

import {
  getLoggedInUser
} from '../services/authService'

import {
  addBookmark,
  removeBookmark,
  isBookmarked as checkBookmark,
  addHistory
} from '../services/storageService'

export default {
  name: 'BookDetail',

  components: {
    AppNavbar
  },

  setup() {
    const route = useRoute()

    const currentUser = getLoggedInUser()

    const isBookmarked = ref(false)

    const book = computed(() => {
      return bookData.find(
        item => item.id === route.params.id
      ) || null
    })

    function loadBookmarkStatus() {
      if (!currentUser || !book.value) {
        isBookmarked.value = false
        return
      }

      isBookmarked.value = checkBookmark(
        currentUser.id,
        book.value.id
      )
    }

    function recordHistory() {
      if (!currentUser || !book.value) {
        return
      }

      addHistory(
        currentUser.id,
        book.value.id
      )
    }

    function toggleBookmark() {
      if (!currentUser || !book.value) {
        return
      }

      if (isBookmarked.value) {
        removeBookmark(
          currentUser.id,
          book.value.id
        )

        isBookmarked.value = false
      } else {
        addBookmark(
          currentUser.id,
          book.value.id
        )

        isBookmarked.value = true
      }
    }

    onMounted(() => {
      loadBookmarkStatus()
      recordHistory()
    })

    return {
      book,
      isBookmarked,
      toggleBookmark
    }
  }
}
</script>

<style scoped>
.book-detail-page {
  min-height: 100vh;
  background-color: var(--color-secondary);
}

.book-detail-content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  padding: 40px 32px 70px;
}

.detail-wrapper {
  width: 100%;
}

.back-link {
  display: inline-block;

  margin-bottom: 24px;

  color: var(--color-primary);

  font-size: 14px;
  font-weight: 600;
}

.back-link:hover {
  text-decoration: underline;
}

.book-detail-card {
  display: grid;
  grid-template-columns: 320px minmax(0, 1fr);
  gap: 48px;

  padding: 36px;

  background-color: var(--color-white);

  border: 1px solid var(--color-light-gray);
  border-radius: var(--radius-lg);

  box-shadow: var(--shadow-sm);
}

.book-cover-section {
  width: 100%;
}

.book-cover {
  width: 100%;
  height: 450px;

  object-fit: cover;

  border-radius: var(--radius-md);

  background-color: #f3f4f6;
}

.book-info-section {
  min-width: 0;
}

.book-category {
  display: inline-block;

  margin-bottom: 12px;
  padding: 5px 10px;

  border-radius: 999px;

  background-color: #eef5fb;
  color: var(--color-primary);

  font-size: 12px;
  font-weight: 600;
}

.book-title {
  margin: 0;

  color: var(--color-black);

  font-size: 34px;
  line-height: 1.3;
  font-weight: 600;
}

.book-author {
  margin: 10px 0 0;

  color: var(--color-gray);

  font-size: 16px;
}

.book-rating-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;

  margin-top: 18px;
}

.rating {
  color: #b7791f;

  font-size: 14px;
  font-weight: 600;
}

.rating.unavailable {
  color: var(--color-gray);
  font-weight: 400;
}

.popularity {
  color: var(--color-primary);

  font-size: 14px;
  font-weight: 600;
}

.bookmark-button {
  margin-top: 24px;

  padding: 10px 16px;

  border: 1px solid var(--color-primary);
  border-radius: var(--radius-sm);

  background-color: transparent;
  color: var(--color-primary);

  font-size: 14px;
  font-weight: 600;

  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;
}

.bookmark-button:hover {
  background-color: #eef5fb;
}

.bookmark-button.bookmarked {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.bookmark-button.bookmarked:hover {
  background-color: var(--color-primary-dark);
  border-color: var(--color-primary-dark);
}

.book-description {
  margin-top: 32px;
  padding-top: 24px;

  border-top: 1px solid var(--color-light-gray);
}

.book-description h2 {
  margin: 0 0 10px;

  color: var(--color-black);

  font-size: 19px;
  font-weight: 600;
}

.book-description p {
  margin: 0;

  color: #5f6368;

  font-size: 14px;
  line-height: 1.8;
}

.book-metadata {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;

  margin-top: 28px;
  padding-top: 24px;

  border-top: 1px solid var(--color-light-gray);
}

.metadata-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.metadata-label {
  color: var(--color-gray);

  font-size: 12px;
}

.metadata-value {
  color: var(--color-black);

  font-size: 14px;
  font-weight: 500;
}

.book-not-found {
  padding: 80px 20px;

  text-align: center;

  background-color: var(--color-white);

  border: 1px solid var(--color-light-gray);
  border-radius: var(--radius-lg);
}

.book-not-found h1 {
  margin: 0;

  color: var(--color-black);

  font-size: 28px;
}

.book-not-found p {
  margin: 10px 0 24px;

  color: var(--color-gray);

  font-size: 14px;
}

.back-button {
  display: inline-block;

  padding: 10px 18px;

  border-radius: var(--radius-sm);

  background-color: var(--color-primary);
  color: var(--color-white);

  font-size: 14px;
  font-weight: 600;
}

.back-button:hover {
  background-color: var(--color-primary-dark);
}

@media (max-width: 800px) {
  .book-detail-content {
    padding: 30px 18px 50px;
  }

  .book-detail-card {
    grid-template-columns: 1fr;
    gap: 30px;

    padding: 24px;
  }

  .book-cover-section {
    max-width: 280px;
    margin: 0 auto;
  }

  .book-cover {
    height: 390px;
  }

  .book-title {
    font-size: 28px;
  }
}

@media (max-width: 520px) {
  .book-detail-card {
    padding: 18px;
  }

  .book-cover {
    height: 350px;
  }

  .book-title {
    font-size: 24px;
  }

  .book-metadata {
    grid-template-columns: 1fr;
  }
}
</style>