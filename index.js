const express = require('express');
const http=require('http');
const cors=require('cors')
const socketServer =require('./src/socketServer.js')
const {connectWithOpenAi} = require('./src/ai.js')

const app = express();
const server=http.createServer(app);
socketServer.registerSocketServer(server)
connectWithOpenAi();

app.use(cors());

app.get('/',(req,res)=>{
    res.send('Hello')
})

const PORT=process.env.PORT || 5000;

server.listen(PORT,()=>{
    console.log(`LISTENING to PORT ${PORT}`)
})
