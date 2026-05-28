import { Link } from 'react-router-dom'
import myLogo from '../../assets/favicon.ico'
const NavBar = ({ logout, openModal, user }) => {

return (
  <>
    <nav className='flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 sticky top-0 z-50'>
      <Link to='/' className='flex items-center gap-2'>
      <img className=' w-8 h-8' src={myLogo} alt='icon'/>
      <div className='text-lg'>
        <span className='font-bold text-gray-900'>Weather</span>
        <span className='font-bold text-[#09b8d4]'>Hub</span>
      </div>
      </Link>
    
    { user ? 
      <div className='flex items-center gap-3'>
        <p className='text-gray-500 text-sm'>Hi, {user.name}!</p>
        <button className='px-4 py-2 rounded-lg bg-[#09b8d4] text-white text-sm hover:bg-[#09b8d4]/80' onClick={logout}>Logout</button>
      </div>
    :
      <div className='flex items-center gap-3'>
        <button className='px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm hover:bg-[#09b8d4]/20' onClick={() => {openModal('login')}}>Log In</button>
        <button className='px-4 py-2 rounded-lg bg-[#09b8d4] text-white text-sm hover:bg-[#09b8d4]/80' onClick={() => {openModal('signup')}}>Sign Up</button>
      </div>
    }
    </nav>
  </>
  )
}

export default NavBar