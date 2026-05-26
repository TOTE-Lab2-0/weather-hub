import { Link } from 'react-router-dom'

const DashboardLinkCard = ({ user }) => {
  return (
    <>
      <p>Welcome back {user.name}, view your saved locations.</p>
      <div>
        <Link to='/dashboard'>Go to Dashboard</Link>
      </div>
    </>
  )
}

export default DashboardLinkCard