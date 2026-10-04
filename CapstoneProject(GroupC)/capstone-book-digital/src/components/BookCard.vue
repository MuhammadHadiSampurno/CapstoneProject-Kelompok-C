<template>
  <router-link
    :to="{
      name: 'BookDetail',
      params: {
        id: book.id
      }
    }"
    class="book-card-link"
  >
    <article class="book-card">

      <div class="book-cover-wrapper">
        <img
          :src="book.cover"
          :alt="`Cover ${book.title}`"
          class="book-cover"
        />
      </div>

      <div class="book-content">

        <span class="book-category">
          {{ book.category }}
        </span>

        <h3 class="book-title">
          {{ book.title }}
        </h3>

        <p class="book-author">
          {{ book.author }}
        </p>

        <div class="book-meta">

          <span
            v-if="book.rating !== null"
            class="book-rating"
          >
            ★ {{ book.rating }}
          </span>

          <span
            v-else
            class="book-rating unavailable"
          >
            Rating belum tersedia
          </span>

          <span class="book-popularity">
            Popularity {{ book.popularityScore }}
          </span>

        </div>

      </div>

    </article>
  </router-link>
</template>

<script>
export default {
  name: 'BookCard',

  props: {
    book: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.book-card-link {
  display: block;

  color: inherit;
  text-decoration: none;
}

.book-card {
  width: 100%;
  overflow: hidden;

  background-color: var(--color-white);
  border: 1px solid var(--color-light-gray);
  border-radius: var(--radius-lg);

  box-shadow: var(--shadow-sm);

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.book-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.book-cover-wrapper {
  width: 100%;
  height: 280px;

  overflow: hidden;

  background-color: #f3f4f6;
}

.book-cover {
  width: 100%;
  height: 100%;

  object-fit: cover;

  transition: transform 0.25s ease;
}

.book-card:hover .book-cover {
  transform: scale(1.02);
}

.book-content {
  padding: 16px;
}

.book-category {
  display: inline-block;

  margin-bottom: 8px;
  padding: 4px 9px;

  border-radius: 999px;

  background-color: #eef5fb;
  color: var(--color-primary);

  font-size: 11px;
  font-weight: 600;
}

.book-title {
  margin: 0 0 7px;

  color: var(--color-black);

  font-size: 17px;
  line-height: 1.4;
  font-weight: 600;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.book-author {
  min-height: 42px;

  margin: 0;

  color: var(--color-gray);

  font-size: 13px;
  line-height: 1.6;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.book-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 8px;

  margin-top: 14px;
  padding-top: 12px;

  border-top: 1px solid #f0f0f0;

  font-size: 12px;
}

.book-rating {
  color: #b7791f;
  font-weight: 600;
}

.book-rating.unavailable {
  color: var(--color-gray);
  font-weight: 400;
}

.book-popularity {
  color: var(--color-primary);
  font-weight: 600;
}

@media (max-width: 768px) {
  .book-cover-wrapper {
    height: 240px;
  }

  .book-content {
    padding: 14px;
  }

  .book-title {
    font-size: 16px;
  }
}
</style>