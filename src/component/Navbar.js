import React, {} from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom";

const Navbar = (props) => {
  const Location = useLocation();
  const navigate = useNavigate();
  const logoutClicked = () =>{
    localStorage.removeItem('token');
    navigate('/login');
  }


  return (
    
    
      <nav className={`navbar navbar-expand-lg bg-${props.mode} navbar-${props.mode}`}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iNootBook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${Location.pathname === "/"?"active":""}`} aria-current="page" to="/" >Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${Location.pathname === "/about"?"active":""}`} to="/about" >About</Link>
        </li>
      </ul>
      <div className="form-check form-switch mx-4">
        <button 
              className="btn btn-secondary" 
              onClick={props.toggleMode} 
              style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
          >
              {props.mode === 'light' ? (
                  <i class="fa-solid fa-sun" size="2x" style={{color : '#fbc02d'}} ></i>
              ) : (
                  <i class="fa-solid fa-moon" size="2x" style={{color:'#F8F8FF'}} ></i>
              )}
          </button>
        </div>

      {!localStorage.getItem('token')?<form className="d-flex" role="search">
        <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
        <Link className="btn btn-primary mx-2" to="/singup" role="button">SignUp</Link>
      </form>: <button className="btn btn-primary mx-2" onClick={logoutClicked}>Log-Out</button>
      }
    </div>
  </div>
</nav>
  )
}

export default Navbar
