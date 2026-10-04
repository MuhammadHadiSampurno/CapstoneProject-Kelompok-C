<template>
  <main class="register-page">
    <section class="register-card">

      <div class="register-header">
        <img
          src="/src/assets/images/logo-ut.png"
          alt="Logo Universitas Terbuka"
          class="ut-logo"
        />

        <h1>Buat Akun</h1>
        <p>Capstone Project Kelompok C</p>
        <span>Universitas Terbuka</span>
      </div>

      <form @submit.prevent="handleRegister">

        <div class="form-group">
          <label for="name">Nama</label>
          <input
            id="name"
            v-model="name"
            type="text"
            placeholder="Masukkan nama"
            required
          />
        </div>

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

        <div class="form-group">
          <label for="confirmPassword">
            Konfirmasi Password
          </label>

          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            placeholder="Masukkan kembali password"
            required
          />
        </div>

        <p v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </p>

        <p v-if="successMessage" class="success-message">
          {{ successMessage }}
        </p>

        <button type="submit" class="register-button">
          Buat Akun
        </button>
      </form>

      <div class="register-footer">
        <button
          type="button"
          class="link-button"
          @click="goToLogin"
        >
          Kembali ke Login User
        </button>
      </div>

    </section>
  </main>
</template>

<script>
import { registerUser } from '../services/authService'

export default {
  name: 'Register',

  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      errorMessage: '',
      successMessage: ''
    }
  },

  methods: {
    handleRegister() {
      this.errorMessage = ''
      this.successMessage = ''

      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Konfirmasi password tidak sesuai.'
        return
      }

      const result = registerUser(
        this.name,
        this.email,
        this.password
      )

      if (!result.success) {
        this.errorMessage = result.message
        return
      }

      this.successMessage = 'Akun berhasil dibuat. Silakan login.'

      this.name = ''
      this.email = ''
      this.password = ''
      this.confirmPassword = ''

      setTimeout(() => {
        this.$router.push('/login')
      }, 1000)
    },

    goToLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  background: #f4f7fb;
}

.register-card {
  width: 100%;
  max-width: 430px;
  padding: 40px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

.register-header {
  text-align: center;
  margin-bottom: 30px;
}

.ut-logo {
  width: 90px;
  height: auto;
  margin: 0 auto 20px;
}

.register-header h1 {
  margin: 0;
  font-size: 24px;
}

.register-header p {
  margin: 7px 0 2px;
  color: #6b7280;
}

.register-header span {
  color: #005baa;
  font-size: 14px;
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

.register-button {
  width: 100%;
  padding: 13px;
  border: none;
  border-radius: 8px;
  background: #005baa;
  color: #ffffff;
  font-weight: 600;
}

.error-message,
.success-message {
  margin: 0 0 16px;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 14px;
}

.error-message {
  background: #fee2e2;
  color: #b91c1c;
}

.success-message {
  background: #dcfce7;
  color: #166534;
}

.register-footer {
  margin-top: 22px;
  text-align: center;
}

.link-button {
  border: none;
  background: transparent;
  color: #005baa;
  font-size: 13px;
}

.link-button:hover {
  text-decoration: underline;
}
</style>