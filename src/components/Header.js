import PropTypes from 'prop-types'
import Button from './Button'
const Header = ({ title, onAdd, showAddTask }) => {
  return (
    <header className='header'>
        <h1>{title}</h1>
        <Button onClick={onAdd} text={ showAddTask ? 'Close' : 'Add'} color={!showAddTask ? 'green' : 'red'}/>
    </header>
  )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

// const headerStyle = {
//     color: 'red', 
//     backgroundColor: 'black'
// }
export default Header