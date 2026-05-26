const AuthModal = ({ onClose, onAuthSuccess, initialMode, isOpen }) => {
  return (
    <>
    {/* ── SIGN UP MODAL ── */}
    {/* {showSignUp && (
        <div>
          <div>
            <h2>Sign Up</h2>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button>Create Account</button>
            <button onClick={() => setShowSignUp(false)}>Cancel</button>
          </div>
        </div>
      )} */}

      {/* ── LOGIN MODAL ── */}
      {/* {showLogin && (
        <div>
          <div>
            <h2>Log In</h2>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button>Log In</button>
            <button onClick={() => setShowLogin(false)}>Cancel</button>
          </div>
        </div>
      )} */}
    </>
  )
}

export default AuthModal