import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import axios from 'axios';


import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import AllUsers from './components/AllUsers'
import PrivateRoute from './components/PrivateRoute'
import UpdateUser from './components/UpdateUser'



export default class App extends Component {

  state = {};
  componentDidMount = () => {
      axios.get('user').then(
          res => {
              this.setUser(res.data);
          },
          
          err => {
              console.log(err)
          }
      )
  };

  setUser = user => {
    this.setState({
      user: user
  });
  }


  render() {
    console.log(this.state)
    return (
      // Router es para darle distintas rutas 
      <Router>
        <Navbar setUser={this.setUser}/> 

        <div className="auth-wrapper p-4">
          <div className="auth-inner">
            <Switch>
              <Route exact path="/" component={() => <Home user={this.state.user} />}/>
              <Route exact path="/login" component={() => <Login setUser={this.setUser}/>}/>
              <Route exact path="/signup" component={Signup}/>
              <PrivateRoute path="/users">
              <AllUsers/>
              </PrivateRoute>
              <PrivateRoute path="/edit/:id">
                <UpdateUser />
              </PrivateRoute>
            </Switch>
          </div>
        </div>
      </Router>

    );
  }  
}

