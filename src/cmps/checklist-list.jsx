import { useState } from 'react'
import { useSelector } from 'react-redux'
import { ChecklistPreview } from './checklist-preview'

export const ChecklistList = ({ task, updateTask, setModalPos }) => {

  const { checklists } = task

  const updateChecklist = (checklistToUpdate) => {
    const updatedChecklists = checklists.map(checklist => checklist.id === checklistToUpdate.id ? checklistToUpdate : checklist)
    updateTask({ ...task, checklists: updatedChecklists })
  }

  return (
    <ul className='checklist-list'>
      {checklists.map(checklist => <ChecklistPreview key={checklist.id} checklist={checklist} updateChecklist={updateChecklist} setModalPos={setModalPos} />)}
    </ul>
  )
}