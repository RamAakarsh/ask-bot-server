const {v4: uuid}=require('uuid')
const sessionHistoryHandler=(socket,data,sessions)=>{

    const {sessionId}=data;
    if(sessions[sessionId]){

        socket.emit('session-details',{
            sessionId,
            conversations:sessions[sessionId]
        })

    }else{
        const newSessionId=uuid();

        sessions[newSessionId]=[];

        const sessionDetails={
            sessionId:newSessionId,
            conversations:[]
        }

        socket.emit('session-details',sessionDetails)

    }

}

module.exports={sessionHistoryHandler}