const {v4: uuid}=require('uuid')
const {getOpenAI} = require('../../modules/openAiConfigurator')
const {openAIKey:{enabled,limit}}=require('config')
const conversationMessageHandler=async (socket,data,sessions)=>{
    const {sessionId,message,conversationId}=data;
    if(sessions[sessionId]){
        const existingConversation= sessions[sessionId].find(s=>s.id===conversationId);

        const prevConvo=[]
        if(existingConversation){
            prevConvo.push(...existingConversation.messages.map(c=>({
                content:c.content,
                role:c.aiMessage?'assistant':'user'
            })))
        }

        let aiMessageContent="Hi,Please contact Admin to chat with me!"
        if(enabled){
        if(prevConvo.length>limit) {
            aiMessageContent="You have exceeded chat limit! Please contact Admin to increase the limit."
        }else{
            const openai=getOpenAI()
            const response=await openai.chat.completions.create({
            model:'gpt-4o',
            messages:[
                ...prevConvo,
                {role:'user',content:message.content}
            ]
        })
        aiMessageContent=response?.choices[0]?.message?.content;
        }   
       
        }

        const aiMessage={
            content:aiMessageContent?aiMessageContent:"error occured to get ai response",
            id:uuid(),
            aiMessage:true
        }

        const conversation=sessions[sessionId].find(s=>s.id===conversationId);
        if(!conversation){
            sessions[sessionId].push({
                id:conversationId,
                messages:[message,aiMessage]
            })
        }

        if(conversation){
            conversation.messages.push(message,aiMessage)
        }

        const updatedConvo=sessions[sessionId].find(s=>s.id===conversationId)

        socket.emit('conversation-details',updatedConvo)

    }
} 

module.exports={conversationMessageHandler}