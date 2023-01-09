import PropTypes from 'prop-types'
import Button from "./Button"

const Header = ({ title, toggleAdder , setToggleAdder }) => {
  const onClick = () => {
    setToggleAdder(!toggleAdder)
  }
  
    return (
    <header  className='header'>
        <h1>{title}</h1>
        <Button color="green" text= "Add" onClick={onClick}></Button>

    </header>
  )
}

Header.defaultProps = {
    title: "Task Tracker",
}

Header.propTypes = {
    title: PropTypes.string,
}


// css in js -------->
// const headingStyle = {
//     color: "red",
//     backgroundColor: "black"
// }

export default Header