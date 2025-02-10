import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './new-task-form.css'

function NewTaskForm({ onTaskAdd }) {
  const [label, setLabel] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const onLabelChange = (e) => {
    setLabel(e.target.value)
  }
  const onMinChange = (e) => {
    setMin(e.target.value)
  }
  const onSecChange = (e) => {
    setSec(e.target.value)
  }
  function clearValue() {
    setLabel('')
    setMin('')
    setSec('')
  }
  const onSubmit = (e) => {
    const pattern = /^\s/
    if (e.key === 'Enter') {
      if (pattern.test(label) || label.length === 0) {
        clearValue()
        return
      }
      onTaskAdd(label, min, sec)
      clearValue()
    }
  }

  return (
    <form className="new-todo-form">
      <input
        value={label}
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onChange={onLabelChange}
        onKeyDown={onSubmit}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        value={min}
        onChange={onMinChange}
        type="number"
        step="5"
        min="0"
        onKeyDown={onSubmit}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        value={sec}
        onChange={onSecChange}
        type="number"
        step="5"
        min="0"
        onKeyDown={onSubmit}
      />
    </form>
  )
}

NewTaskForm.defaultProps = {
  onTaskAdd: () => {},
}

NewTaskForm.propTypes = {
  onTaskAdd: PropTypes.func,
}

export default NewTaskForm
