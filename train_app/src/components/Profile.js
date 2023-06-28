import React, { useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ms_tpj from '../trains_details/ms_tpj.json'
import ms_mdu from '../trains_details/ms_mdu.json'
import tpj_mdu from '../trains_details/tpj_mdu.json'
import '../styles/profile.css'

function Profile() {
  const params = useParams()
  const username = params.userId

  var common = (
    <>
      <h2>INDIAN RAILWAYS</h2>
      <div>
        {/* <div>Welcome {username}</div> */}
        <div id='general'>
          IRCTC Next Generation e-Ticketing System
        </div>
      </div> 
    </>
  )

  const [userDetails, setDetails] = useState([])
  const [ticketDetails, setTicket] = useState([])
  const [prof, displayProfile] = useState(false)
  const [ticket, displayTicket] = useState(false)

  const [fromSt, setFrom] = useState('')
  const [toSt, setTo] = useState('')
  const [category, setCategory] = useState('')
  const [doj, setDOJ] = useState('')
  const [trains, setTrains] = useState([])
  const [sty1, setStyle] = useState({display : 'none'})
  const [sty2, setHeight] = useState({minHeight: '100vh'})

  // const code = ''
  const prio = {"ms":2, "tpj":1, "mdu":0}
  const names = {"ms":"CHENNAI EGMORE", "tpj":"TIRUCHIRAPALLI", "mdu":"MADURAI"}
  
  const userProfile = async e => {
    displayTicket(false)
    e.preventDefault()
    try{
      const result = await axios.get("http://localhost:8080/user/" + username)
      setDetails(result.data)
      displayProfile(true)
      
    }
    catch(err){
      alert('error')
    }
  }

  const userTickets = async e => {
    displayProfile(false)
    e.preventDefault()
    try{
      const result = await axios.get("http://localhost:8080/getTicket/" + username)
      // var t = []
      // t.push(result.data)
      // alert(result.length)
      if(result.data.length !== 0){
        setTicket(result.data)
        displayTicket(true)
      }
      else{
        alert("You haven't booked any tickets")
      }
      
    }
    catch(err){
      alert(err)
    }
  }
  
  const HandleSubmit = (e) => {
    e.preventDefault()
    setStyle({display: 'block'})
    setHeight({minHeight: '170vh'})
    let str = fromSt + " " + toSt
    var temp = []
    if(str === "ms tpj" || str === "tpj ms") temp = ms_tpj
    else if(str === "ms mdu" || str === "mdu ms") temp = ms_mdu
    else if(str === "tpj mdu" || str === "mdu tpj") temp = tpj_mdu
    if(prio[fromSt] - prio[toSt] >= 0){
      temp.forEach(element => {
        let arr = element.ntime.split('-')
        element.start = arr[0]
        element.end = arr[1]
        element.time = element.ntime
        delete element.ntime
        delete element.rtime
      });
    }
    else{
      temp.forEach(element => {
        let arr = element.rtime.split('-')
        element.start = arr[0]
        element.end = arr[1]
        element.time = element.rtime
        delete element.ntime
        delete element.rtime
      });
    }
    setTrains(temp)
    
  }
  if(prof){
    common = 
      <>
        {userDetails.map((user) => (
          <div className='prof-details' key={user.username}>
            <h2 id='name'>Hello, {user.name}</h2>
            <div>
              <table>
                <tbody>
                  <td>EMAIL</td>
                  <td>{user.email}</td>
                </tbody>
                <tbody>
                  <td>PHONE</td>
                  <td>{user.phone}</td>
                </tbody>
                <tbody>
                  <td>DATE OF BIRTH</td>
                  <td>{user.dob}</td>
                </tbody>
              </table>
            </div>
          </div>  
        ))} 
      </>
  }
  if(ticket){
    var small = {fontSize:"15px"}
    common = 
      <>
      {ticketDetails.map((user) => (
        <div className='prof-details' key={user.username}>
          <h2>{user.tname} - {user.tcode} {'(' + user.category + ')'}</h2>
          <div>
            <div>{user.fromStation}</div>
            <div style={small}>{user.doj}</div>
            <div>{user.toStation}</div>
          </div>
      </div> 
      ))}
      </>
    
  }
  return (
    <div className='page' style={sty2}>
      <div className='nav-class'>
        <div className='navbar'>
          <button onClick={userProfile}>MY PROFILE</button>
          <button onClick={userTickets}>MY TICKETS</button>
          <Link to='/' className='navlink'>LOGOUT</Link>
        </div>
      </div>
    <div className='profile'>
      <div className="up-container">
    <div className="title">BOOK TICKET</div>
    <div className="content">
      <form onSubmit={HandleSubmit}>
        <div className="user-details">
          <div className="input-box">
            <span className="details">From</span>
            <select name='fromSt' value={fromSt} onChange={e => setFrom(e.target.value)}>
              <option value=''>Select FROM Station</option>
              <option value='ms'>MS - Chennai Egmore</option>
              <option value='tpj'>TPJ - Tiruchirapalli</option>
              <option value='mdu'>MDU - Madurai</option>
            </select>
          </div>
          <div className="input-box">
            <span className="details">To</span>
            <select name='toSt' value={toSt} onChange={e => setTo(e.target.value)}>
              <option value=''>Select TO Station</option>
              <option value='ms'>MS - Chennai Egmore</option>
              <option value='tpj'>TPJ - Tiruchirapalli</option>
              <option value='mdu'>MDU - Madurai</option>
            </select>
          </div>
          <div className="input-box">
            <span className="details">Category</span>
            <select name='cateogory' value={category} onChange={e => setCategory(e.target.value)}>
              <option value=''>Select Category</option>
              <option value='general'>General</option>
              <option value='tatkal'>Tatkal</option>
              <option value='premium tatkal'>Premium Tatkal</option>
            </select>
          </div>
          <div className="input-box">
            <span className="details">Date of Journey</span>
            <input 
              type="date" 
              name='doj'
              value={doj}
              onChange={e => setDOJ(e.target.value)}
              placeholder="dd - mm - yyyy" 
              required
            />
          </div>
        </div>
        <div className="button">
          <input type="submit" value="Search Trains"/>
        </div>
      </form>
    </div>
  </div> <br/>
     <div className='box'>
      {common}
     </div>
    
    </div>
    <div className='search'>
    <div className='results' style={sty1}>
      <h2>SEARCH RESULTS</h2>
      <div className='det'>
      {trains.map((t)=>(
        <div class='h3'>
          <h3>{t.tname} - {t.code}</h3> <br/>
          <div className='cont'> 
            <div> {t.start} | {fromSt.toUpperCase()} - {names[fromSt]} </div>
            <div> -- {t.hrs} -- </div>
            <div> {t.end} | {toSt.toUpperCase()} - {names[toSt]} </div>
          </div> <br/>
          <Link className='link' to={'/bookTrain/'+username+"_"+category+"+"+t.code+"_"+doj+"_"+fromSt+"_"+toSt}>Book Now</Link>
        </div>
      ))}
      </div>
    </div>
    </div>
  </div>
  )
}

export default Profile