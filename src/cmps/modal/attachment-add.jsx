import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { setModal } from '../../store/app/app.actions'

import { boardService } from '../../services/board.service'
import { uploadService } from '../../services/upload.service'

export const AttachmentAdd = ({ task, updateTask }) => {

  const [fileURL, setFileURL] = useState('')
  const dispatch = useDispatch()

  const handleChange = ({ target }) => {
    setFileURL(target.value)
  }

  const addAttachment = async (ev) => {
    ev.preventDefault()
    dispatch(setModal(null))

    if (!ev.target.files) ev.target.files = [fileURL]
    if (!task.attachments) task.attachments = []
    let attachment = boardService.getEmptyAttachment()

    try {
      const res = await uploadService.uploadImg(ev)
      attachment.fileName = res.original_filename
      attachment.fileUrl = res.secure_url
      task.attachments.unshift(attachment)
      updateTask(task)
    } catch (err) {
      attachment.fileName = fileURL
      attachment.fileUrl = fileURL
      task.attachments.unshift(attachment)
      updateTask(task)
    }
  }

  return (
    <section className="attachment-add">
      <label htmlFor="fileInput" className="attach-computer-label">Computer</label>
      <input type="file" id="fileInput" className="attach-computer" onInput={addAttachment} />
      <hr />
      <form onSubmit={addAttachment}>
        <label htmlFor="linkInput" className="input-label">Attach a link</label>
        <input id="linkInput" className="link-input" type="text" value={fileURL} placeholder="Paste any link here..." onChange={handleChange} autoFocus />
        <button className="attach-btn">Attach</button>
      </form>
    </section>
  )
}