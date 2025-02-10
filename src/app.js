import React, { useState } from 'react'

import './app.css'

import Footer from './component/footer'
import NewTaskForm from './component/new-task-form'
import TaskList from './component/task-list'

const App = () => {
  const [todoData, setTodoData] = useState([])
  const [filter, setFilter] = useState('All')

  let maxId = 0

  const clearCompleted = () => {
    setTodoData(({ todoData }) => {
      const newArr = todoData.filter((el) => !el.completed)
      return {
        todoData: newArr,
      }
    })
  }
  const timeFormat = (min = 0, sec = 0) => {
    let time = Number(min) * 60 + Number(sec)
    return time
  }

  const createDataItem = (text, min, sec) => {
    return {
      label: text,
      editing: false,
      completed: false,
      id: (maxId += 1),
      date: new Date(),
      time: timeFormat(min, sec),
    }
  }

  const toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id)
    const oldItem = arr[idx]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  const deleteTask = (id) => {
    setTodoData(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]

      return {
        todoData: newArray,
      }
    })
  }

  const onTaskAdd = (text, min, sec) => {
    setTodoData(({ todoData }) => {
      const newArray = [...todoData, createDataItem(text, min, sec)]

      return {
        todoData: newArray,
      }
    })
  }

  const onToggleCompleted = (id) => {
    setTodoData(toggleProperty(todoData, id, 'completed'))
  }

  const onToggleEditing = (id) => {
    setTodoData(toggleProperty(todoData, id, 'editing'))
  }

  const changeFilter = (text) => {
    setFilter(text)
  }
  const completedArr = todoData.filter((el) => !el.completed)
  const count = completedArr.length

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onTaskAdd={onTaskAdd} />
      </header>
      <section className="main">
        <TaskList
          todos={todoData}
          onDeleted={deleteTask}
          onToggleCompleted={onToggleCompleted}
          onToggleEditing={onToggleEditing}
          filter={filter}
        />
        <Footer count={count} changeFilter={changeFilter} filter={filter} clearCompleted={clearCompleted} />
      </section>
    </section>
  )
}

export default App
