import { createChatBotMessage } from "react-chatbot-kit";
import Botavatar from "./Botavatar";
import React from "react";

const config = {
  initialMessages: [createChatBotMessage(`Hello,Welcome to Eat and Treat`)],
  botName:"Siri",
  floating: true,
  customComponents : {
    botAvatar : (props) => <Botavatar {...props} />
  },
  customStyles: {
    // Overrides the chatbot message styles
    botMessageBox: {
      backgroundColor: "purple",
    },
    // Overrides the chat button styles
    chatButton: {
      backgroundColor: "purple",
    },
  }
}

export default config