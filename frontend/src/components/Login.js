import axios from 'axios';
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { withRouter } from "react-router";

class Login extends Component {
    state = {}

    handleSubmit = e => {
        e.preventDefault();

        const data = {
            username: this.username,
            password: this.password
        }

        axios.post('login', data)
        .then(res => {
            console.log(res)
            localStorage.setItem('token', res.data.token);
            
            const jwt = jwtDecode(res.data.token)
            this.props.setUser(jwt.sub);
            this.props.history.push('/users')
        })
        .catch(err => {
            console.log(err.response)
            this.setState({
                message: err.response.data.error
            })
        })
    };

    render() {


       let error;

       if (this.state.message) {
           error = (
               <div className="alert alert-danger" role="alert">
                   {this.state.message}
               </div>
           )
       }

        return (
            <div className="row">

                <div className="col-md-4">

                    <form onSubmit={this.handleSubmit} className="card card-body">
                        {error}
                        <h2 className="p-4">Iniciar sesión</h2>
                        
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Usuario"
                                required
                                onChange={e => this.username = e.target.value}
                                />
                        </div>

                    
                        <div className="form-group">
                            <input 
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                required
                                onChange={e => this.password = e.target.value}
                                />
                        </div>
                        <button className="btn btn primary btn-block">
                            Ingresar
                        </button>
                    </form>
                </div>            
            </div>
        )
    }
}
export default withRouter(Login)