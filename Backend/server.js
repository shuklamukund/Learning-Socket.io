import express from 'express';
import { Server } from 'socket.io';
import {createServer} from 'http';

const app=express();
const httpServer=createServer();
const io=new Server(httpServer,{
cors:{
    origin:"http://localhost:5173",
    credentials:true
}
});
io.on("connection",(socket)=>{
    console.log("what is socket:",socket);
    console.log("socket is active to be connected");

    socket.on("chat",(payload)=>{
        console.log("what is payload",payload);
        io.emit("chat",payload)
    });
});

// app.listen(3000,()=>{
//     console.log("server is active...");
// })

httpServer.listen(3000,()=>{
    console.log("server is active...");
})
