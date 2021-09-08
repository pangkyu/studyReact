import React, { Component } from 'react';

class PhoenForm extends Component{
    state = {
        name : ''
    }
    handleChange = (e) => {
        this.setState({
            name : e.target.value
        })
    }
    render(){
        return (
            <form>
                <input 
                    placeholder = "이름"
                    value = {this.state.name}
                    onChange = {this.handleChange}
                />
                <div>{this.state.name}</div>
            </form>
        )
    }
}