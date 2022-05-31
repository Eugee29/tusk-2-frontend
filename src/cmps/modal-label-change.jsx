import React, { useEffect, useState, useRef, useParam } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { utilService } from '../services/util.service'
import { setModal } from '../store/app/app.actions'

// import { BsCheck2 } from 'react-icons/bs'

export const ModalLabelChange = ({ task, board, editLabel, updateTask, onUpdateBoard }) => {

   const { groupId, taskId } = useParams()
   const [updatedBoard, setupdatedBoard] = useState(board)
   const [labelName, setLabelName] = useState(editLabel.title)
   const [color, setcolor] = useState(editLabel.color)
   const searchInput = useRef(null);
   const firstLoad = useRef(false)
   const buttonRef = useRef()

   const dispatch = useDispatch()

   useEffect(() => {
      // searchInput.current.focus();
   }, [])

   if (!editLabel) return
   if (!task) return
   if (!board) return

   console.log(editLabel);

   // useEffect(() => {
   //    if (!firstLoad.current) firstLoad.current = true
   //    else onUpdateBoard(updatedBoard)
   // }, [updatedBoard])

   const onToggle = (ev) => {
      ev.preventDefault()
      const boardLabelIdx = board.labels.findIndex(boardLabel => boardLabel.id === editLabel.id)
      board.labels[boardLabelIdx] = { id: editLabel.id, title: labelName, color: color }
      onModal('Labels')
      onUpdateBoard(board)
   }

   const onDelete = (ev) => {
      ev.preventDefault()
      const boardLabelIdx = board.labels.findIndex(boardLabel => boardLabel.id === editLabel.id)
      board.labels.splice(boardLabelIdx, 1)

      for (let i = 0; i < board.groups.length; i++) {
         const group = board.groups[i]
         for (let j = 0; j < group.tasks.length; j++) {
            const groupTask = group.tasks[j]
            for (let k = 0; k < groupTask.labelIds.length; k++) {
               const labelId = groupTask.labelIds[k]
               if (labelId === editLabel.id) {
                  groupTask.labelIds.splice(k, 1)
               }
            }
         }
      }
      onModal('Labels')
      onUpdateBoard(board)
   }

   const onPickColor = (color) => {
      setcolor(color)
   }

   const handleChange = ({ target }) => {
      setLabelName(target.value)
      // setfilterMembers(updatedBoard.members.filter(member => member.fullName.toLowerCase().includes(target.value.toLowerCase())))
   }

   const onModal = (category) => {
      dispatch(setModal({ category, title: category, task, updateTask, board, onUpdateBoard, position: utilService.getPosition(buttonRef.current) }))
   }

   console.log('board', board);

   return (
      <div className="change-section">

         <div className="change-box">
            <h3 className="label">Name</h3>
            <input ref={searchInput} type="text" name='search' value={labelName} onChange={handleChange} />
         </div>

         <div className="change-box">
            <h3 className="label">Select a color</h3>

            <div className="colors-section">
               <div className="box-container">

                  <button onClick={() => { onPickColor('#61bd4f') }} style={{ backgroundColor: `#61bd4f` }}></button>
                  <button onClick={() => { onPickColor('#f2d600') }} style={{ backgroundColor: `#f2d600` }}></button>
                  <button onClick={() => { onPickColor('#ff9f1a') }} style={{ backgroundColor: `#ff9f1a` }}></button>
                  <button onClick={() => { onPickColor('#EB5A44') }} style={{ backgroundColor: `#EB5A44` }}></button>
                  <button onClick={() => { onPickColor('#c377e0') }} style={{ backgroundColor: `#c377e0` }}></button>
                  <button onClick={() => { onPickColor('#0079bf') }} style={{ backgroundColor: `#0079bf` }}></button>
                  <button onClick={() => { onPickColor('#00c2e0') }} style={{ backgroundColor: `#00c2e0` }}></button>
                  <button onClick={() => { onPickColor('#51e898') }} style={{ backgroundColor: `#51e898` }}></button>
                  <button onClick={() => { onPickColor('#ff78cb') }} style={{ backgroundColor: `#ff78cb` }}></button>
                  <button onClick={() => { onPickColor('#344563') }} style={{ backgroundColor: `#344563` }}></button>
               </div>
            </div>

            <button onClick={onToggle}>Save</button>
            <button onClick={onDelete} className="delete" >Delete</button>
         </div>

      </div>
   )

}