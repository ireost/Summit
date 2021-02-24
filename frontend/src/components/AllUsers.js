import axios from 'axios';
import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class AllUsers extends Component {
    state = {
        users: [],
    };

    componentDidMount() {
            
        axios.get('http://localhost:5000/users').then(res => {
            console.log(res);
            this.setState({ users: res.data});
        });
    }

    deleteUser(id){
        const userResponse = window.confirm('¿ Esta seguro que desea eliminarlo ?')
        if(userResponse){
            axios.delete('http://localhost:5000/users/'+id).then(res => {
                this.setState({ users: this.state.users.filter(del => del.id !== id) })
            
            });
        }
    }



    render() {
        console.log(this.state.users)
        return ( 
                <div className="col-md-6">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Apellido, Nombre</th>
                                <th>Usuario</th>
                                <th>Email</th>
                                <th>Cambios</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Link to={'/edit/' + user.id}>
                                            <button className="btn btn-secondary btn-sm btn-block"
                                                    
                                                    >
                                                Editar
                                            </button>
                                        </Link>
                                    <button className="btn btn-danger btn-sm btn-block"
                                            onClick={(e) => this.deleteUser(user.id)}
                                            >
                                        Eliminar
                                    </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            );
    }  

}
