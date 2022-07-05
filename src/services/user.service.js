import { httpService } from './http.service'
// import { store } from '../store/store'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  saveLocalUser,
  getUsers,
  getById,
  // remove,
  update,
  // changeScore,
}

// window.userService = userService

function getUsers() {
  // return storageService.query('user')
  return httpService.get(`user`)
}

// function onUserUpdate(user) {
//   // showSuccessMsg(`This user ${user.fullname} just got updated from socket, new score: ${user.score}`)
//   store.dispatch({ type: 'SET_WATCHED_USER', user })
// }

async function getById(userId) {
  const user = await httpService.get(`user/${userId}`)
  return user
}

// function remove(userId) {
//   return httpService.delete(`user/${userId}`)
// }

async function update(user) {
  // await storageService.put('user', user)
  user = await httpService.put(`user/${user._id}`, user)
  // Handle case in which admin updates other user's details
  if (getLoggedinUser()._id === user._id) saveLocalUser(user)
  return user
}

async function login(userCred) {
  // const users = await storageService.query('user')
  // const user = users.find(user => user.username === userCred.username)
  try {
    const user = await httpService.post('auth/login', userCred)
    return saveLocalUser(user)
  } catch (err) {
    throw err
  }
}
async function signup(userCred) {
  // userCred.score = 10000;
  // const user = await storageService.post('user', userCred)
  const user = await httpService.post('auth/signup', userCred)
  // socketService.login(user._id)
  return saveLocalUser(user)
}
async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  // socketService.logout()
  // return await httpService.post('auth/logout')
}

// async function changeScore(by) {
//   const user = getLoggedinUser()
//   if (!user) throw new Error('Not loggedin')
//   user.score = user.score + by || by
//   await update(user)
//   return user.score
// }

function saveLocalUser(user) {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

// ;(async ()=>{
//     await userService.signup({_id: 'id101', fullname: 'Eran Avichzer', username: 'eran', password:'123456', score: 10000, isAdmin: true})
// })()
