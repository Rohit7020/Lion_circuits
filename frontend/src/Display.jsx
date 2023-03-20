import React from 'react'
import { useState,useEffect } from 'react'






const Display = ({token}) => {

   

async function  fun (){
     console.log(token)
   let res=await  fetch("http://localhost:5000/display_files", {

   method: "GET",
      headers:{"Authorization":`Bearer ${token}`},
 

   }).then((res)=>{console.log(res)})


fun()
  return (
    <div>display</div>
  )
}}

export default Display
