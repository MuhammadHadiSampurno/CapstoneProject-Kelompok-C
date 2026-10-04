<template>
  <main class="login-page">
    <section class="login-card">

      <div class="login-header">
        <img
          src="/src/assets/images/logo-ut.png"
          alt="Logo Universitas Terbuka"
          class="ut-logo"
        />

        <h1>Capstone Project Kelompok C</h1>
        <p>Universitas Terbuka</p>
        <span class="login-role">Login Pengguna</span>
      </div>

      <form @submit.prevent="handleLogin">

        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="Masukkan email"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Masukkan password"
            required
          />
        </div>

        <p v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </p>

        <button type="submit" class="login-button">
          Login
        </button>
      </form>

      <div class="login-footer">
        <button
          type="button"
          class="link-button"
          @click="goToRegister"
        >
          Buat Akun
        </button>

        <button
          type="button"
          class="link-button"
          @click="goToAdminLogin"
        >
          Login Sebagai Admin
        </button>
      </div>

    </section>
  </main>
</template>

<script>
import { login } from '../services/authService'

export default {
  name: 'LoginUser',

  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    }
  },

  methods: {
    handleLogin() {
      this.errorMessage = ''

      const result = login(
        this.email,
        this.password,
        'user'
      )

      if (!result.success) {
        this.errorMessage = result.message
        return
      }

      this.$router.push('/dashboard')
    },

    goToRegister() {
      this.$router.push('/register')
    },

    goToAdminLogin() {
      this.$router.push('/login-admin')
    }
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  background: #f4f7fb;
}

.login-card {
  width: 100%;
  max-width: 430px;
  padding: 40px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.ut-logo {
  width: 90px;
  height: auto;
  margin: 0 auto 20px;
}

.login-header h1 {
  margin: 0;
  font-size: 22px;
  color: #1f1f1f;
}

.login-header p {
  margin: 6px 0 14px;
  color: #6b7280;
}

.login-role {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  background: #e8f2fb;
  color: #005baa;
  font-size: 13px;
  font-weight: 600;
}

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;
  margin-bottom: 7px;
  font-weight: 600;
  font-size: 14px;
}

.form-group input {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  outline: none;
}

.form-group input:focus {
  border-color: #005baa;
}

.login-button {
  width: 100%;
  padding: 13px;
  border: none;
  border-radius: 8px;
  background: #005baa;
  color: #ffffff;
  font-weight: 600;
}

.login-button:hover {
  background: #00457f;
}

.error-message {
  margin: 0 0 16px;
  padding: 10px 12px;
  border-radius: 8px;
  background: #fee2e2;
  color: #b91c1c;
  font-size: 14px;
}

.login-footer {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 22px;
}

.link-button {
  border: none;
  background: transparent;
  color: #005baa;
  font-size: 13px;
  padding: 0;
}

.link-button:hover {
  text-decoration: underline;
}
</style>