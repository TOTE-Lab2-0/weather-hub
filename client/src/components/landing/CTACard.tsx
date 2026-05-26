const CTACard = ({ openModal }) => {

  return (
    <>
      <div>
        <p>Save your favorite locations</p>
      </div>
      <div>
        <p>Create a free account to pin the places you care about and pull up their forecast instantly - anytime, anywhere.</p>
      </div>
      <button onClick={() => {openModal('signup')}}>Sign Up - It's Free</button>
      <p>Already have an account?</p>
      <button onClick={() => {openModal('login')}}>Log In</button>
    </>
  )
}

export default CTACard