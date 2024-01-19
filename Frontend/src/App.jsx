
import './App.css'
import { useState,useEffect } from 'react';
import {io} from 'socket.io-client';
import {nanoid} from 'nanoid';


const socket=io("http://localhost:3000")
const userName=nanoid(4)// to reduce the id size,we can pass the size as an argument

function App() {
 
  const [message,setMessage]=useState('')
  const [chat,setChat]=useState([]);

  const sendChat=(e)=>{
    e.preventDefault();
    socket.emit("chat",{message:message,userName:userName})
    setMessage('')
  }

  useEffect(()=>{
    socket.on("chat",(payload)=>{
      setChat([...chat,payload])

    })
  })

  return (
    <>
      <h1>chat App</h1>
      {chat.map((payload,index)=>(
        <p key={index}>{payload.message}: <span>id:{payload.userName}</span></p>
      ))}
      <form onSubmit={sendChat}>
        <input type="text" name="chat" 
        placeholder='send text...'
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        />
        <button type='submit'>Send</button>

      </form>
    </>
  )
}

export default App
