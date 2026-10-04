import {
  getUsers,
  saveUsers,
  getCurrentUser,
  saveCurrentUser,
  removeCurrentUser
} from './storageService'

function createUserId() {
  return `user-${Date.now()}`
}

function ensureDefaultAdmin() {
  const users = getUsers()

  const existingAdmin = users.find(
    user => user.role === 'admin'
  )

  if (existingAdmin) {
    return
  }

  const defaultAdmin = {
    id: 'admin-001',
    name: 'Administrator',
    email: 'admin@capstone.local',
    password: 'admin123',
    role: 'admin',
    isPremium: false,
    trialStartedAt: null,
    trialEndAt: null,
    premiumStatus: 'none'
  }

  users.push(defaultAdmin)

  saveUsers(users)
}

export function registerUser(name, email, password) {
  const users = getUsers()

  const normalizedEmail = email.trim().toLowerCase()

  const existingUser = users.find(
    user => user.email === normalizedEmail
  )

  if (existingUser) {
    return {
      success: false,
      message: 'Email sudah terdaftar.'
    }
  }

  const newUser = {
    id: createUserId(),
    name: name.trim(),
    email: normalizedEmail,
    password,
    role: 'user',
    isPremium: false,
    trialStartedAt: null,
    trialEndAt: null,
    premiumStatus: 'none'
  }

  users.push(newUser)

  saveUsers(users)

  return {
    success: true,
    user: newUser
  }
}

export function login(email, password, role) {
  ensureDefaultAdmin()

  const users = getUsers()

  const normalizedEmail = email.trim().toLowerCase()

  const user = users.find(
    item =>
      item.email === normalizedEmail &&
      item.password === password &&
      item.role === role
  )

  if (!user) {
    return {
      success: false,
      message: 'Email, password, atau role tidak sesuai.'
    }
  }

  const loggedInUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    isPremium: user.isPremium || false,
    trialStartedAt: user.trialStartedAt || null,
    trialEndAt: user.trialEndAt || null,
    premiumStatus: user.premiumStatus || 'none'
  }

  saveCurrentUser(loggedInUser)

  return {
    success: true,
    user: loggedInUser
  }
}

export function logout() {
  removeCurrentUser()
}

export function getLoggedInUser() {
  return getCurrentUser()
}

export function isLoggedIn() {
  return getCurrentUser() !== null
}

export function updateUser(userId, updates) {
  const users = getUsers()

  const userIndex = users.findIndex(
    user => user.id === userId
  )

  if (userIndex === -1) {
    return {
      success: false,
      message: 'Pengguna tidak ditemukan.'
    }
  }

  users[userIndex] = {
    ...users[userIndex],
    ...updates
  }

  saveUsers(users)

  const currentUser = getCurrentUser()

  if (currentUser && currentUser.id === userId) {
    const updatedCurrentUser = {
      ...currentUser,
      ...updates
    }

    saveCurrentUser(updatedCurrentUser)
  }

  return {
    success: true,
    user: users[userIndex]
  }
}