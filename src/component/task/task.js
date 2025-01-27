import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
import KG from 'date-fns/locale/en-AU'

import './task.css'

export default class Task extends Component {
  static defaultProps = {
    date: new Date(),
  }

  static propTypes = {
    date: PropTypes.instanceOf(Date),
    completed: PropTypes.bool,
    editing: PropTypes.bool,
    label: PropTypes.string,
    onToggleEditing: PropTypes.func,
    onToggleCompleted: PropTypes.func,
    onDeleted: PropTypes.func,
  }

  state = {
    label: this.props.label,
    currentTime: '',
    oldTime: '',
    futureTime: '',
    timerId: '',
  }

  componentDidMount() {
    this.updateTimer(this.props.timer)
  }

  onEditingChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onEditingChangeComplete = (e) => {
    if (e.key === 'Enter') {
      this.props.onToggleEditing()
    }
  }
  updateTimer = (time = this.state.futureTime) => {
    if (time < 0) {
      clearInterval(this.state.timerId)
      return
    }
    let min = Math.floor(time / 60)
    let seconds = time % 60
    min = min < 10 ? '0' + min : min
    seconds = seconds < 10 ? '0' + seconds : seconds
    let res = `${min}:${seconds}`
    this.setState({
      currentTime: res,
      oldTime: time,
      futureTime: (time = time - 1),
    })
  }
  timerStart = () => {
    if (this.state.timerId) {
      return
    }
    const timerId = setInterval(this.updateTimer, 1000)
    this.setState({
      timerId: timerId,
    })
  }
  timerStop = () => {
    clearInterval(this.state.timerId)
    this.setState({
      timerId: '',
    })
  }
  componentWillUnmount() {
    clearInterval(this.state.timerId)
  }
  render() {
    const { onDeleted, onToggleCompleted, onToggleEditing, completed, editing, date } = this.props
    let classNames = ''

    if (completed) {
      classNames += 'completed'
    }
    if (editing) {
      classNames += ' editing'
    }
    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={onToggleCompleted} checked={completed} />
          <label>
            <span className="title" onClick={onToggleCompleted}>
              {this.state.label}
            </span>
            <span className="description">
              <button className="icon icon-play" onClick={this.timerStart}></button>
              <button className="icon icon-pause" onClick={this.timerStop}></button>
              {this.state.currentTime}
            </span>
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
          defaultValue={this.state.label}
          onChange={this.onEditingChange}
          onKeyDown={this.onEditingChangeComplete}
        />
      </li>
    )
  }
}
