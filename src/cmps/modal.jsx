import React, { useRef } from 'react'

import { ModalCover } from './modal-cover'
import { ModalMember } from './modal-member'
import { ModalLabel } from './modal-label'
import { ModalLabelCreate } from './modal-label-create'
import { ModalLabelChange } from './modal-label-change'

import { CgClose } from 'react-icons/cg'
import { IoIosArrowBack } from 'react-icons/io'

export const Modal = ({ task, category, pos, board, onUpdateBoard, updateTask, onOpenModalDynamic }) => {

  //  const editLabel = useRef('')

  //  const changeEditLabel = (label) => {
  //     editLabel.current = label
  //     onOpenModalDynamic('Change label')
  //  }

  // switch (category) {
  //   case 'Cover':
  //     pos.top += 50
  //     break

  //   default:
  //     break
  // }

  const { modal } = useSelector(({ appModule }) => appModule)
  console.log(modal)

  if (!modal) return
  // modal.position.top += 30

  return (
    <div className="nice-popup" style={{ ...modal.position }}>
      <header>
        {category === 'Create label' && <button onClick={() => onOpenModalDynamic('Labels')} className="sidebar-icon-left"><span ><IoIosArrowBack /></span></button>}
        {category === 'Change label' && <button onClick={() => onOpenModalDynamic('Labels')} className="sidebar-icon-left"><span ><IoIosArrowBack /></span></button>}
        <div className="label">{category}</div>
        <button className="sidebar-icon-right" onClick={() => onOpenModalDynamic()}><span ><CgClose /></span></button>
      </header>

      <main className="main-modal">

        {category === 'Cover' && <ModalCover task={task} />}
        {category === 'Members' && <ModalMember task={task} updateTask={updateTask} board={board} />}
        {category === 'Labels' && <ModalLabel task={task} updateTask={updateTask} board={board} onOpenModalDynamic={onOpenModalDynamic} changeEditLabel={changeEditLabel} />}
        {category === 'Create label' && <ModalLabelCreate task={task} board={board} onUpdateBoard={onUpdateBoard} onOpenModalDynamic={onOpenModalDynamic} />}
        {category === 'Change label' && <ModalLabelChange task={task} board={board} editLabel={editLabel.current} onOpenModalDynamic={onOpenModalDynamic} updateTask={updateTask} onUpdateBoard={onUpdateBoard} />}
      </main>

    </div>)

}