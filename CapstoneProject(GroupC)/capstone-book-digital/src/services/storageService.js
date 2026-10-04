const STORAGE_KEYS = {
  USERS: 'capstone_users',
  CURRENT_USER: 'capstone_current_user',
  BOOKMARKS: 'capstone_bookmarks',
  HISTORY: 'capstone_history',
  PREMIUM_PAYMENTS: 'capstone_premium_payments',
  COMMUNITY_MEMBERSHIPS: 'capstone_community_memberships',
  COMMUNITY_POSTS: 'capstone_community_posts',
  COMMUNITY_COMMENTS: 'capstone_community_comments'
}

export function getUsers() {
  const users = localStorage.getItem(STORAGE_KEYS.USERS)

  if (!users) {
    return []
  }

  try {
    return JSON.parse(users)
  } catch (error) {
    console.error('Gagal membaca data pengguna:', error)
    return []
  }
}

export function saveUsers(users) {
  localStorage.setItem(
    STORAGE_KEYS.USERS,
    JSON.stringify(users)
  )
}

export function getCurrentUser() {
  const user = localStorage.getItem(
    STORAGE_KEYS.CURRENT_USER
  )

  if (!user) {
    return null
  }

  try {
    return JSON.parse(user)
  } catch (error) {
    console.error('Gagal membaca pengguna aktif:', error)
    return null
  }
}

export function saveCurrentUser(user) {
  localStorage.setItem(
    STORAGE_KEYS.CURRENT_USER,
    JSON.stringify(user)
  )
}

export function removeCurrentUser() {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
}

/* =========================
   BOOKMARK
========================= */

function getUserStorageKey(key, userId) {
  return `${key}_${userId}`
}

export function getBookmarks(userId) {
  if (!userId) {
    return []
  }

  const key = getUserStorageKey(
    STORAGE_KEYS.BOOKMARKS,
    userId
  )

  const bookmarks = localStorage.getItem(key)

  if (!bookmarks) {
    return []
  }

  try {
    return JSON.parse(bookmarks)
  } catch (error) {
    console.error('Gagal membaca bookmark:', error)
    return []
  }
}

export function saveBookmarks(userId, bookIds) {
  if (!userId) {
    return
  }

  const key = getUserStorageKey(
    STORAGE_KEYS.BOOKMARKS,
    userId
  )

  localStorage.setItem(
    key,
    JSON.stringify(bookIds)
  )
}

export function addBookmark(userId, bookId) {
  if (!userId || !bookId) {
    return
  }

  const bookmarks = getBookmarks(userId)

  if (!bookmarks.includes(bookId)) {
    bookmarks.push(bookId)
    saveBookmarks(userId, bookmarks)
  }
}

export function removeBookmark(userId, bookId) {
  if (!userId || !bookId) {
    return
  }

  const bookmarks = getBookmarks(userId)

  const updatedBookmarks = bookmarks.filter(
    id => id !== bookId
  )

  saveBookmarks(userId, updatedBookmarks)
}

export function isBookmarked(userId, bookId) {
  if (!userId || !bookId) {
    return false
  }

  const bookmarks = getBookmarks(userId)

  return bookmarks.includes(bookId)
}

/* =========================
   HISTORY
========================= */

export function getHistory(userId) {
  if (!userId) {
    return []
  }

  const key = getUserStorageKey(
    STORAGE_KEYS.HISTORY,
    userId
  )

  const history = localStorage.getItem(key)

  if (!history) {
    return []
  }

  try {
    return JSON.parse(history)
  } catch (error) {
    console.error('Gagal membaca history:', error)
    return []
  }
}

export function saveHistory(userId, history) {
  if (!userId) {
    return
  }

  const key = getUserStorageKey(
    STORAGE_KEYS.HISTORY,
    userId
  )

  localStorage.setItem(
    key,
    JSON.stringify(history)
  )
}

export function addHistory(userId, bookId) {
  if (!userId || !bookId) {
    return
  }

  const history = getHistory(userId)

  const filteredHistory = history.filter(
    id => id !== bookId
  )

  filteredHistory.unshift(bookId)

  saveHistory(userId, filteredHistory)
}

export function clearHistory(userId) {
  if (!userId) {
    return
  }

  const key = getUserStorageKey(
    STORAGE_KEYS.HISTORY,
    userId
  )

  localStorage.removeItem(key)
}

/* =========================
   PREMIUM PAYMENT
========================= */

export function getPremiumPayments() {
  const payments = localStorage.getItem(
    STORAGE_KEYS.PREMIUM_PAYMENTS
  )

  if (!payments) {
    return []
  }

  try {
    return JSON.parse(payments)
  } catch (error) {
    console.error(
      'Gagal membaca data pembayaran premium:',
      error
    )

    return []
  }
}

export function savePremiumPayments(payments) {
  localStorage.setItem(
    STORAGE_KEYS.PREMIUM_PAYMENTS,
    JSON.stringify(payments)
  )
}

export function getPremiumPayment(userId) {
  if (!userId) {
    return null
  }

  const payments = getPremiumPayments()

  return (
    payments.find(
      payment => payment.userId === userId
    ) || null
  )
}

export function savePremiumPayment(payment) {
  if (!payment || !payment.userId) {
    return
  }

  const payments = getPremiumPayments()

  const existingIndex = payments.findIndex(
    item => item.userId === payment.userId
  )

  if (existingIndex !== -1) {
    payments[existingIndex] = payment
  } else {
    payments.push(payment)
  }

  savePremiumPayments(payments)
}

/* COMMUNITY MEMBERSHIP */

export function getCommunityMemberships(userId) {
  if (!userId) return []

  const key = getUserStorageKey(
    STORAGE_KEYS.COMMUNITY_MEMBERSHIPS,
    userId
  )

  const memberships = localStorage.getItem(key)

  if (!memberships) {
    return []
  }

  try {
    return JSON.parse(memberships)
  } catch (error) {
    console.error(
      'Gagal membaca data komunitas:',
      error
    )

    return []
  }
}

export function saveCommunityMemberships(
  userId,
  communityIds
) {
  if (!userId) return

  const key = getUserStorageKey(
    STORAGE_KEYS.COMMUNITY_MEMBERSHIPS,
    userId
  )

  localStorage.setItem(
    key,
    JSON.stringify(communityIds)
  )
}

export function joinCommunity(
  userId,
  communityId
) {
  if (!userId || !communityId) return

  const memberships =
    getCommunityMemberships(userId)

  if (!memberships.includes(communityId)) {
    memberships.push(communityId)

    saveCommunityMemberships(
      userId,
      memberships
    )
  }
}

export function leaveCommunity(
  userId,
  communityId
) {
  if (!userId || !communityId) return

  const memberships =
    getCommunityMemberships(userId)

  const updatedMemberships =
    memberships.filter(
      id => id !== communityId
    )

  saveCommunityMemberships(
    userId,
    updatedMemberships
  )
}

export function isCommunityMember(
  userId,
  communityId
) {
  if (!userId || !communityId) {
    return false
  }

  const memberships =
    getCommunityMemberships(userId)

  return memberships.includes(communityId)
}

/* COMMUNITY POSTS */

export function getCommunityPosts() {
  const posts = localStorage.getItem(
    STORAGE_KEYS.COMMUNITY_POSTS
  )

  if (!posts) {
    return []
  }

  try {
    return JSON.parse(posts)
  } catch (error) {
    console.error(
      'Gagal membaca data posting komunitas:',
      error
    )

    return []
  }
}

export function saveCommunityPosts(posts) {
  localStorage.setItem(
    STORAGE_KEYS.COMMUNITY_POSTS,
    JSON.stringify(posts)
  )
}

export function addCommunityPost(post) {
  if (!post) return

  const posts = getCommunityPosts()

  posts.unshift(post)

  saveCommunityPosts(posts)
}


/* COMMUNITY COMMENTS */

export function getCommunityComments() {
  const comments = localStorage.getItem(
    STORAGE_KEYS.COMMUNITY_COMMENTS
  )

  if (!comments) {
    return []
  }

  try {
    return JSON.parse(comments)
  } catch (error) {
    console.error(
      'Gagal membaca data komentar komunitas:',
      error
    )

    return []
  }
}

export function saveCommunityComments(comments) {
  localStorage.setItem(
    STORAGE_KEYS.COMMUNITY_COMMENTS,
    JSON.stringify(comments)
  )
}

export function addCommunityComment(comment) {
  if (!comment) return

  const comments =
    getCommunityComments()

  comments.push(comment)

  saveCommunityComments(comments)
}

export { STORAGE_KEYS }