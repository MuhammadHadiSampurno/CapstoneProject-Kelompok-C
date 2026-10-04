<template>
  <div class="premium-page">
    <AppNavbar />

    <main class="premium-container">
      <section class="premium-header">
        <h1>Premium</h1>
        <p>
          Nikmati akses membaca buku secara lebih lengkap
          dengan layanan premium.
        </p>
      </section>

      <!-- PREMIUM AKTIF -->
      <section
        v-if="isPremium"
        class="status-card premium-active"
      >
        <div class="status-icon">✓</div>

        <div>
          <h2>Premium Aktif</h2>
          <p>
            Akun Anda sudah memiliki akses Premium Selamanya.
          </p>
        </div>
      </section>

      <!-- TRIAL AKTIF -->
      <section
        v-else-if="isTrialActive"
        class="status-card trial-active"
      >
        <div class="status-icon">⏳</div>

        <div>
          <h2>Free Trial Aktif</h2>

          <p>
            Anda masih memiliki akses Free Trial.
          </p>

          <strong>
            Sisa waktu:
            {{ remainingTrialText }}
          </strong>
        </div>
      </section>

      <!-- MENUNGGU VERIFIKASI -->
      <section
        v-else-if="isPaymentPending"
        class="status-card payment-pending"
      >
        <div class="status-icon">!</div>

        <div>
          <h2>Menunggu Verifikasi</h2>

          <p>
            Bukti pembayaran Anda telah berhasil dikirim
            dan sedang menunggu verifikasi admin.
          </p>

          <span class="pending-label">
            Status Pembayaran: Pending
          </span>
        </div>
      </section>

      <!-- TRIAL SUDAH BERAKHIR -->
      <section
        v-else-if="hasUsedTrial"
        class="status-card trial-expired"
      >
        <div class="status-icon">!</div>

        <div>
          <h2>Free Trial Telah Berakhir</h2>

          <p>
            Masa Free Trial 7 hari Anda telah berakhir.
            Anda dapat melanjutkan akses dengan Premium Selamanya.
          </p>
        </div>
      </section>

      <!-- FREE TRIAL -->
      <section
        v-if="!isPremium && !isTrialActive && !isPaymentPending && !hasUsedTrial"
        class="premium-card"
      >
        <div class="card-content">
          <span class="card-label">
            GRATIS
          </span>

          <h2>Free Trial 7 Hari</h2>

          <p>
            Coba pengalaman membaca buku digital secara
            gratis selama 7 hari.
          </p>

          <ul>
            <li>Akses fitur premium selama 7 hari</li>
            <li>Tidak membutuhkan pembayaran</li>
            <li>Masa trial hanya dapat digunakan satu kali</li>
          </ul>

          <button
            type="button"
            class="primary-button"
            @click="startTrial"
          >
            Mulai Free Trial
          </button>
        </div>
      </section>

      <!-- PREMIUM PAYMENT -->
      <section
        v-if="!isPremium && !isPaymentPending"
        class="premium-card"
      >
        <div class="card-content">
          <span class="card-label">
            PREMIUM
          </span>

          <h2>Akses Premium Selamanya</h2>

          <p>
            Dapatkan akses Premium Selamanya dengan melakukan
            pembayaran melalui Virtual Account.
          </p>

          <div class="payment-info">
            <div class="payment-row">
              <span>Metode Pembayaran</span>
              <strong>Virtual Account</strong>
            </div>

            <div class="payment-row">
              <span>Nomor VA</span>
              <strong>8800123456789012</strong>
            </div>

            <div class="payment-row">
              <span>Status</span>
              <strong>Pembayaran Manual</strong>
            </div>
          </div>

          <div class="upload-section">
            <label for="payment-proof">
              Upload Bukti Pembayaran
            </label>

            <input
              id="payment-proof"
              type="file"
              accept="image/*"
              @change="handleFileChange"
            />

            <p
              v-if="selectedFile"
              class="file-name"
            >
              File dipilih:
              {{ selectedFile.name }}
            </p>
          </div>

          <button
            type="button"
            class="primary-button"
            :disabled="!selectedFile || isSubmitting"
            @click="submitPayment"
          >
            {{ isSubmitting
              ? 'Mengirim...'
              : 'Kirim Bukti Pembayaran'
            }}
          </button>

          <p
            v-if="submitMessage"
            class="submit-message"
          >
            {{ submitMessage }}
          </p>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref
} from 'vue'

import AppNavbar from '../components/AppNavbar.vue'

import {
  getLoggedInUser,
  updateUser
} from '../services/authService'

import {
  getPremiumPayment,
  savePremiumPayment
} from '../services/storageService'

export default {
  name: 'Premium',

  components: {
    AppNavbar
  },

  setup() {
    const currentUser = ref(getLoggedInUser())

    const selectedFile = ref(null)
    const isSubmitting = ref(false)
    const submitMessage = ref('')

    const remainingTrialText = ref('')

    const isPremium = computed(() => {
      return currentUser.value?.isPremium === true
    })

    const isPaymentPending = computed(() => {
      return (
        currentUser.value?.premiumStatus === 'pending'
      )
    })

    const hasUsedTrial = computed(() => {
      return Boolean(
        currentUser.value?.trialStartedAt
      )
    })

    const isTrialActive = computed(() => {
      if (!currentUser.value?.trialEndAt) {
        return false
      }

      return (
        new Date(currentUser.value.trialEndAt).getTime() >
        Date.now()
      )
    })

    function updateRemainingTrial() {
      if (!currentUser.value?.trialEndAt) {
        remainingTrialText.value = ''
        return
      }

      const endTime = new Date(
        currentUser.value.trialEndAt
      ).getTime()

      const remaining =
        endTime - Date.now()

      if (remaining <= 0) {
        remainingTrialText.value = 'Trial telah berakhir'
        return
      }

      const totalMinutes = Math.floor(
        remaining / 1000 / 60
      )

      const days = Math.floor(
        totalMinutes / 1440
      )

      const hours = Math.floor(
        (totalMinutes % 1440) / 60
      )

      const minutes =
        totalMinutes % 60

      remainingTrialText.value =
        `${days} hari ${hours} jam ${minutes} menit`
    }

    function startTrial() {
      if (!currentUser.value) {
        return
      }

      if (currentUser.value.trialStartedAt) {
        return
      }

      const startDate = new Date()

      const endDate = new Date(
        startDate.getTime() +
        7 * 24 * 60 * 60 * 1000
      )

      const updates = {
        trialStartedAt: startDate.toISOString(),
        trialEndAt: endDate.toISOString(),
        premiumStatus: 'trial',
        isPremium: false
      }

      const result = updateUser(
        currentUser.value.id,
        updates
      )

      if (result.success) {
        currentUser.value = {
          ...currentUser.value,
          ...updates
        }

        updateRemainingTrial()
      }
    }

    function handleFileChange(event) {
      const file =
        event.target.files?.[0] || null

      selectedFile.value = file
      submitMessage.value = ''
    }

    function submitPayment() {
      if (
        !currentUser.value ||
        !selectedFile.value
      ) {
        return
      }

      isSubmitting.value = true
      submitMessage.value = ''

      const payment = {
        id: `payment-${Date.now()}`,
        userId: currentUser.value.id,
        fileName: selectedFile.value.name,
        fileType: selectedFile.value.type,
        submittedAt: new Date().toISOString(),
        status: 'pending'
      }

      savePremiumPayment(payment)

      const updates = {
        premiumStatus: 'pending'
      }

      const result = updateUser(
        currentUser.value.id,
        updates
      )

      if (result.success) {
        /*
         * Penting:
         * currentUser diperbarui langsung agar
         * tampilan segera berubah menjadi Pending
         * tanpa harus refresh halaman.
         */
        currentUser.value = {
          ...currentUser.value,
          ...updates
        }

        selectedFile.value = null

        submitMessage.value =
          'Bukti pembayaran berhasil dikirim.'
      }

      isSubmitting.value = false
    }

    onMounted(() => {
      if (!currentUser.value) {
        return
      }

      /*
       * Sinkronisasi ulang status pembayaran
       * dari localStorage ketika halaman dibuka.
       */
      const payment = getPremiumPayment(
        currentUser.value.id
      )

      if (
        payment &&
        payment.status === 'pending'
      ) {
        currentUser.value = {
          ...currentUser.value,
          premiumStatus: 'pending'
        }
      }

      updateRemainingTrial()

      window.trialTimer = setInterval(
        updateRemainingTrial,
        60000
      )
    })

    onBeforeUnmount(() => {
      if (window.trialTimer) {
        clearInterval(window.trialTimer)
        window.trialTimer = null
      }
    })

    return {
      currentUser,
      selectedFile,
      isSubmitting,
      submitMessage,
      remainingTrialText,
      isPremium,
      isPaymentPending,
      hasUsedTrial,
      isTrialActive,
      startTrial,
      handleFileChange,
      submitPayment
    }
  }
}
</script>

<style scoped>
.premium-page {
  min-height: 100vh;
  background-color: var(--color-secondary);
}

.premium-container {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 48px 24px 64px;
}

.premium-header {
  text-align: center;
  margin-bottom: 32px;
}

.premium-header h1 {
  margin: 0 0 8px;
  font-size: 30px;
  color: var(--color-black);
}

.premium-header p {
  margin: 0;
  color: var(--color-gray);
}

/* STATUS */

.status-card {
  display: flex;
  align-items: center;
  gap: 18px;

  margin-bottom: 24px;
  padding: 22px 24px;

  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.status-icon {
  width: 44px;
  height: 44px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background-color: var(--color-primary);
  color: var(--color-white);

  font-size: 20px;
  font-weight: 700;
}

.status-card h2 {
  margin: 0 0 4px;
  font-size: 20px;
}

.status-card p {
  margin: 0;
  color: var(--color-gray);
}

.pending-label {
  display: inline-block;
  margin-top: 8px;

  padding: 5px 10px;

  border-radius: 6px;

  background-color: #fff4d6;
  color: #8a6500;

  font-size: 13px;
  font-weight: 600;
}

/* CARD */

.premium-card {
  margin-bottom: 24px;

  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);

  overflow: hidden;
}

.card-content {
  padding: 32px;
}

.card-label {
  display: inline-block;

  margin-bottom: 12px;
  padding: 5px 10px;

  border-radius: 6px;

  background-color: #eef5fc;
  color: var(--color-primary);

  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.card-content h2 {
  margin: 0 0 10px;
  font-size: 24px;
}

.card-content > p {
  margin: 0 0 20px;
  color: var(--color-gray);
}

.card-content ul {
  margin: 0 0 24px;
  padding-left: 20px;
  color: #4b5563;
}

.card-content li {
  margin-bottom: 8px;
}

/* PAYMENT */

.payment-info {
  margin: 24px 0;
  padding: 18px;

  background-color: #f8fafc;
  border-radius: var(--radius-md);
}

.payment-row {
  display: flex;
  justify-content: space-between;
  gap: 20px;

  padding: 10px 0;

  border-bottom: 1px solid var(--color-light-gray);
}

.payment-row:last-child {
  border-bottom: none;
}

.payment-row span {
  color: var(--color-gray);
}

.payment-row strong {
  color: var(--color-black);
  text-align: right;
}

.upload-section {
  margin-bottom: 20px;
}

.upload-section label {
  display: block;
  margin-bottom: 8px;

  font-weight: 600;
}

.upload-section input {
  width: 100%;
  padding: 10px;

  border: 1px solid var(--color-light-gray);
  border-radius: var(--radius-sm);

  background-color: var(--color-white);
}

.file-name {
  margin-top: 8px !important;
  margin-bottom: 0 !important;

  font-size: 13px;
  color: var(--color-primary) !important;
}

.primary-button {
  border: none;
  border-radius: var(--radius-sm);

  padding: 11px 20px;

  background-color: var(--color-primary);
  color: var(--color-white);

  font-size: 14px;
  font-weight: 600;

  transition: background-color 0.2s ease;
}

.primary-button:hover:not(:disabled) {
  background-color: var(--color-primary-dark);
}

.primary-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.submit-message {
  margin-top: 12px !important;
  margin-bottom: 0 !important;

  font-size: 14px;
  color: #166534 !important;
}

/* RESPONSIVE */

@media (max-width: 768px) {
  .premium-container {
    padding: 32px 16px 48px;
  }

  .payment-row {
    flex-direction: column;
    gap: 4px;
  }

  .payment-row strong {
    text-align: left;
  }

  .status-card {
    align-items: flex-start;
  }

  .card-content {
    padding: 24px;
  }
}
</style>