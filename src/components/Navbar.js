import React, { Component } from 'react'
import { FaAlignRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import logo from '../images/logo1.png'

export default class Navbar extends Component {
  state = {
    isOpen: false
  };

  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  };
  render() {
    return (
      <nav className='navbar' style={{ backgroundColor: '#FCC102' }}>
        <div className="nav-center">
          <img src={logo} style={{ width: 50 }} />
          <div className="nav-header">
            <button type="button" className="nav-btn" onClick={this.handleToggle}>
              <FaAlignRight className="nav-icon" />
            </button>
          </div>
          <ul className={this.state.isOpen ?
            "nav-links show-nav" : "nav-links"}>
            <li>
              <Link to="/"><i class="fa fa-home"></i>Home</Link>
            </li>
            <li>
              <Link to="/rooms"><i class="fa fa-hotel"></i>Hotels</Link>
            </li>
            <li><Link to="/places"><i class="fa fa-map-marker-alt"></i>Places</Link>
            </li>
            {!window.localStorage.getItem("isLogged") ?
              <>
                <li>
                  <Link to="/signup"><i class="fa fa-sign-in-alt"></i>SignUp</Link>
                </li>
                <li>
                  <Link to="/login" style={{ fontSize: 15 }}>LogIn</Link>
                </li>
              </>
              :
              <>
                <li>
                  <Link to="/create-plan">PlanTrip</Link>
                </li>
                <li>
                  <Link to="/plans">Plans</Link>
                </li>
                <li>
                  <Link to="/blog">Blog</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/" onClick={() => { window.localStorage.clear(); window.location.replace('/') }}>LogOut</Link>
                </li>
              </>
            }
          </ul>
        </div>
      </nav>
    )
  }
}
