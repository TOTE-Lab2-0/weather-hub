const CTACard = ({ openModal }) => {

  return (
    <>
      <div className='bg-white rounded-lg border-t-4 border-t-[#09b8d4] shadow-md p-8 text-center w-full'>
        <div className='w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4'>
          <span className='text-2xl'>📍</span>
        </div>
        <h2 className='text-lg font-bold mb-3'>Save your favorite locations</h2>
        <p className='text-gray-500 text-sm mb-6' >Create a free account to pin the places you care about and pull up their forecast instantly - anytime, anywhere.</p>
        <button className='px-4 py-2 rounded-lg bg-[#09b8d4] text-white text-sm hover:bg-[#09b8d4]/80 mb-4' onClick={() => {openModal('signup')}}>Sign Up - It's Free</button>
        <p className='text-gray-500 text-sm mb-6'>Already have an account? 
          <button className='text-[#09b8d4] font-semibold' onClick={() => {openModal('login')}}>Log In</button>
        </p>
      </div>
    </>
  )
}

export default CTACard