{/* ── NAVBAR ── */}

const NavBar = () => {

return (
  <div>
    <nav>
    <h1 className="text-blue-600 text-3xl font-bold">Weather Hub</h1>
    <div>
      {user ? (
        <div>
          <span>Hi, {user}</span>
          <button onClick={() => setUser(null)}>Log Out</button>
        </div>
      ) : (
        <div className="absolute top-4 right-12 flex gap-3">
          {/* position: absolute;
              top: 1rem;  
              right: 2rem;
              display: flex;
              gap: 0.75rem; */}
          <button
            className="px-4 py-2 border rounded-lg shadow-sm bg-gray-300 text-white hover:bg-blue-500"
            onClick={() => setShowLogin(true)}
          >
            Log In
          </button>
          <button
            className="px-4 py-2 border rounded-lg shadow-sm bg-gray-300 text-white hover:bg-blue-500"
            onClick={() => setShowSignUp(true)}
          >
            Sign Up
          </button>
        </div>
      )}
    </div>
    </nav>
  </div>
  )
}

export default NavBar