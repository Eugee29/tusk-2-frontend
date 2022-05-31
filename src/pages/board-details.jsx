import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { boardService } from '../services/board.service.js'
import { updateBoard, saveBoard } from '../store/board/board.action.js'

import { BoardHeader } from '../cmps/board-header.jsx'
import { GroupList } from '../cmps/group-list.jsx'

export const BoardDetails = () => {
  const params = useParams()
  const [board, setBoard] = useState(null)
  const dispatch = useDispatch()
  const { boards } = useSelector(({ boardModule }) => boardModule)

  useEffect(() => {
    loadBoard()
  }, [boards])

  const loadBoard = async () => {
    const board = await boardService.getById(params.boardId)
    setBoard(board)

    // dispatch(saveBoard(board))
  }

  const onUpdateBoard = async (board) => {
    await dispatch(updateBoard(board))
    setBoard(board)
  }

  if (!board) return <h1>Loading..</h1>

  return (
    <main className='board-details' style={{ backgroundImage: `url(${board.style.bgImg})` }}>
      <BoardHeader board={board} onUpdateBoard={onUpdateBoard} />
      <GroupList board={board} onUpdateBoard={onUpdateBoard} />
      <Outlet context={{ onUpdateBoard, board }} />
    </main>
  )
}