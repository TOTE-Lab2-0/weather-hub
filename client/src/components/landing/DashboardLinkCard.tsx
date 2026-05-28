import { Link } from 'react-router-dom'

const DashboardLinkCard = ({ user }) => {
  return (
    <>
      <div className='bg-white rounded-lg border-t-4 border-t-[#09b8d4] shadow-md p-8 text-center w-full'>
        <div className='w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4'>
          <span className='text-2xl'>👤</span>
        </div>
          <h2 className='text-lg font-bold mb-3'>Welcome back {user.name}!</h2>
          <p className='text-gray-500 text-sm mb-6'>View your saved locations</p>
          <button className='px-4 py-2 rounded-lg bg-[#09b8d4] text-white text-sm hover:bg-[#09b8d4]/80 mb-4'>
            <Link to='/dashboard'>Go to Dashboard</Link>
          </button>
        
      </div>
    </>
  )
}

export default DashboardLinkCard