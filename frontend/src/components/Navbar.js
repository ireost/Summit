import React, { Component } from 'react';
import {Link} from 'react-router-dom';


export default class Navbar extends Component {

  state = {
    loggedIn: false  
  }

  componentDidMount(){
     this.setState({loggedIn: localStorage.getItem('token') !== null})
  }

  handleLogout = () => {
    localStorage.clear();
    this.props.setUser(null);

  };
  
  render() {

      let buttons;
      let login;
      let signup;
      console.log(this.props)

      if(this.state.loggedIn){
        console.log("1")
            buttons = (
              <div>
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={'/'} onClick={this.handleLogout}>Logout</Link>
                  </li>
                </ul>
              </div>
            )  
      } else {
        console.log("2")
        login = (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to={'/login'}>Login</Link>
                </li>
              </ul>
        )
        
        signup = (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item ml-auto">
            <Link className="nav-link" aria-current="page" to={'/signup'}>Sign Up</Link>
            </li>
          </ul>
        )      
      }
      return (  
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" href="#">Summit</Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={'/'}>Home</Link>
              </li>
              {login} {signup}
            </ul>
              {buttons}
          </div>
        </div>
      </nav>
    )  

  }
  
}
