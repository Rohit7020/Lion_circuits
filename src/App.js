import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
import Main from "./Main";
import Display from "./Display"


function App() {
  let [fileData, setFileData] = useState();
  let [token,setToken]=useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEiLCJpYXQiOjE2NzkzMDA1MjF9.NRZ2veywa93DmKEdW5kKMJOZxgdwnITgy6oTx_XFqtU")
  
  let [login,setlogin]=useState(false)

  let fileChange = (e) => {
    setFileData(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
console.log("token",token)
    const data = new FormData();

    data.append("image", fileData);
    

    fetch("http://localhost:5000/upload_file", {
      method: "POST",
      headers:{"Authorization":`Bearer ${token}`},
      body: data,
     
    })
      .then((result) => {
        console.log("File Sent Successful");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="App">
      <Signup setToken={setToken}/>
      <Login setlogin={setlogin} setToken={setToken}/>
{
 login &&   <Main onSubmit={onSubmit} fileChange={fileChange} />
}
{ login &&  <Display/>}
    </div>
  );
}

export default App;

