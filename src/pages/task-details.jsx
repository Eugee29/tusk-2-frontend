
import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useOutletContext, useParams } from "react-router-dom"

import { VscClose } from 'react-icons/vsc'

import { loadTask } from '../store/board/board.action.js'
import { TaskDetailsCover } from '../cmps/task-details-cover.jsx'
import { TaskDetailsTitle } from '../cmps/task-details-title.jsx'
import { TaskDetailsInfo } from '../cmps/task-details-info.jsx'
import { TaskDetailsDescription } from '../cmps/task-details-description.jsx'
import { TaskDetailsAttachments } from '../cmps/task-details-attachments.jsx'
import { TaskDetailsActivity } from '../cmps/task-details-activity.jsx'
import { TaskDetailsSideTask } from '../cmps/task-details-side-task.jsx'
import { ChecklistList } from '../cmps/checklist-list.jsx'
import { Modal } from '../cmps/modal.jsx'

export const TaskDetails = () => {

   const navigate = useNavigate()
   const { boardId, groupId, taskId } = useParams()
   const { board, onUpdateBoard } = useOutletContext()

   const group = board.groups.find(group => group.id === groupId)
   const task = group.tasks.find(task => task.id === taskId)

   const [isCloseEdit, setIsCloseEdit] = useState(true)

   const [modal, setModal] = useState(null)

   const updateTask = async (taskToUpdate) => {
      const group = board.groups.find(group => group.id === groupId)
      const { tasks } = group
      const updatedTasks = tasks.map(task => task.id === taskToUpdate.id ? taskToUpdate : task)
      const updatedGroup = { ...group, tasks: updatedTasks }
      const updatedGroups = board.groups.map(group => group.id === updatedGroup.id ? updatedGroup : group)
      const updatedBoard = { ...board, groups: updatedGroups }
      onUpdateBoard(updatedBoard)
   }

   const onGoBack = () => {
      navigate(`/board/${boardId}`)
   }

   const onDetailsClick = (ev) => {
      ev.stopPropagation()
      setIsCloseEdit(!isCloseEdit)
   }

   const onOpenModalDynamic = (name) => {
      if (!name) setModal('')
      if (name === modal) setModal('')
      else setModal(name)
   }

   if (!task) return <h1>Loading task...</h1>

   console.log('modal', modal);

   return <section className="task-details" onClick={onGoBack}>
      <div className="task-details-container" onClick={onDetailsClick}>
         <button className="go-back-button" onClick={onGoBack}><VscClose className='close-icon' /> </button>

         <div>
            {task?.style && <TaskDetailsCover task={task} setModal={setModal}/>}
            {task?.title && <TaskDetailsTitle title={task.title} />}

            <div className="main-task">
               {task && <TaskDetailsInfo board={board} task={task} updateTask={updateTask} onUpdateBoard={onUpdateBoard} />}
               {task?.description && <TaskDetailsDescription task={task} isCloseEdit={isCloseEdit} />}
               {task?.attachments && <TaskDetailsAttachments task={task} />}
               {task.checklists?.length && <ChecklistList task={task} updateTask={updateTask} />}
               {task && <TaskDetailsActivity task={task} isCloseEdit={isCloseEdit} />}
            </div>
            <TaskDetailsSideTask board={board} task={task} updateTask={updateTask} onUpdateBoard={onUpdateBoard} />
         </div>
      </div>

      {modal && <Modal task={task} board={board} updateTask={updateTask} onUpdateBoard={onUpdateBoard} onOpenModalDynamic={onOpenModalDynamic} {...modal} ></Modal>}

   </section >
}
