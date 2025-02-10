import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'

function Timer({ timeReForm, sec, min, time }) {
  const [second, setSecond] = useState(sec)
  const [minute, setMinute] = useState(min)
  const [isActive, setIsActive] = useState(false)
  const [counter, setCounter] = useState(time)

  useEffect(() => {
    let intervalId
    if (counter < 0) {
      return () => clearInterval(intervalId)
    }
    if (isActive) {
      intervalId = setInterval(() => {
        setCounter((counter) => counter - 1)
        const [computedSecond, computedMinute] = timeReForm(counter)
        setSecond(computedSecond)
        setMinute(computedMinute)
      }, 1000)
    }

    return () => clearInterval(intervalId)
  }, [isActive, counter])

  function timerStart() {
    setIsActive(true)
  }
  function timerStop() {
    setIsActive(false)
  }

  let currentTime = `${minute}:${second}`

  return (
    <span className="description">
      <button className="icon icon-play" onClick={timerStart}></button>
      <button className="icon icon-pause" onClick={timerStop}></button>
      {currentTime}
    </span>
  )
}

Timer.defaultProps = {
  sec: '00',
  min: '00',
  time: 0,
}
Timer.propTypes = {
  timeReForm: PropTypes.func,
  sec: PropTypes.string,
  min: PropTypes.string,
  time: PropTypes.number,
}

export default Timer
