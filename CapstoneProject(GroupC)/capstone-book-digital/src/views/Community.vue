```vue
<template>
  <div class="community-page">
    <AppNavbar />

    <main class="community-container">
      <section class="community-header">
        <h1>Join Komunitas</h1>

        <p>
          Temukan komunitas yang sesuai dengan
          minat membaca kamu.
        </p>
      </section>

      <section class="community-list">
        <article
          v-for="community in communities"
          :key="community.id"
          class="community-card"
          @click="openCommunity(community.id)"
        >
          <div class="community-card-header">
            <div class="community-icon">
              📚
            </div>

            <span class="community-category">
              {{ community.category }}
            </span>
          </div>

          <div class="community-card-content">
            <h2>
              {{ community.name }}
            </h2>

            <p>
              {{ community.description }}
            </p>

            <div class="community-members">
              {{ getMemberCount(community) }} anggota
            </div>
          </div>

          <button
            type="button"
            class="community-button"
            :class="{
              joined: isMember(community.id)
            }"
            @click.stop="toggleMembership(community.id)"
          >
            {{
              isMember(community.id)
                ? 'Leave'
                : 'Join'
            }}
          </button>
        </article>
      </section>
    </main>
  </div>
</template>

<script>
import {
  ref,
  onMounted
} from 'vue'

import {
  useRouter
} from 'vue-router'

import AppNavbar from '../components/AppNavbar.vue'

import {
  getLoggedInUser
} from '../services/authService'

import {
  getCommunityMemberships,
  joinCommunity,
  leaveCommunity
} from '../services/storageService'

import communityData from '../data/communityData'

export default {
  name: 'Community',

  components: {
    AppNavbar
  },

  setup() {
    const router = useRouter()

    const currentUser = ref(null)

    const communities = ref(
      communityData
    )

    const memberships = ref([])

    onMounted(() => {
      const user = getLoggedInUser()

      if (!user) {
        router.replace('/login')
        return
      }

      if (user.isPremium !== true) {
        router.replace('/premium')
        return
      }

      currentUser.value = user

      memberships.value =
        getCommunityMemberships(user.id)
    })

    function isMember(communityId) {
      return memberships.value.includes(
        communityId
      )
    }

    function getMemberCount(community) {
      const joined =
        isMember(community.id)

      return (
        community.initialMembers +
        (joined ? 1 : 0)
      )
    }

    function toggleMembership(communityId) {
      if (!currentUser.value) {
        router.replace('/login')
        return
      }

      if (isMember(communityId)) {
        leaveCommunity(
          currentUser.value.id,
          communityId
        )

        memberships.value =
          memberships.value.filter(
            id => id !== communityId
          )

        return
      }

      joinCommunity(
        currentUser.value.id,
        communityId
      )

      memberships.value = [
        ...memberships.value,
        communityId
      ]
    }

    function openCommunity(communityId) {
      if (!currentUser.value) {
        router.replace('/login')
        return
      }

      if (!isMember(communityId)) {
        return
      }

      router.push(
        `/community/${communityId}`
      )
    }

    return {
      communities,
      memberships,
      isMember,
      getMemberCount,
      toggleMembership,
      openCommunity
    }
  }
}
</script>

<style scoped>
.community-page {
  min-height: 100vh;
  background-color: var(--color-secondary);
}

.community-container {
  width: 100%;
  max-width: 1100px;

  margin: 0 auto;

  padding: 48px 24px 64px;
}

.community-header {
  margin-bottom: 32px;

  text-align: center;
}

.community-header h1 {
  margin: 0 0 8px;

  font-size: 30px;
}

.community-header p {
  margin: 0;

  color: var(--color-gray);
}

.community-list {
  display: grid;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: 20px;
}

.community-card {
  display: flex;
  flex-direction: column;

  padding: 24px;

  background-color: var(--color-white);

  border: 1px solid var(--color-light-gray);
  border-radius: var(--radius-lg);

  box-shadow: var(--shadow-sm);

  cursor: pointer;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.community-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.community-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 20px;
}

.community-icon {
  width: 52px;
  height: 52px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 12px;

  background-color: #f4f7fb;

  font-size: 26px;
}

.community-category {
  padding: 5px 10px;

  border-radius: 6px;

  background-color: #eef5fc;
  color: var(--color-primary);

  font-size: 11px;
  font-weight: 600;
}

.community-card-content {
  flex: 1;
}

.community-card-content h2 {
  margin: 0 0 10px;

  font-size: 19px;
}

.community-card-content p {
  margin: 0 0 16px;

  color: var(--color-gray);

  font-size: 14px;

  line-height: 1.6;
}

.community-members {
  margin-bottom: 20px;

  color: var(--color-gray);

  font-size: 13px;
}

.community-button {
  width: 100%;

  padding: 10px 16px;

  border: 1px solid var(--color-primary);
  border-radius: var(--radius-sm);

  background-color: var(--color-primary);
  color: var(--color-white);

  font-size: 14px;
  font-weight: 600;

  cursor: pointer;

  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.community-button:hover {
  background-color: var(--color-primary-dark);
}

.community-button.joined {
  background-color: transparent;
  color: var(--color-primary);
}

.community-button.joined:hover {
  background-color: #f4f7fb;
}

@media (max-width: 768px) {
  .community-container {
    padding: 32px 16px 48px;
  }

  .community-list {
    grid-template-columns: 1fr;
  }
}
</style>
```
