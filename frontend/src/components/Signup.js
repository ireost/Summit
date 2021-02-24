import axios from 'axios';
import React, { Component, Redirect } from "react";
import { withRouter } from "react-router";

class Signup extends Component {
    state ={};

    handleSubmit = e => {
        e.preventDefault();
        const data = {
            name: this.name,
            username: this.username,
            email: this.email,
            password: this.password
        };    
        
        axios.post('users', data)
        .then(res => {
            this.props.history.push('/login')
            console.log(res)
            // this.setState({
            //     registered: true
            // });
            // this.props.setUser(res.data.user);
        })
        
        .catch(err => {
            console.log(err)
            // this.setState({
            //     message: err.response.data.message
            // })
        })
    };

    render() {
        if(this.state.registered){
            return <Redirect to={'/login'} />;
        }

       let error = '';

       if (this.state.message) {
           error = (
               <div className="alert alert-danger" role="alert">
                   {this.state.message}
               </div>
           )
       }

        return (

            <div className="row">

                <div className="col-md-4-center">

                    <form onSubmit={this.handleSubmit} className="card card-body">
                    {error}
                        <h2 className="p-4">Registro</h2>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Apellido, Nombre"
                                required
                                onChange={e => this.name = e.target.value}
                                />
                        </div>
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
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                required
                                onChange={e => this.email = e.target.value}
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
                            Crear
                        </button>
                    </form>
                </div>            
            </div>

            
        )    
    }        
}
export default withRouter(Signup)        