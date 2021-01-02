import React, { Component } from 'react'
import { FaAlignRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import logo from '../images/logo3.png'

export default class Navbar extends Component {
  state = {
    isOpen: false
  };

  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  };
  render() {
    return (
      <nav className='navbar' style={{ backgroundColor: '#072100' }}>
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
              <Link to="/"><i class="fa fa-home"></i> Home</Link>
            </li>
            <li>
              <Link to="/rooms"><i class="fa fa-hotel"></i> Hotels</Link>
            </li>
            <li><Link to="/places"><i class="fa fa-map-marker-alt"></i> Places</Link>
            </li>
            {!window.localStorage.getItem("isLogged") ?
              <>
                <li>
                  <Link to="/signup"><i class="fa fa-user-plus"></i> Signup</Link>
                </li>
                <li>
                  <Link to="/login"><i class="fa fa-sign-in-alt"></i> Login</Link>
                </li>
              </>
              :
              <>
                <li>
                  <Link to="/create-plan"><i class="fa fa-plane"></i> Plan A Trip</Link>
                </li>
                <li>
                  <Link to="/plans"><i class="fa fa-floppy-o"></i> My Plans</Link>
                </li>
                <li>
                  <Link to="/blog"><i class="fa fa-blog"></i> Blog</Link>
                </li>
                <li>
                  <Link to="/profile"><i class="fa fa-user"></i> Profile</Link>
                </li>
                <li>
                  <Link to="/" onClick={() => { window.localStorage.clear(); window.location.replace('/') }}><i class="fa fa-sign-out"></i> Logout</Link>
                </li>
              </>
            }
          </ul>
        </div>
      </nav>
    )
  }
}
