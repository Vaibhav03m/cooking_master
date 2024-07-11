import { Link } from 'react-router-dom'

import './Navbar.css'

export default function Navbar() {

  return (
    <div className="navbar">
      <nav>
        <Link to="/" className="heading">
          <h1>Cooking Master</h1>
        </Link>
        <Link to="/create">Create Recipe</Link>
      </nav>
    </div>
  )
}
