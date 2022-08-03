import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, stateAddTask, toggleAddTask }) => {
    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button color={!stateAddTask ? 'green' : 'red'} text={!stateAddTask ? 'Add' : 'Close'} onClick={toggleAddTask}/>
        </header>
    )
}
Header.defaultProps = {
    title: 'Task Tracker',
}
Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header
