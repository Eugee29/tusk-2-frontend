import React, { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { utilService } from '../services/util.service'
import { setModal } from '../store/app/app.actions'

export function TaskDetailsCover({ task }) {

   const buttonRef = useRef()
   const dispatch = useDispatch()

   const onModal = (category) => {
      dispatch(setModal({ category, title: category, task, position: utilService.getPosition(buttonRef.current) }))
   }

   return (
      <header>

         {task?.style?.bgColor && <div className="task-details-cover color" style={{ backgroundColor: `${task.style.bgColor}` }}>
            <button ref={buttonRef} onClick={(ev) => { ev.stopPropagation(); onModal('Cover') }}>Cover</button>
         </div>}

         {task?.style?.imgURL && <div className="task-details-cover img " style={{ backgroundImage: `url('${task.style.imgURL}')` }}>
            <button ref={buttonRef} onClick={(ev) => { ev.stopPropagation(); onModal('Cover') }}>Cover</button>
         </div>}

      </header>

   )
}