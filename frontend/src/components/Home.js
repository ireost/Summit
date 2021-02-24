import React, { Component } from "react";

export default class Home extends Component {
    
    render() {
        console.log(this.props)
        if(this.props.user){
            return (
                <h2>Bienvenidos {this.props.user}</h2>
            )
        }

        return (
       <h2>Usuario no logueado</h2> 
        )
    }
}        