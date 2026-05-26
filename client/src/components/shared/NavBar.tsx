import { Link } from 'react-router-dom'
const NavBar = ({ logout, openModal, user }) => {

return (
  <>
    <div>
      <Link to='/'>WeatherHub</Link>
    </div>
    { user ? 
      <nav>
        <div>
          <p>Hi, {user.name}</p>
          <button onClick={logout}>Logout</button>
        </div>
      </nav>
    :
      <nav>
        <div>
          <button onClick={() => {openModal('signup')}}>Sign Up</button>
          <button onClick={() => {openModal('login')}}>Log In</button>
        </div>
      </nav>
    }
  </>
  )
}

export default NavBar