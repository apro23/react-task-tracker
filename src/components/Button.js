import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ text, color, onClick }) => {
  return (
    <button onClick={onClick} className='btn' style={{ backgroundColor: color }}>{text}</button>
  )
}

Button.defaultProps = {
    color: 'steelBlue'
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    onClick: PropTypes.func
}

export default Button