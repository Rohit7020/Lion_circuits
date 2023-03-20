import React, { useState } from 'react';
import "./Signup.css"

let Signup=({setToken,setSignup})=>{
  let [email,setEmail]=useState('');
  let [password,setPassword]=useState('');
  let [confirmPassword,setConfirmPassword]=useState('');

  let Email=(event)=>{
    setEmail(event.target.value);
  }

  let Password=(event)=>{
    setPassword(event.target.value);
  }

  let ConfirmPassword=(event)=>{
    setConfirmPassword(event.target.value);
  }

  let Submit=(event)=>{
    event.preventDefault();
    // Add your signup logic here
    
  }
  let fun =async(e)=>{

    //const data = new FormData();
  
    let obj=JSON.stringify({"email":email,"password":password})
    //data.append(obj)
    console.log(obj)
  
   let res=await  fetch("http://localhost:5000/user/signup", {method: "POST", mode: "cors",
        headers:{"Content-Type": "application/json"},body:obj})
        .then((response)=>response.text())
        .then(data =>{
          let a=JSON.parse(data)
         setToken(a.token)
         setSignup(true)
         
        })
      
      //console.log(res)
     
  }

  return (
    <div className='signup'>
      <h2 className='form1'>Signup Form</h2>
      <form className='form' onSubmit={Submit}><br/>
        <label>Email:</label><br/>
        <input type="email" value={email} onChange={Email} /><br/>
        <label>Password:</label><br/>
        <input type="password" value={password} onChange={Password} /><br/>
        <label>Confirm Password:</label><br/>
        <input type="password" value={confirmPassword} onChange={ConfirmPassword} /><br/>
        <p></p>
        <button type="submit">Signup</button><br/>
      </form>
    </div>
  );
}

export default Signup;
