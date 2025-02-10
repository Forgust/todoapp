import React from 'react'
import './task-list.css'
import PropTypes from 'prop-types'

import Task from '../task'

function TaskList({ todos, onDeleted, onSave, onToggleCompleted, onToggleEditing, filter }) {
  function filterSort(filter, elementState) {
    let visible = true
    switch (filter) {
      case 'All':
        visible = true
        break
      case 'Active':
        if (!elementState) {
          visible = true
        } else {
          visible = false
        }
        break
      case 'Completed':
        if (elementState) {
          visible = true
        } else {
          visible = false
        }
        break
      default:
        visible = true
    }
    return visible
  }

  let elements = []

  elements = todos.map((item) => {
    let visible = filterSort(filter, item.completed)

    return (
      <Task
        date={item.date}
        label={item.label}
        key={item.id}
        completed={item.completed}
        editing={item.editing}
        onDeleted={() => onDeleted(item.id)}
        onSave={() => onSave(item.id)}
        onToggleCompleted={() => {
          onToggleCompleted(item.id)
        }}
        onToggleEditing={() => {
          onToggleEditing(item.id)
        }}
        time={item.time}
        visible={visible}
      />
    )
  })
  return <ul className="todo-list">{elements}</ul>
}

TaskList.defaultProps = {
  onDeleted: () => {},
  onSave: () => {},
  onToggleCompleted: () => {},
  onToggleEditing: () => {},
  filter: 'All',
}
TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  filter: PropTypes.string,
  onDeleted: PropTypes.func,
  onSave: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  onToggleEditing: PropTypes.func,
  addTimerId: PropTypes.func,
}

export default TaskList
