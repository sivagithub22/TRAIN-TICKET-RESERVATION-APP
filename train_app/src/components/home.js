import { Link, Navigate } from 'react-router-dom'
import React, { Component } from 'react'
import axios from 'axios'
import '../styles/home.css'

class Home extends Component {
    state = {
        loginUser : "",
        loginPass : "",
        auth : false
    }
    handleUser = (e) => {
        this.setState({
            loginUser : e.target.value
        })
    }
    handlePass = (e) => {
        this.setState({
            loginPass : e.target.value
        })
    }
    
    handleSend = async e => {
        e.preventDefault()
        const user = {  
            loginUser : this.state.loginUser,
            loginPass : this.state.loginPass
        }
        try{
            var pass = await axios.get("http://localhost:8080/login")
            const details = pass.data
            let c = 0
            details.forEach(element => {
                if(element['username'] === user.loginUser){
                    c = 1
                    if(element['password'] === user.loginPass){
                        alert("Login Success")
                        this.setState({
                            auth : true
                        }) 
                    }
                    else{
                        alert("Incorrect password")
                    }
                }
            });
            if(c===0) alert("Username doesn't exist.. Please Sign In")
        }
        catch(err){
            alert("Error Occured")
        }
        
    }
    render() {
        if(this.state.auth){
            const url = '/profile/'+this.state.loginUser
            return <Navigate to={url}/>
        }
        return (
            <div className='homeBg'>
                <div className='head'>
                    TRAIN TICKET BOOKING APP
                </div>
                <div className='container'>
                <div className="login form">
                    <header>Login</header>
                    <form onSubmit={this.handleSend}>
                        <input 
                            type="text" 
                            name='loginUser'
                            value={this.state.loginUser} 
                            onChange={this.handleUser} 
                            placeholder="Enter your username" 
                        />
                        <input 
                            type="password" 
                            name='loginPassword'
                            value={this.state.loginPass} 
                            onChange={this.handlePass}
                            placeholder="Enter your password"
                        />
                        <input type="submit" className="button" value="Login"/>
                    </form>
                    <div className="signup">
                        <span className="signup">Don't have an account?
                            <Link to='/signUp' className='link'> SignUp</Link>
                        </span>
                    </div> 
                </div>
                </div>
            </div>
        )
    }
}

export default Home