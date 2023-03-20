import React, { useState } from 'react';


let Main=({onSubmit,fileChange})=>{
console.log(onSubmit,fileChange)
    return(<div>

      <h1>React App File Uploading</h1>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={fileChange} />
        <br/>
        <br/>
        <button type="submit">Submit File to Backend</button>
      </form>
    </div>)
}

export default Main;