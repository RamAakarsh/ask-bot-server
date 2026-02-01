const conversationDeleteHandler=(socket,data,sessions)=>{
    if(sessions[data.sessionId]){
        sessions[data.sessionId]=[];
    }
}

module.exports={conversationDeleteHandler}