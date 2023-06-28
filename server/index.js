import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'

const app = express()
app.listen(8080, () => {
    console.log("Connected to backend!\nOpen http://localhost:8080 in your browser ...")
})

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "sivae*226",
    database: "db"
})

app.post('/users', (req, res) => {
    const q = 'insert into users values (?);'
    const values = [
        req.body.name,
        req.body.username,
        req.body.email,
        req.body.gender,
        req.body.phone,
        req.body.password,
        req.body.dob
    ]
    db.query(q, [values], (err,data) => {
        if(err) return res.json(err)
        return res.json("User added")
    })
})

app.get("/", (req, res) => {
    res.json("This is Backend")
})
app.get("/users", (req, res) => { 
    var qu = "select * from users"
    db.query(qu, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/user/:id", (req,res) => {
    var q = "select * from users where username=?";
    db.query(q,[req.params.id],(err,result)=>{
        if(result){
            res.send(result)
        }
        else{
            res.send(err)
        }
    })
})

app.get("/login", (req, res) => {
    var q = "select username,password from users"
    db.query(q, (err, data) => {
        if(err) return res.json({mess:"error"})
        return res.json(data)
    })
})

app.get("/trains/:mes", (req, res) => {
    var st = req.params.mes
    var arr = st.split('-')
    var q = ""
    if(arr[0] == 0) q = "select tname,hrs,rtime from " + arr[1]
    else q = "select tname,hrs,time from " + arr[1]
    db.query(q, (err, result) => {
        if(err) res.send(err)
        else if(result) res.send(result)
    })
})
app.post("/bookTicket" , (req, res) => {
    const q = 'insert into tickets values (?)'
    const values = [
        req.body.name,
        req.body.age,
        req.body.phone,
        req.body.fromStation,
        req.body.toStation,
        req.body.gender,
        req.body.tname,
        req.body.tcode,
        req.body.username,
        req.body.doj,
        req.body.category
    ]
    db.query(q, [values], (err,data) => {
        if(err) return res.json(err)
        return res.json("User added")
    })
})
app.get("/getTicket/:det", (req, res) => {
    var user = req.params.det
    var q = "select fromStation,toStation,tname,tcode,doj,category from tickets where username=?"
    db.query(q, user, (err, result) => {
        if(err) res.send(err)
        else if(result) res.send(result)
    })
})