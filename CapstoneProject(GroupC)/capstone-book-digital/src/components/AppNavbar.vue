<template>
  <header class="navbar">
    <div class="navbar-container">
      <!-- Logo -->
      <router-link to="/dashboard" class="navbar-brand">
        <img
          src="../assets/images/logo-ut.png"
          alt="Logo Universitas Terbuka"
          class="navbar-logo"
        />
      </router-link>

      <!-- Navigation -->
      <nav class="navbar-menu">
        <router-link
          to="/dashboard"
          class="nav-link"
          active-class="active"
        >
          Dashboard
        </router-link>

        <router-link
          to="/search-book"
          class="nav-link"
          active-class="active"
        >
          Search Book
        </router-link>

        <!-- Category -->
        <div class="category-wrapper">
          <button
            type="button"
            class="nav-link category-button"
            @click="toggleCategory"
          >
            Category Book
            <span class="category-arrow">
              {{ showCategory ? '▲' : '▼' }}
            </span>
          </button>

          <div
            v-if="showCategory"
            class="category-dropdown"
          >
            <router-link
              to="/category/fiksi"
              class="category-link"
              @click="closeCategory"
            >
              Fiksi
            </router-link>

            <router-link
              to="/category/non-fiksi"
              class="category-link"
              @click="closeCategory"
            >
              Non Fiksi
            </router-link>

            <router-link
              to="/category/edukasi"
              class="category-link"
              @click="closeCategory"
            >
              Edukasi
            </router-link>

            <router-link
              to="/category/anak-remaja"
              class="category-link"
              @click="closeCategory"
            >
              Anak dan Remaja
            </router-link>
          </div>
        </div>

        <router-link
          to="/trending-book"
          class="nav-link"
          active-class="active"
        >
          Trending Book
        </router-link>

        <router-link
          to="/bookmark"
          class="nav-link"
          active-class="active"
        >
          Bookmark
        </router-link>

        <router-link
          to="/history"
          class="nav-link"
          active-class="active"
        >
          History
        </router-link>

        <router-link
          to="/premium"
          class="nav-link"
          active-class="active"
        >
          Premium
        </router-link>

        <router-link
          to="/community"
          class="nav-link"
          active-class="active"
        >
          Join Komunitas
        </router-link>
      </nav>

      <!-- Logout -->
      <button
        type="button"
        class="logout-button"
        @click="handleLogout"
      >
        Logout
      </button>
    </div>
  </header>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { logout } from '../services/authService'

export default {
  name: 'AppNavbar',

  setup() {
    const router = useRouter()

    const showCategory = ref(false)

    function toggleCategory() {
      showCategory.value = !showCategory.value
    }

    function closeCategory() {
      showCategory.value = false
    }

    function handleLogout() {
      logout()
      router.push('/login')
    }

    return {
      showCategory,
      toggleCategory,
      closeCategory,
      handleLogout
    }
  }
}
</script>

<style scoped>
.navbar {
  width: 100%;
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-light-gray);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-container {
  width: 100%;
  max-width: 1400px;
  min-height: 72px;
  margin: 0 auto;
  padding: 0 28px;

  display: flex;
  align-items: center;
  gap: 24px;
}

.navbar-brand {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.navbar-logo {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.navbar-menu {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
}

.nav-link {
  position: relative;
  border: none;
  background: transparent;
  padding: 10px 11px;

  color: #4b5563;
  font-size: 14px;
  font-weight: 500;

  transition:
    color 0.2s ease,
    background-color 0.2s ease;
}

.nav-link:hover {
  color: var(--color-primary);
  background-color: #f4f7fb;
  border-radius: var(--radius-sm);
}

.nav-link.active {
  color: var(--color-primary);
  font-weight: 600;
}

.category-wrapper {
  position: relative;
}

.category-button {
  display: flex;
  align-items: center;
  gap: 6px;
}

.category-arrow {
  font-size: 9px;
}

.category-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;

  min-width: 190px;
  padding: 8px;

  background-color: var(--color-white);
  border: 1px solid var(--color-light-gray);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}

.category-link {
  display: block;
  padding: 10px 12px;

  color: #4b5563;
  font-size: 14px;
  border-radius: var(--radius-sm);

  transition:
    color 0.2s ease,
    background-color 0.2s ease;
}

.category-link:hover {
  color: var(--color-primary);
  background-color: #f4f7fb;
}

.logout-button {
  flex-shrink: 0;

  border: 1px solid var(--color-primary);
  border-radius: var(--radius-sm);

  padding: 9px 16px;

  background-color: transparent;
  color: var(--color-primary);

  font-size: 14px;
  font-weight: 600;

  transition:
    color 0.2s ease,
    background-color 0.2s ease;
}

.logout-button:hover {
  background-color: var(--color-primary);
  color: var(--color-white);
}

@media (max-width: 1100px) {
  .navbar-container {
    gap: 12px;
    padding: 0 18px;
  }

  .navbar-menu {
    gap: 0;
  }

  .nav-link {
    padding: 9px 7px;
    font-size: 13px;
  }
}
</style>