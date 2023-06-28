import React, { Component } from 'react'
import '../styles/signUp.css'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

class SignUp extends Component {
  state = {
      fname : "",
      username : "",
      email : "",
      gender : "",
      dob : "",
      phone : "",
      password : "",
      valid : false
  }
  handleName = (e) => {
    this.setState({
      fname : e.target.value
    })
  }
  handleUserName = (e) => {
    console.log('changed')
    this.setState({
      username : e.target.value
    })
  }
  handleEmail = (e) => {
    this.setState({
      email : e.target.value
    })
  }
  handlePhone = (e) => {
    this.setState({
      phone : e.target.value
    })
  }
  handlePassword = (e) => {
    this.setState({
      password : e.target.value
    })
  }
  handleDOB = (e) => {
    this.setState({
      dob : e.target.value
    })
  }
  handleGender = e => {
    this.setState({
      gender : e.target.value
    })
  }
  handleSubmit = async e => {
    e.preventDefault()
    const user = {
      name : this.state.fname,
      username : this.state.username,
      email : this.state.email,
      gender : this.state.gender,
      dob : this.state.dob,
      phone : this.state.phone,
      password : this.state.password
    }
    try{
      await axios.post("http://localhost:8080/users", user)
        .then(response => {
          alert("Registered Successfully !")
          this.setState({
            valid : true
          })
        })
      
    }
    catch(err){
      alert("Error Occured")
      console.log(err)
    }
  }
  render() {
    if(this.state.valid){
      return <Navigate to='/'/>
    }
    return (
      <div className='up-body'>
  <div className="up-container">
    <div className="title">Registration</div>
    <div className="content">
      <form onSubmit={this.handleSubmit}>
        <div className="user-details">
          <div className="input-box">
            <span className="details">Full Name</span>
            <input 
              type="text"
              name="fname" 
              value={this.state.fname} 
              onChange={this.handleName} 
              placeholder='Enter your name' 
              required
            />
          </div>
          <div className="input-box">
            <span className="details">Username</span>
            <input 
              type='text' 
              name='username' 
              value={this.state.username}
              onChange={this.handleUserName}
              placeholder='Enter your username' 
              required
            />
          </div>
          <div className="input-box">
            <span className="details">Email</span>
            <input 
              type='text' 
              name='email' 
              value={this.state.email}
              onChange={this.handleEmail}
              placeholder='Enter your email' 
              required
            />
          </div>
          <div className="input-box">
            <span className="details">Phone Number</span>
            <input 
              type='text' 
              name='phone' 
              value={this.state.phone}
              onChange={this.handlePhone}
              placeholder='Enter your number' 
              required
            />
          </div>
          <div className="input-box">
            <span className="details">Password</span>
            <input 
              type="text" 
              name='password' 
              value={this.state.password}
              onChange={this.handlePassword}
              placeholder="Enter your password" 
              required
            />
          </div>
          <div className="input-box">
            <span className="details">Date of Birth</span>
            <input 
              type="date" 
              name='dob' 
              value={this.state.dob}
              onChange={this.handleDOB} 
              required
            />
          </div>
        </div>
        <div className="gender-details">
          <input type="radio" value='Male' required onChange={this.handleGender} name="gender" id="dot-1"/>
          <input type="radio" value='Female' required onChange={this.handleGender} name="gender" id="dot-2"/>
          <input type="radio" value='Transgender' required onChange={this.handleGender} name="gender" id="dot-3"/>
          <span className="gender-title">Gender</span>
          <div className="category">
            <label htmlFor="dot-1">
            <span className="dot one"></span>
            <span className="gender">Male</span>
          </label>
          <label htmlFor="dot-2">
            <span className="dot two"></span>
            <span className="gender">Female</span>
          </label>
          <label htmlFor="dot-3">
            <span className="dot three"></span>
            <span className="gender">Prefer not to say</span>
            </label>
          </div>
        </div>
        <div className="button">
          <input type="submit" value="Register"/>
        </div>
      </form>
    </div>
  </div>
</div>
    )
  }
}

export default SignUp