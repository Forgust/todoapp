import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './new-task-form.css'

export default class NewTaskForm extends Component {
  static defaultProps = {
    onTaskAdd: () => {},
  }

  static propTypes = {
    onTaskAdd: PropTypes.func,
  }

  state = {
    label: '',
    min: '',
    sec: '',
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }
  onMinChange = (e) => {
    this.setState({
      min: e.target.value,
    })
  }
  onSecChange = (e) => {
    this.setState({
      sec: e.target.value,
    })
  }
  onSubmit = (e) => {
    const { label, min, sec } = this.state
    const pattern = /^\s/
    if (e.key === 'Enter') {
      if (pattern.test(label) || label.length === 0) {
        this.setState({
          label: '',
          min: '',
          sec: '',
        })
        return
      }
      this.props.onTaskAdd(label, min, sec)
      this.setState({
        label: '',
        min: '',
        sec: '',
      })
    }
  }

  render() {
    const { label, min, sec } = this.state
    return (
      <form className="new-todo-form">
        <input
          value={label}
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onLabelChange}
          onKeyDown={this.onSubmit}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          value={min}
          onChange={this.onMinChange}
          type="number"
          step="5"
          min="0"
          onKeyDown={this.onSubmit}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          value={sec}
          onChange={this.onSecChange}
          type="number"
          step="5"
          min="0"
          onKeyDown={this.onSubmit}
        />
      </form>
    )
  }
}
