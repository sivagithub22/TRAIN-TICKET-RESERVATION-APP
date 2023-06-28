import axios from 'axios'
import { useEffect, useState } from 'react'
import React from 'react'
import '../styles/read.css'

const Read = () => {
    
    const [users, setUsers] = useState([])
    useEffect(() => {
        const fetchUsers = async () => {
            try{
                const res = await axios.get("http://localhost:8080/users")
                // console.log(res)
                setUsers(res.data)
            }
            catch(err){
                console.log("oombu")
            }
        }
        fetchUsers()
    },[])
    return (
        <table>
            <thead>
            <tr>
                <th>NAME</th>
                <th>USERNAME</th>
                <th>EMAIL</th>
                <th>GENDER</th>
                <th>PHONE</th>
                <th>PASSWORD</th>
            </tr>
            </thead>
            <tbody>
            {users.map(user => {
                return (
                    <tr key={user.username}>
                        <td>{user.name}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.gender}</td>
                        <td>{user.phone}</td>
                        <td>{user.password}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
} 

export default Read