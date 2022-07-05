import React, { useEffect, useState } from 'react'
// import { useDispatch } from 'react-redux'

import { BoardList } from '../cmps/board/board-list.jsx'
import { boardService } from '../services/board.service.js'
// import { /*loadBoards,*/ updateBoard } from '../store/board/board.action.js'

export const Workspace = () => {
  const [boards, setBoards] = useState(null)
  // const dispatch = useDispatch()

  useEffect(() => {
    loadBoards()
    // loadBoardsAsync()
    // eslint-disable-next-line
  }, [])

  const loadBoards = async () => {
    const boards = await boardService.query()
    setBoards(boards)
  }

  // const loadBoardsAsync = async () => {
  //   const boardsFromService = await dispatch(loadBoards())
  //   setBoards(boardsFromService)
  // }

  const onUpdateBoard = async (updatedBoard) => {
    await boardService.save(updatedBoard)
    const updatedBoards = boards.map((board) => (board._id === updatedBoard._id ? updatedBoard : board))
    setBoards(updatedBoards)
  }

  if (!boards)
    return (
      <div className="icon-bars">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    )

  return (
    <main className="workspace">
      <BoardList boards={boards} onUpdateBoard={onUpdateBoard} />
    </main>
  )
}
