import React, { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setModal } from '../../store/app/app.actions'

import { AiOutlineUser } from 'react-icons/ai'
import { BiLabel } from 'react-icons/bi'
import { BsCheck2Square } from 'react-icons/bs'
import { FiClock } from 'react-icons/fi'
import { GrAttachment } from 'react-icons/gr'
import { IoMdBrowsers } from 'react-icons/io'


export function TaskDetailsSideTask({ task, board, updateTask, onUpdateBoard }) {

  const membersRef = useRef()
  const labelsRef = useRef()
  const checklistRef = useRef()
  const datesRef = useRef()
  const attachmentRef = useRef()
  const coverRef = useRef()

  const dispatch = useDispatch()
  const { user } = useSelector(({ userModule }) => userModule)

  const [isUserMember, setIsUserMember] = useState(false)

  useEffect(() => {
    onIsUserMember()
  }, [task])

  const onIsUserMember = () => {
    const isTaskMember = task.members.some(member => member._id === user._id)
    setIsUserMember(isTaskMember)
  }

  const onJoinMember = () => {
    const isTaskMember = task.members.some(member => member._id === user._id)
    if (isTaskMember) return

    const newTaskMembers = [...task.members]
    newTaskMembers.push({
      _id: user._id,
      fullname: user.fullname,
      imgURL: user.imgURL,
      username: user.username
    })

    updateTask({ ...task, members: newTaskMembers })
  }

  const onOpenModal = (ev, modal) => {
    ev.stopPropagation()
    dispatch(setModal(modal))
  }

  return (
    <section className='side-task'>

      {!isUserMember && <h3 className='label-header'>Suggested</h3>}
      {!isUserMember && <div className='join-container'>
        <a className='sidebar-button' onClick={onJoinMember} href='#' title='Join'>
          <span className='sidebar-icon'><AiOutlineUser /></span>
          <span>Join</span>
        </a>
      </div>}

      <div>
        <h3 className='label-header'>Add to card</h3>
        <div >

          <a className='sidebar-button' ref={membersRef}
            onClick={(ev) => onOpenModal(ev, { element: membersRef.current, category: 'Members', title: 'Members', task, updateTask, board, onUpdateBoard })} title='Members'>

            <span className='sidebar-icon'><AiOutlineUser /></span>
            <span className=''>Members</span>
          </a>

          <a className='sidebar-button' ref={labelsRef}
            onClick={(ev) => onOpenModal(ev, { element: labelsRef.current, category: 'Labels', title: 'Labels', task, updateTask, board, onUpdateBoard })} title='Labels'>

            <span className='sidebar-icon'><BiLabel /></span>
            <span className=''>Labels</span>
          </a>

          <a className='sidebar-button' ref={checklistRef}
            onClick={(ev) => onOpenModal(ev, { element: checklistRef.current, title: 'Add checklist', category: 'checklist-add', props: { updateTask, task } })} title='Checklist'>

            <span className='sidebar-icon'><BsCheck2Square /></span>
            <span className=''>Checklist</span></a>

          <a className='sidebar-button' ref={datesRef}
            onClick={(ev) => onOpenModal(ev, { element: datesRef.current, category: 'Dates', title: 'Dates', task, updateTask, board, onUpdateBoard })} title='Dates'>

            <span className='sidebar-icon'><FiClock /></span>
            <span className=''>Dates</span>
          </a>

          <a className='sidebar-button' ref={attachmentRef}
            onClick={(ev) => onOpenModal(ev, { element: attachmentRef.current, category: 'attachment-add', title: 'Attach from...', props: { task, updateTask } })} title='Attachment'>

            <span className='sidebar-icon'><GrAttachment /></span>
            <span className=''>Attachment</span>
          </a>

          <a className='sidebar-button' ref={coverRef}
            onClick={(ev) => onOpenModal(ev, { element: coverRef.current, category: 'Cover', title: 'Cover', task, updateTask, board, onUpdateBoard })} title='Cover'>

            <span className='sidebar-icon'><IoMdBrowsers /></span>
            <span className=''>Cover</span>
          </a>

        </div>
      </div>
    </section>
  )
}

