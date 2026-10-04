<template>
  <div class="admin-premium-page">
    <AppNavbar />

    <main class="admin-container">
      <section class="page-header">
        <h1>Verifikasi Premium</h1>

        <p>
          Kelola pengajuan dan akses Premium pengguna.
        </p>
      </section>

      <!-- PENGAJUAN PENDING -->
      <section class="section-block">
        <div class="section-title">
          <h2>Menunggu Verifikasi</h2>
          <span class="section-count">
            {{ pendingPayments.length }}
          </span>
        </div>

        <div
          v-if="pendingPayments.length === 0"
          class="empty-state"
        >
          <h3>Tidak Ada Pengajuan Pending</h3>

          <p>
            Saat ini belum terdapat pengguna yang
            menunggu verifikasi Premium.
          </p>
        </div>

        <div
          v-else
          class="payment-list"
        >
          <article
            v-for="payment in pendingPayments"
            :key="payment.id"
            class="payment-card"
          >
            <div class="payment-header">
              <div>
                <span class="status-badge pending">
                  Pending
                </span>

                <h2>
                  {{ getUserName(payment.userId) }}
                </h2>

                <p>
                  {{ getUserEmail(payment.userId) }}
                </p>
              </div>

              <span class="payment-date">
                {{ formatDate(payment.submittedAt) }}
              </span>
            </div>

            <div class="payment-details">
              <div class="detail-item">
                <span>User ID</span>
                <strong>
                  {{ payment.userId }}
                </strong>
              </div>

              <div class="detail-item">
                <span>Nama File</span>
                <strong>
                  {{ payment.fileName }}
                </strong>
              </div>

              <div class="detail-item">
                <span>Tipe File</span>
                <strong>
                  {{ payment.fileType }}
                </strong>
              </div>

              <div class="detail-item">
                <span>Status</span>
                <strong>
                  Menunggu Verifikasi
                </strong>
              </div>
            </div>

            <div class="prototype-note">
              Bukti pembayaran pada tahap ini masih berupa
              metadata file. File gambar belum disimpan
              secara langsung.
            </div>

            <div class="payment-actions">
              <button
                type="button"
                class="approve-button"
                @click="approvePayment(payment)"
              >
                Verifikasi & Aktifkan Premium
              </button>
            </div>
          </article>
        </div>
      </section>

      <!-- PREMIUM AKTIF -->
      <section class="section-block">
        <div class="section-title">
          <h2>Premium Aktif</h2>
          <span class="section-count active-count">
            {{ activePayments.length }}
          </span>
        </div>

        <div
          v-if="activePayments.length === 0"
          class="empty-state"
        >
          <h3>Belum Ada Premium Aktif</h3>

          <p>
            Belum terdapat pengguna dengan akses
            Premium aktif.
          </p>
        </div>

        <div
          v-else
          class="payment-list"
        >
          <article
            v-for="payment in activePayments"
            :key="payment.id"
            class="payment-card"
          >
            <div class="payment-header">
              <div>
                <span class="status-badge active">
                  Premium Aktif
                </span>

                <h2>
                  {{ getUserName(payment.userId) }}
                </h2>

                <p>
                  {{ getUserEmail(payment.userId) }}
                </p>
              </div>

              <span class="payment-date">
                {{ formatDate(payment.verifiedAt) }}
              </span>
            </div>

            <div class="payment-details">
              <div class="detail-item">
                <span>User ID</span>
                <strong>
                  {{ payment.userId }}
                </strong>
              </div>

              <div class="detail-item">
                <span>Nama File</span>
                <strong>
                  {{ payment.fileName }}
                </strong>
              </div>

              <div class="detail-item">
                <span>Status Pembayaran</span>
                <strong>
                  Disetujui
                </strong>
              </div>

              <div class="detail-item">
                <span>Akses</span>
                <strong>
                  Premium Selamanya
                </strong>
              </div>
            </div>

            <div class="payment-actions">
              <button
                type="button"
                class="revoke-button"
                @click="revokePremium(payment)"
              >
                Cabut Akses Premium
              </button>
            </div>
          </article>
        </div>
      </section>

      <!-- PREMIUM DICABUT -->
      <section class="section-block">
        <div class="section-title">
          <h2>Akses Premium Dicabut</h2>
          <span class="section-count revoked-count">
            {{ revokedPayments.length }}
          </span>
        </div>

        <div
          v-if="revokedPayments.length === 0"
          class="empty-state"
        >
          <h3>Belum Ada Akses yang Dicabut</h3>

          <p>
            Belum terdapat akses Premium yang
            dicabut oleh Admin.
          </p>
        </div>

        <div
          v-else
          class="payment-list"
        >
          <article
            v-for="payment in revokedPayments"
            :key="payment.id"
            class="payment-card"
          >
            <div class="payment-header">
              <div>
                <span class="status-badge revoked">
                  Premium Dicabut
                </span>

                <h2>
                  {{ getUserName(payment.userId) }}
                </h2>

                <p>
                  {{ getUserEmail(payment.userId) }}
                </p>
              </div>

              <span class="payment-date">
                {{ formatDate(payment.revokedAt) }}
              </span>
            </div>

            <div class="payment-details">
              <div class="detail-item">
                <span>User ID</span>
                <strong>
                  {{ payment.userId }}
                </strong>
              </div>

              <div class="detail-item">
                <span>Nama File</span>
                <strong>
                  {{ payment.fileName }}
                </strong>
              </div>

              <div class="detail-item">
                <span>Status</span>
                <strong>
                  Akses Premium Dicabut
                </strong>
              </div>

              <div class="detail-item">
                <span>Riwayat</span>
                <strong>
                  Data pembayaran tetap tersimpan
                </strong>
              </div>
            </div>
          </article>
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

import {
  getLoggedInUser,
  updateUser
} from '../services/authService'

import {
  getPremiumPayments,
  savePremiumPayments,
  getUsers
} from '../services/storageService'

export default {
  name: 'AdminPremium',

  components: {
    AppNavbar
  },

  setup() {
    const currentUser = getLoggedInUser()

    const users = ref(getUsers())

    const payments = ref(
      getPremiumPayments()
    )

    const pendingPayments = computed(() => {
      return payments.value.filter(
        payment =>
          payment.status === 'pending'
      )
    })

    const activePayments = computed(() => {
      return payments.value.filter(
        payment =>
          payment.status === 'approved'
      )
    })

    const revokedPayments = computed(() => {
      return payments.value.filter(
        payment =>
          payment.status === 'revoked'
      )
    })

    function getUserName(userId) {
      const user = users.value.find(
        item => item.id === userId
      )

      return user
        ? user.name
        : 'Pengguna Tidak Ditemukan'
    }

    function getUserEmail(userId) {
      const user = users.value.find(
        item => item.id === userId
      )

      return user
        ? user.email
        : '-'
    }

    function formatDate(date) {
      if (!date) {
        return '-'
      }

      return new Date(date).toLocaleString(
        'id-ID',
        {
          dateStyle: 'medium',
          timeStyle: 'short'
        }
      )
    }

    function approvePayment(payment) {
      const result = updateUser(
        payment.userId,
        {
          isPremium: true,
          premiumStatus: 'active'
        }
      )

      if (!result.success) {
        return
      }

      const updatedPayments =
        payments.value.map(item => {
          if (item.id !== payment.id) {
            return item
          }

          return {
            ...item,
            status: 'approved',
            verifiedAt:
              new Date().toISOString()
          }
        })

      payments.value = updatedPayments

      savePremiumPayments(
        updatedPayments
      )

      users.value = getUsers()
    }

    function revokePremium(payment) {
      const confirmed = window.confirm(
        `Cabut akses Premium untuk ${getUserName(payment.userId)}?`
      )

      if (!confirmed) {
        return
      }

      const result = updateUser(
        payment.userId,
        {
          isPremium: false,
          premiumStatus: 'revoked'
        }
      )

      if (!result.success) {
        return
      }

      const updatedPayments =
        payments.value.map(item => {
          if (item.id !== payment.id) {
            return item
          }

          return {
            ...item,
            status: 'revoked',
            revokedAt:
              new Date().toISOString()
          }
        })

      payments.value = updatedPayments

      savePremiumPayments(
        updatedPayments
      )

      users.value = getUsers()
    }

    return {
      currentUser,
      pendingPayments,
      activePayments,
      revokedPayments,
      getUserName,
      getUserEmail,
      formatDate,
      approvePayment,
      revokePremium
    }
  }
}
</script>

<style scoped>
.section-block {
  margin-bottom: 36px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;

  margin-bottom: 16px;
}

.section-title h2 {
  margin: 0;

  font-size: 21px;
}

.section-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-width: 26px;
  height: 26px;

  padding: 0 7px;

  border-radius: 50%;

  background-color: #fff4d6;
  color: #8a6500;

  font-size: 12px;
  font-weight: 700;
}

.active-count {
  background-color: #e7f6ec;
  color: #26733d;
}

.revoked-count {
  background-color: #fce8e8;
  color: #a33a3a;
}

.status-badge.pending {
  background-color: #fff4d6;
  color: #8a6500;
}

.status-badge.active {
  background-color: #e7f6ec;
  color: #26733d;
}

.status-badge.revoked {
  background-color: #fce8e8;
  color: #a33a3a;
}

.revoke-button {
  border: 1px solid #c94a4a;

  border-radius: var(--radius-sm);

  padding: 11px 18px;

  background-color: transparent;
  color: #b43838;

  font-size: 14px;
  font-weight: 600;

  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.revoke-button:hover {
  background-color: #b43838;
  color: var(--color-white);
}

.admin-premium-page {
  min-height: 100vh;
  background-color: var(--color-secondary);
}

.admin-container {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;

  padding: 48px 24px 64px;
}

.page-header {
  margin-bottom: 28px;
}

.page-header h1 {
  margin: 0 0 8px;

  font-size: 30px;
}

.page-header p {
  margin: 0;

  color: var(--color-gray);
}

/* EMPTY */

.empty-state {
  padding: 48px 24px;

  text-align: center;

  background-color: var(--color-white);

  border-radius: var(--radius-lg);

  box-shadow: var(--shadow-sm);
}

.empty-state h2 {
  margin: 0 0 8px;

  font-size: 21px;
}

.empty-state p {
  margin: 0;

  color: var(--color-gray);
}

/* PAYMENT */

.payment-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.payment-card {
  padding: 24px;

  background-color: var(--color-white);

  border-radius: var(--radius-lg);

  box-shadow: var(--shadow-sm);
}

.payment-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  gap: 20px;

  padding-bottom: 20px;

  border-bottom: 1px solid
    var(--color-light-gray);
}

.status-badge {
  display: inline-block;

  margin-bottom: 8px;
  padding: 5px 10px;

  border-radius: 6px;

  background-color: #fff4d6;
  color: #8a6500;

  font-size: 12px;
  font-weight: 700;
}

.payment-header h2 {
  margin: 0 0 4px;

  font-size: 20px;
}

.payment-header p {
  margin: 0;

  color: var(--color-gray);
}

.payment-date {
  flex-shrink: 0;

  color: var(--color-gray);

  font-size: 13px;
}

/* DETAILS */

.payment-details {
  display: grid;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: 16px;

  padding: 20px 0;
}

.detail-item {
  display: flex;
  flex-direction: column;

  gap: 4px;
}

.detail-item span {
  color: var(--color-gray);

  font-size: 13px;
}

.detail-item strong {
  color: var(--color-black);

  font-size: 14px;

  word-break: break-word;
}

/* NOTE */

.prototype-note {
  margin-bottom: 20px;

  padding: 12px 14px;

  border-radius: var(--radius-sm);

  background-color: #f4f7fb;

  color: var(--color-gray);

  font-size: 13px;
}

/* ACTION */

.payment-actions {
  display: flex;
  justify-content: flex-end;
}

.approve-button {
  border: none;

  border-radius: var(--radius-sm);

  padding: 11px 18px;

  background-color: var(--color-primary);
  color: var(--color-white);

  font-size: 14px;
  font-weight: 600;

  transition:
    background-color 0.2s ease;
}

.approve-button:hover {
  background-color:
    var(--color-primary-dark);
}

/* RESPONSIVE */

@media (max-width: 768px) {
  .admin-container {
    padding: 32px 16px 48px;
  }

  .payment-header {
    flex-direction: column;
  }

  .payment-details {
    grid-template-columns: 1fr;
  }

  .payment-actions {
    justify-content: stretch;
  }

  .approve-button {
    width: 100%;
  }
}
</style>