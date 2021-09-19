import React,{useState} from 'react'
import {Chatbot} from 'react-chatbot-kit'
import ActionProvider from './actionprovider'
import config from './config'
import MessageParser from './messageparser'


function Chatbotcomp() {
    const [showBot, toggleBot] = useState(false);

    return (
        <div style={{width:"500px" ,marginBottom:"100px",marginLeft:"500px"}}>
            {showBot && (
          <Chatbot
            config={config}
            actionProvider={ActionProvider}
            messageParser={MessageParser}
          />
        )}
        <button onClick={() => toggleBot((prev) => !prev)}>Bot</button>
        </div>
    )
}

export default Chatbotcomp
