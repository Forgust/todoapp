import React, { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
import KG from 'date-fns/locale/en-AU'

import Timer from '../timer'

import './task.css'

function Task({ onDeleted, onToggleCompleted, onToggleEditing, completed, editing, date, visible, label, time }) {
  const [newLabel, setLabel] = useState(label)

  const onEditingChange = (e) => {
    setLabel(e.target.value)
  }

  const onEditingChangeComplete = (e) => {
    if (e.key === 'Enter') {
      onToggleEditing()
    }
  }
  function timeReForm(time) {
    let res = []
    const secondCounter = time % 60
    const minuteCounter = Math.floor(time / 60)

    const seconds = String(secondCounter).length === 1 ? `0${secondCounter}` : secondCounter
    const minutes = String(minuteCounter).length === 1 ? `0${minuteCounter}` : minuteCounter
    res = [seconds, minutes]
    return res
  }

  const [sec, min] = timeReForm(time)

  let classNames = ''

  if (completed) {
    classNames += 'completed'
  }
  if (editing) {
    classNames += ' editing'
  }

  if (!visible) {
    classNames += ' hidden'
  }

  return (
    <li className={classNames}>
      <div className="view">
        <input className="toggle" type="checkbox" onChange={onToggleCompleted} checked={completed} />
        <label>
          <span className="title" onClick={onToggleCompleted}>
            {newLabel}
          </span>
          <Timer timeReForm={timeReForm} sec={sec} min={min} time={time} />
          <span className="description">
            {`created ${formatDistanceToNow(date, {
              includeSeconds: true,
              locale: KG,
              addSuffix: true,
            })}`}
          </span>
        </label>
        <button className="icon icon-edit" onClick={onToggleEditing} />
        <button className="icon icon-destroy" onClick={onDeleted} />
      </div>
      <input
        type="text"
        className="edit"
        defaultValue={label}
        onChange={onEditingChange}
        onKeyDown={onEditingChangeComplete}
      />
    </li>
  )
}

Task.defaultProps = {
  date: new Date(),
}

Task.propTypes = {
  date: PropTypes.instanceOf(Date),
  completed: PropTypes.bool,
  editing: PropTypes.bool,
  label: PropTypes.string,
  onToggleEditing: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  onDeleted: PropTypes.func,
}

export default Task
