import React, { Component } from 'react'
import { FaAlignRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'


export default class Navbar extends Component {
  state = {
    isOpen: false
  };

  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  };
  render() {
    return (
      <nav className='navbar' >
        <div className="nav-center">
          <div className="nav-header">
            <button type="button" className="nav-btn" onClick={this.handleToggle}>
              <FaAlignRight className="nav-icon" />
            </button>
          </div>
          <ul className={this.state.isOpen ?
            "nav-links show-nav" : "nav-links"}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/rooms">Hotels</Link>
            </li>
            <li><Link to="/places">Places</Link>
            </li>
            {!window.localStorage.getItem("isLogged") ?
              <>
                <li>
                  <Link to="/signup">SignUp</Link>
                </li>
                <li>
                  <Link to="/login">LogIn</Link>
                </li>
              </>
              :
              <>
                <li>
                  <Link to="/plans">PlanTrip</Link>
                </li>
                <li>
                  <Link to="/blog">Blog</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/" onClick={() => { window.localStorage.removeItem("isLogged"); window.location.replace('/') }}>LogOut</Link>
                </li>
              </>
            }
          </ul>
        </div>
      </nav>
    )
  }
}
