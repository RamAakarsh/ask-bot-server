const OpenAI = require("openai/index.js");
const {openAIKey:{apiKey}}=require('config')
let openAICtx;

const connectWithOpenAi=()=>{

openAICtx= new OpenAI({apiKey});

}

const getOpenAI=()=>{
    return openAICtx;
}


module.exports={connectWithOpenAi,getOpenAI};