import "./App.css";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import About from "./component/About";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/noteState";
import Alert from "./component/Alert";
import Login from "./component/Login";
import Signup from "./component/Signup";
import { useState } from "react";

function App() {

  const [mode, setMode] = useState("light");

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      message : message,
      type : type,
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);

  }

  const toggleMode = () => {

    if(mode === "dark"){
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert("Light Mode is enabled", "success");
    }else{

      setMode("dark");
      document.body.style.backgroundColor = "black";
      showAlert("Dark Mode is enabled", "success");
    }
  }
  
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar showAlert={showAlert} mode={mode} toggleMode={toggleMode}/>
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home mode={mode} showAlert={showAlert}/>}></Route>
              <Route exact path="/about" element={<About mode={mode} />}></Route>
              <Route exact path="/login" element={<Login mode={mode} showAlert={showAlert}/>}></Route>
              <Route exact path="/singup" element={<Signup mode={mode} showAlert={showAlert}/>}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
