import React, { useState } from 'react'
import { Navigate, useParams } from 'react-router'
import axios from 'axios'
import trains from '../trains_details/trains.json'
import '../styles/book.css'

function BookTrain() {
  const params = useParams()
  const det = params.details
  const username = det.split('+')
  const user_cat = username[0].split('_')
  const details = username[1].split('_')
  var parts = details[1].split('-')
  const dd = new Date(parts[0], parts[1]-1, parts[2])
  
  const stations = {
    "ms" : "Chennai Egmore",
    "tpj" : "Tiruchirapalli",
    "mdu" : "Madurai"
  }

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [nav, setNav] = useState(false)
  

  const handleSubmit = async(e) => {
    e.preventDefault()
    const user = {
      name : name,
      age : age,
      phone : phone,
      fromStation : stations[details[2]],
      toStation : stations[details[3]],
      gender : gender,
      tname : trains[details[0]],
      tcode : details[0],
      username : user_cat[0],
      doj : dd.toDateString(),
      category : user_cat[1].toUpperCase()
    }
    
      try{
        await axios.post("http://localhost:8080/bookTicket", user)
        .then(() => {
          alert("Ticket booked succesfully")
        })
        setNav(true)
      }
      catch(err){
        alert("error")
      }
  }
  if(nav){
    return <Navigate to={'/profile/' + user_cat[0]}/>
  }
  return (
    <div className='top'>
      <div className='up-header'>
        <div className='title'>{trains[details[0]]} - {details[0]}</div>
        <div className='content'>
          <div>{details[2].toUpperCase()} - {stations[details[2]]} <br/>{dd.toDateString()}</div>
          <div>  - - - - -  </div>
          <div>{details[3].toUpperCase()} - {stations[details[3]]} <br/>{dd.toDateString()}</div>
        </div>
      </div>
      <div className="up-container">
    <div className="title">Passenger Details</div>
    <div className="content">
      <form onSubmit={handleSubmit}>
        <div className="user-details">
          <div className="input-box">
            <span className="details">Full Name</span>
            <input 
              type="text"
              name='name'
              value={name}
              onChange={e => setName(e.target.value)} 
              placeholder='Enter your name' 
              required
            />
          </div>
          
          <div className="input-box">
            <span className="details">Email</span>
            <input 
              type='text' 
              name='email' 
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder='Enter your email' 
              required
            />
          </div>
          <div className="input-box">
            <span className="details">Phone Number</span>
            <input 
              type='text' 
              name='phone' 
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder='Enter your number' 
              required
            />
          </div>
          
          <div className="input-box">
            <span className="details">Age</span>
            <input 
              type="text" 
              name='age' 
              value={age}
              onChange={e => setAge(e.target.value)}
              placeholder="Enter your Age" 
              required
            />
          </div>
        </div>
        <div className="gender-details">
          <input type="radio" value='Male' onChange={e => setGender(e.target.value)} name="gender" id="dot-1"/>
          <input type="radio" value='Female' onChange={e => setGender(e.target.value)} name="gender" id="dot-2"/>
          <input type="radio" value='Transgender' onChange={e => setGender(e.target.value)} name="gender" id="dot-3"/>
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
          <input type="submit" value="Book Ticket"/>
        </div>
      </form>
    </div>
  </div>
    </div>
  )
}

export default BookTrain