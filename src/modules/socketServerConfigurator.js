const {Server}=require('socket.io')
const {conversationDeleteHandler}=require('../socket/handlers/deleteHandler.js')
const {sessionHistoryHandler}=require('../socket/handlers/sessionHandler.js')
const {conversationMessageHandler}=require('../socket/handlers/messageHandler.js')
let sessions={}
const socketServerConfig=(server)=>{
    const io= new Server(server,{
        cors:{
            origin:'*',
            methods:['GET','POST']
        }
    })

    io.on('connection',(socket)=>{
        console.log(`user connected to ${socket.id}`)

        socket.on('session-history',data=>{
            sessionHistoryHandler(socket,data,sessions)
        })

        socket.on('conversation-message',(data)=>{
            conversationMessageHandler(socket,data,sessions)
        })

         socket.on('conversation-delete',(data)=>{
            conversationDeleteHandler(socket,data,sessions)
        })
    })

}

module.exports={socketServerConfig}