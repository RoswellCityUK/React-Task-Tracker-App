import PropTypes from 'prop-types'
import Button from './Button'

const onClick = () => {
    console.log('click')
}

const Header = ({ title }) => {
    return (
        <header className='header'>
            {/*<h1 style={headingStyle}>{title}</h1>*/}
            <h1>{title}</h1>
            <Button color='green' text='Hello' onClick={onClick}/>
        </header>
    )
}
Header.defaultProps = {
    title: 'Task Tracker',
}
Header.propTypes = {
    title: PropTypes.string.isRequired,
}
//const headingStyle = {
//    color: 'red',
//    backgroundColor: 'black',
//}

export default Header
