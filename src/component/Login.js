import React, { useState }from 'react'
import {useNavigate } from 'react-router-dom'

const Login = (props) => {
    const {mode} = props;
    const [information, setInfomation] = useState({email: "", password: ""});
    const navigate = useNavigate();

    const clickSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email : information.email, password : information.password}),
        });
        const json = await response.json();

        if(json.success){
            localStorage.setItem('token', json.authToken);
            navigate("/");
            props.showAlert("Succesfully Logged In", "success")
            
        }else{
            props.showAlert("Invalid Information Entered", "danger")
        }
    }

    const onchange = (e)=>{
        setInfomation({...information, [e.target.name] : e.target.value})
      }

      const textColor =( mode === "light" ? "rgba(33, 37, 41, 0.75)" : "rgba(255, 255, 255, .6)");

  return (
    <div className="container mt-3">
      <h3 className={`text-${mode === "light"?"dark" :"light"}`}>Login To iNootBook</h3>
      <form onSubmit={clickSubmit}>
        <div className="mb-3">
            <label htmlFor="email" className={`form-label text-${mode === "light"?"dark" :"light"}`}>Email address</label>
            <input type="email" className={`form-control bg-${mode === "light"?"white" :"black"} text-${mode === "light"?"black" :"white"}`} id="email" name="email" aria-describedby="emailHelp" value={information.email} onChange={onchange}/>
            <div id="emailHelp" ><p style={{ color: textColor }}>
              We'll never share your email with anyone else.</p></div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className={`form-label text-${mode === "light"?"dark" :"light"}`}>Password</label>
            <input type="password" className={`form-control bg-${mode === "light"?"white" :"black"} text-${mode === "light"?"black" :"white"}`} id="password" name="password" value={information.password} onChange={onchange}/>
        </div>
        
        <button type="submit" className="btn btn-primary">Start Making Note</button>
        </form>
    </div>
  )
}

export default Login
