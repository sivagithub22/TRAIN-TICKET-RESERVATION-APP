import { Route, Routes } from "react-router";
import Home from "./components/home";
import SignUp from "./components/signUp";
// import Read from "./components/read";
import Profile from "./components/Profile";
import BookTrain from "./components/bookTrain";
import './App.css'

function App() {
  return (
    <div className="body">
      <div className="bg">
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/signUp" element={<SignUp/>}></Route>
          <Route path="/profile/:userId" element={<Profile/>}></Route>
          <Route path="/bookTrain/:details" element={<BookTrain/>}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App;
