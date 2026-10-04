<template>
  <div class="dashboard-page">
    <AppNavbar />

    <main class="dashboard-content">

      <section class="welcome-section">
        <h1>
          Selamat Datang dan Rasakan Kenikmatan Membaca
        </h1>

        <p class="quote">
          “Aku rela di penjara asalkan bersama buku,
          karena dengan buku aku bebas.”
        </p>

        <p class="quote-author">
          — Mohammad Hatta
        </p>
      </section>

      <section class="user-section">
        <p v-if="currentUser">
          Selamat datang, <strong>{{ currentUser.name }}</strong>
        </p>
      </section>

      <section class="book-section">
        <div class="section-heading">
          <div>
            <h2>Koleksi Buku</h2>

            <p class="section-description">
              Koleksi buku yang tersedia dalam sistem.
            </p>
          </div>

          <router-link
            to="/search-book"
            class="view-all"
          >
            Lihat Semua
          </router-link>
        </div>

        <BookGrid :books="books" />
      </section>

    </main>
  </div>
</template>

<script>
import { getLoggedInUser } from '../services/authService'
import AppNavbar from '../components/AppNavbar.vue'
import BookGrid from '../components/BookGrid.vue'
import bookData from '../data/bookData'

export default {
  name: 'Dashboard',

  components: {
    AppNavbar,
    BookGrid
  },

  data() {
    return {
      currentUser: getLoggedInUser(),
      books: bookData
    }
  }
}
</script>

<style scoped>
.dashboard-page {
  min-height: 100vh;
  background-color: var(--color-secondary);
}

.dashboard-content {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 32px 60px;
}

.welcome-section {
  text-align: center;
  padding: 90px 20px 30px;
}

.welcome-section h1 {
  max-width: 850px;
  margin: 0 auto;

  color: var(--color-black);

  font-size: 36px;
  line-height: 1.3;
  font-weight: 600;
}

.quote {
  max-width: 700px;
  margin: 26px auto 4px;

  color: #5f6368;

  font-size: 17px;
  line-height: 1.7;
  font-weight: 400;
}

.quote-author {
  margin: 0;

  color: #6b7280;

  font-size: 15px;
  font-weight: 400;
}

.user-section {
  text-align: center;
  margin-top: 4px;
}

.user-section p {
  margin: 0;

  color: #6b7280;
  font-size: 14px;
  font-weight: 400;
}

.book-section {
  margin-top: 70px;
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

.section-description {
  margin: 5px 0 0;

  color: var(--color-gray);

  font-size: 14px;
}

.view-all {
  flex-shrink: 0;

  color: var(--color-primary);

  font-size: 14px;
  font-weight: 600;
}

.view-all:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .dashboard-content {
    padding: 0 18px 40px;
  }

  .welcome-section {
    padding-top: 60px;
  }

  .welcome-section h1 {
    font-size: 28px;
  }

  .quote {
    font-size: 15px;
  }

  .section-heading {
    align-items: flex-start;
  }

  .section-heading h2 {
    font-size: 20px;
  }
}

@media (max-width: 520px) {
  .section-heading {
    flex-direction: column;
    gap: 10px;
  }
}
</style>