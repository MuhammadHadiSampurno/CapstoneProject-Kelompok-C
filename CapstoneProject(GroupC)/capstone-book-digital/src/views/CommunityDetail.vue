<template>
  <div class="community-detail-page">
    <AppNavbar />

    <main class="community-detail-container">
      <button
        type="button"
        class="back-button"
        @click="goBack"
      >
        ← Kembali ke Komunitas
      </button>

      <section
        v-if="community"
        class="community-information"
      >
        <div class="community-icon">
          📚
        </div>

        <div class="community-information-content">
          <span class="community-category">
            {{ community.category }}
          </span>

          <h1>{{ community.name }}</h1>

          <p>
            {{ community.description }}
          </p>

          <span class="community-members">
            {{ community.initialMembers + 1 }} anggota
          </span>
        </div>
      </section>

      <section class="create-post-card">
        <h2>Buat Postingan</h2>

        <textarea
          v-model="postContent"
          placeholder="Bagikan sesuatu kepada komunitas..."
          rows="4"
        ></textarea>

        <div class="post-form-footer">
          <span
            v-if="postError"
            class="form-error"
          >
            {{ postError }}
          </span>

          <button
            type="button"
            class="post-button"
            @click="createPost"
          >
            Posting
          </button>
        </div>
      </section>

      <section class="discussion-section">
        <div class="section-title">
          <h2>Diskusi Komunitas</h2>

          <span>
            {{ posts.length }} posting
          </span>
        </div>

        <div
          v-if="posts.length === 0"
          class="empty-state"
        >
          <p>
            Belum ada postingan di komunitas ini.
          </p>
        </div>

        <article
          v-for="post in posts"
          :key="post.id"
          class="post-card"
        >
          <div class="post-header">
            <div class="user-avatar">
              {{ getInitial(post.userName) }}
            </div>

            <div class="post-user">
              <strong>{{ post.userName }}</strong>

              <span>
                {{ formatDate(post.createdAt) }}
              </span>
            </div>
          </div>

          <p class="post-content">
            {{ post.content }}
          </p>

          <div class="comments-section">
            <h3>Komentar</h3>

            <div
              v-if="getPostComments(post.id).length === 0"
              class="no-comment"
            >
              Belum ada komentar.
            </div>

            <div
              v-for="comment in getPostComments(post.id)"
              :key="comment.id"
              class="comment-item"
            >
              <div class="comment-avatar">
                {{ getInitial(comment.userName) }}
              </div>

              <div class="comment-content">
                <strong>{{ comment.userName }}</strong>

                <p>
                  {{ comment.content }}
                </p>

                <span>
                  {{ formatDate(comment.createdAt) }}
                </span>
              </div>
            </div>

            <div class="comment-form">
              <input
                v-model="commentInputs[post.id]"
                type="text"
                placeholder="Tulis komentar..."
                @keyup.enter="createComment(post.id)"
              />

              <button
                type="button"
                @click="createComment(post.id)"
              >
                Kirim
              </button>
            </div>
          </div>
        </article>
      </section>
    </main>
  </div>
</template>

<script>
import {
  ref,
  computed,
  onMounted
} from 'vue'

import {
  useRoute,
  useRouter
} from 'vue-router'

import AppNavbar from '../components/AppNavbar.vue'

import {
  getLoggedInUser
} from '../services/authService'

import {
  getCommunityMemberships,
  getCommunityPosts,
  addCommunityPost,
  getCommunityComments,
  addCommunityComment
} from '../services/storageService'

import communityData from '../data/communityData'

import communityPostData from '../data/communityPostData'

export default {
  name: 'CommunityDetail',

  components: {
    AppNavbar
  },

  setup() {
    const route = useRoute()
    const router = useRouter()

    const currentUser = ref(null)

    const community = ref(null)

    const postContent = ref('')

    const postError = ref('')

    const commentInputs = ref({})

    const postsData = ref([])

    const commentsData = ref([])

    const communityId = route.params.id

    const posts = computed(() => {
      return postsData.value
        .filter(
          post =>
            post.communityId === communityId
        )
        .sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        )
    })

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

      const memberships =
        getCommunityMemberships(user.id)

      if (!memberships.includes(communityId)) {
        router.replace('/community')
        return
      }

      const selectedCommunity =
        communityData.find(
          item => item.id === communityId
        )

      if (!selectedCommunity) {
        router.replace('/community')
        return
      }

      currentUser.value = user

      community.value = selectedCommunity

      postsData.value = [
        ...communityPostData,
        ...getCommunityPosts()
      ]

      commentsData.value =
        getCommunityComments()
    })

    function getPostComments(postId) {
      return commentsData.value.filter(
        comment =>
          comment.postId === postId
      )
    }

    function createPost() {
      postError.value = ''

      const content =
        postContent.value.trim()

      if (!content) {
        postError.value =
          'Postingan tidak boleh kosong.'

        return
      }

      if (!currentUser.value) {
        router.replace('/login')
        return
      }

      const newPost = {
        id: `post-${Date.now()}`,
        communityId,
        userId: currentUser.value.id,
        userName: currentUser.value.name,
        content,
        createdAt:
          new Date().toISOString()
      }

      addCommunityPost(newPost)

      postsData.value = [
        newPost,
        ...postsData.value
      ]

      postContent.value = ''
    }

    function createComment(postId) {
      const content =
        (
          commentInputs.value[postId] ||
          ''
        ).trim()

      if (!content) {
        return
      }

      if (!currentUser.value) {
        router.replace('/login')
        return
      }

      const newComment = {
        id: `comment-${Date.now()}`,
        postId,
        userId: currentUser.value.id,
        userName: currentUser.value.name,
        content,
        createdAt:
          new Date().toISOString()
      }

      addCommunityComment(newComment)

      commentsData.value = [
        ...commentsData.value,
        newComment
      ]

      commentInputs.value = {
        ...commentInputs.value,
        [postId]: ''
      }
    }

    function getInitial(name) {
      if (!name) {
        return '?'
      }

      return name
        .charAt(0)
        .toUpperCase()
    }

    function formatDate(date) {
      return new Intl.DateTimeFormat(
        'id-ID',
        {
          dateStyle: 'medium',
          timeStyle: 'short'
        }
      ).format(new Date(date))
    }

    function goBack() {
      router.push('/community')
    }

    return {
      community,
      posts,
      postContent,
      postError,
      commentInputs,
      getPostComments,
      createPost,
      createComment,
      getInitial,
      formatDate,
      goBack
    }
  }
}
</script>

<style scoped>
.community-detail-page {
  min-height: 100vh;
  background-color: var(--color-secondary);
}

.community-detail-container {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 32px 24px 64px;
}

.back-button {
  margin-bottom: 24px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--color-primary);
  font-size: 14px;
  font-weight: 600;
}

.community-information {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
  padding: 28px;
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.community-icon {
  width: 72px;
  height: 72px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background-color: #f4f7fb;
  font-size: 34px;
}

.community-information-content {
  flex: 1;
}

.community-category {
  display: inline-block;
  margin-bottom: 8px;
  padding: 5px 10px;
  border-radius: 6px;
  background-color: #eef5fc;
  color: var(--color-primary);
  font-size: 11px;
  font-weight: 600;
}

.community-information-content h1 {
  margin: 0 0 8px;
  font-size: 26px;
}

.community-information-content p {
  margin: 0 0 10px;
  color: var(--color-gray);
  line-height: 1.6;
}

.community-members {
  color: var(--color-gray);
  font-size: 13px;
}

.create-post-card {
  margin-bottom: 28px;
  padding: 24px;
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.create-post-card h2 {
  margin: 0 0 16px;
  font-size: 19px;
}

.create-post-card textarea {
  width: 100%;
  resize: vertical;
  padding: 12px 14px;
  border: 1px solid var(--color-light-gray);
  border-radius: var(--radius-md);
  outline: none;
  color: var(--color-black);
  line-height: 1.5;
}

.create-post-card textarea:focus {
  border-color: var(--color-primary);
}

.post-form-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 12px;
}

.form-error {
  margin-right: auto;
  color: #c0392b;
  font-size: 13px;
}

.post-button {
  padding: 10px 20px;
  border: none;
  border-radius: var(--radius-sm);
  background-color: var(--color-primary);
  color: var(--color-white);
  font-size: 14px;
  font-weight: 600;
}

.post-button:hover {
  background-color: var(--color-primary-dark);
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.section-title h2 {
  margin: 0;
  font-size: 20px;
}

.section-title span {
  color: var(--color-gray);
  font-size: 13px;
}

.empty-state {
  padding: 32px;
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  text-align: center;
  color: var(--color-gray);
}

.post-card {
  margin-bottom: 20px;
  padding: 24px;
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.post-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.user-avatar,
.comment-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: #eef5fc;
  color: var(--color-primary);
  font-weight: 700;
}

.user-avatar {
  width: 42px;
  height: 42px;
}

.post-user {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.post-user strong {
  font-size: 14px;
}

.post-user span {
  color: var(--color-gray);
  font-size: 12px;
}

.post-content {
  margin: 0 0 24px;
  line-height: 1.7;
  white-space: pre-wrap;
}

.comments-section {
  padding-top: 20px;
  border-top: 1px solid var(--color-light-gray);
}

.comments-section h3 {
  margin: 0 0 14px;
  font-size: 15px;
}

.no-comment {
  margin-bottom: 14px;
  color: var(--color-gray);
  font-size: 13px;
}

.comment-item {
  display: flex;
  gap: 10px;
  margin-bottom: 14px;
}

.comment-avatar {
  width: 32px;
  height: 32px;
  font-size: 12px;
}

.comment-content {
  flex: 1;
  padding: 10px 12px;
  background-color: #f8fafc;
  border-radius: 8px;
}

.comment-content strong {
  font-size: 13px;
}

.comment-content p {
  margin: 4px 0;
  font-size: 13px;
  line-height: 1.5;
}

.comment-content span {
  color: var(--color-gray);
  font-size: 11px;
}

.comment-form {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}

.comment-form input {
  flex: 1;
  min-width: 0;
  padding: 9px 12px;
  border: 1px solid var(--color-light-gray);
  border-radius: var(--radius-sm);
  outline: none;
}

.comment-form input:focus {
  border-color: var(--color-primary);
}

.comment-form button {
  padding: 9px 16px;
  border: none;
  border-radius: var(--radius-sm);
  background-color: var(--color-primary);
  color: var(--color-white);
  font-size: 13px;
  font-weight: 600;
}

@media (max-width: 768px) {
  .community-detail-container {
    padding: 24px 16px 48px;
  }

  .community-information {
    align-items: flex-start;
    padding: 22px;
  }

  .community-information-content h1 {
    font-size: 22px;
  }

  .comment-form {
    flex-direction: column;
  }

  .comment-form button {
    align-self: flex-end;
  }
}
</style>