// import { boardService } from '../../services/board.service.js'

// export function setBoard(board) {
//   return (dispatch) => {
//     dispatch({ type: 'BOARD', board })
//   }
// }

// export function loadBoards() {
//   return async (dispatch) => {
//     try {
//       const boards = await boardService.query()
//       dispatch({ type: 'SET_BOARDS', boards })
//       return boards
//     } catch (err) {
//       throw err
//     }
//   }
// }

// export function addBoard(board) {
//   return async (dispatch) => {
//     try {
//       const savedBoard = await boardService.save(board)
//       dispatch({ type: 'ADD_BOARD', board: savedBoard })
//       return savedBoard
//     } catch (err) {
//       throw err
//     }
//   }
// }

// export function updateBoard(boardToSave) {
//   return async (dispatch) => {
//     try {
//       const savedBoard = await boardService.save(boardToSave)
//       dispatch({ type: 'UPDATE_BOARD', board: savedBoard })
//       return savedBoard
//     } catch (err) {
//       throw err
//     }
//   }
// }

// export function filtering(filterBy) {
//   return async (dispatch) => {
//     try {
//       const boards = await boardService.query(filterBy)
//       dispatch({ type: 'SET_BOARDS', boards })
//       dispatch({ type: 'FILTER_BOARD', filterBy })
//     } catch (err) {
//       throw err
//     }
//   }
// }

// export function removeBoard(boardId) {
//   return async (dispatch) => {
//     try {
//       await boardService.remove(boardId)
//       dispatch({ type: 'REMOVE_BOARD', boardId })
//       console.log('Deleted Succesfully!')
//     } catch (err) {
//       console.error('Error:', err)
//     }
//   }
// }

export function setFilterBy(filterBy) {
  return (dispatch) => {
    dispatch({ type: 'SET_FILTER_BY', filterBy })
  }
}
