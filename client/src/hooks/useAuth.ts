import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const useAuth = () => {
  const [ verifying, setVerifying ] = useState(false)
  const [user, setUser] = useState(null);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const verifyUser = async () => {
      setVerifying(true)
      try {
        const res = await fetch('/api/auth/verify', {
          method: 'GET',
          credentials: 'include'
        })

        if (res.ok) {
          const data = await res.json()
          setUser(data)
          setIsLoggedIn(true)
        }
      } catch(err) {
        console.error('Auth error', err)
      } finally {
        setVerifying(false)
      }
    }
    verifyUser()
  }, [])

  const handleLogOut = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })

      if (!res.ok) {
        throw new Error("Logout Failed")
      }

      setUser(null)
      setIsLoggedIn(false)
      navigate('/')
    } catch(err) {
      console.error(err)
    }
  }

  const onAuthSuccess = (user) => {
    setUser(user)
    setIsLoggedIn(true)
    navigate("/location/current")
  }

  return { user, verifying, isLoggedIn, handleLogOut, onAuthSuccess }
}

export default useAuth