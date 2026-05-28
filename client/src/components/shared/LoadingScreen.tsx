import myLogo from '../../assets/favicon.ico'
const LoadingScreen = () => {
  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#0a1628] to-[#0d2b4e]'>
        <div className='text-white text-center'>
          <div className='w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-lg'>
            <img className='w-14 h-14' src={myLogo} alt='icon'/>
          </div>
          <h1 className='text-xl text-white/60 mt-4 tracking-widest'>Verifying</h1>
          <div className='flex gap-1 justify-center mt-2'>
            <span className='w-2 h-2 rounded-full bg-white/60 animate-bounce' style={{animationDelay: '0ms'}}></span>
            <span className='w-2 h-2 rounded-full bg-white/60 animate-bounce' style={{animationDelay: '150ms'}}></span>
            <span className='w-2 h-2 rounded-full bg-white/60 animate-bounce' style={{animationDelay: '300ms'}}></span>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoadingScreen