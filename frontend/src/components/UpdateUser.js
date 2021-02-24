import axios from 'axios';
import React, { Component, Redirect } from "react";
import reactDom from 'react-dom';
import { withRouter } from "react-router";


class UpdateUser extends Component {

    state = {
        name: '',
        email: '',
        password: ''
    }

    componentDidMount() {
        
        console.log(this.props)
            axios.get('http://localhost:5000/user/'+this.props.match.params.id).then(res => {
                console.log(res)
                let name = res.data.name
                let email = res.data.email
                this.setState({name: name})
                this.setState({email: email});
        });
    }

    handleSubmit = e => {
        e.preventDefault();   
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        axios.patch('users/'+this.props.match.params.id, data)
        .then(res => {
            this.props.history.push('/users')
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

       let error = '';

        return (

            <div className="row">

                <div className="col-md-4-center">

                    <form onSubmit={this.handleSubmit} className="card card-body">
                    {error}
                        <h2 className="p-4">Editar Usuario</h2>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Apellido, Nombre"
                                required
                                value={this.state.name}
                                onChange={(e) => this.setState({name: e.target.value})}
                                />
                        </div>

                        <div className="form-group">
                            <input 
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                value={this.state.email}
                                required
                                onChange={(e) => this.setState({email: e.target.value})}
                                />
                        </div>
                    
                        <div className="form-group">
                            <input 
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                required
                                onChange={(e) => this.setState({password: e.target.value})}
                                />
                        </div>
                        <button className="btn btn primary btn-block">
                            Editar
                        </button>
                    </form>
                </div>            
            </div>

            
        )    
    }        
}
export default withRouter(UpdateUser) 