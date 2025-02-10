import React, { Component } from 'react'
import './task-list.css'
import PropTypes from 'prop-types'

import Task from '../task'

export default class TaskList extends Component {
  static defaultProps = {
    onDeleted: () => {},
    onSave: () => {},
    onToggleCompleted: () => {},
    onToggleEditing: () => {},
    filter: 'All',
  }

  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    filter: PropTypes.string,
    onDeleted: PropTypes.func,
    onSave: PropTypes.func,
    onToggleCompleted: PropTypes.func,
    onToggleEditing: PropTypes.func,
    addTimerId: PropTypes.func,
  }

  filterSort(filter, elementState) {
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

  render() {
    const { todos, onDeleted, onSave, onToggleCompleted, onToggleEditing, filter } = this.props
    let elements = []

    elements = todos.map((item) => {
      let visible = this.filterSort(filter, item.completed)

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
          timer={item.timer}
          timerId={item.timerId}
          visible={visible}
        />
      )
    })
    return <ul className="todo-list">{elements}</ul>
  }
}
