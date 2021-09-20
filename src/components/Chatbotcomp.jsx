import React, { useState } from 'react'
import { Chatbot } from 'react-chatbot-kit'
import ActionProvider from './actionprovider'
import config from './config'
import MessageParser from './messageparser'
import './chatbotcomp.css'


function Chatbotcomp() {
  const [showBot, toggleBot] = useState(false);

  return (
    <div style={{ width: "500px", marginBottom: "100px", marginLeft: "500px",position:"absolute",zIndex:10}}>
      {showBot && (
        <Chatbot
          config={config}
          actionProvider={ActionProvider}
          messageParser={MessageParser}
        />
      )}
      <div class="outer circle" style={{position:"absolute",zIndex:10}}>
        <button onClick={() => toggleBot((prev) => !prev)}>Bot</button>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}

export default Chatbotcomp
