import React, { useState } from 'react';

import "./Login.css"

let Login=({setToken,setlogin})=>{

  let [email,setEmail]=useState('');
  let [password,setPassword]=useState('');

  let Email=(event)=>{
    setEmail(event.target.value);
  }

  let Password=(event)=>{
    setPassword(event.target.value);
  }

  let Submit=(event)=>{
    event.preventDefault();
  }

let fun =async(e)=>{

  //const data = new FormData();

  let obj=JSON.stringify({"email":email,"password":password})
  //data.append(obj)
  console.log(obj)

 let res=await  fetch("http://localhost:5000/user/login", {method: "POST", mode: "cors",
      headers:{"Content-Type": "application/json"},body:obj})
      .then((response)=>response.text())
      .then(data =>{
        let a=JSON.parse(data)
      //  console.log(a.token)
       setToken(a.token)
       setlogin(true)
       
      })
    
    //console.log(res)
   
}
  return (
    <div className='login'>
      <h2>Login Form</h2>
      <form className='form' onSubmit={Submit}>
        <label>Email:</label><br/>
        <input type="text" value={email} onChange={Email} /><br/>
        <label>Password:</label><br/>
        <input type="password" value={password} onChange={Password} /><br/>
        <button type="submit" onClick={fun}>Login</button><br/>
      </form>
    </div>
  );
}

export default Login;
