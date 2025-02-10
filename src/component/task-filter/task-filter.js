import React from 'react'
import './task-filter.css'
import PropTypes from 'prop-types'

function TaskFilter({ filter, changeFilter }) {
  return (
    <ul className="filters">
      <li>
        <button
          onClick={() => {
            changeFilter('All')
          }}
          className={filter === 'All' ? 'selected' : null}
        >
          All
        </button>
      </li>
      <li>
        <button
          onClick={() => {
            changeFilter('Active')
          }}
          className={filter === 'Active' ? 'selected' : null}
        >
          Active
        </button>
      </li>
      <li>
        <button
          onClick={() => {
            changeFilter('Completed')
          }}
          className={filter === 'Completed' ? 'selected' : null}
        >
          Completed
        </button>
      </li>
    </ul>
  )
}

TaskFilter.defaultProps = {
  changeFilter: () => {},
}

TaskFilter.propTypes = {
  filter: PropTypes.string,
  changeFilter: PropTypes.func,
}

export default TaskFilter
