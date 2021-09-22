import { createChatBotMessage } from "react-chatbot-kit";
import Botavatar from "./Botavatar";
import OrderIns from "./OrderIns";
import React from "react";
import HotelLocation from "./HotelLocation";
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
  },
    state:{
      todos:[],
      hotels:[]
    },
    widgets:[
      {
        widgetName:"OrderIns",
        widgetFunc : (props) => <OrderIns {...props} />,
        mapStateToprops : ["todos"]
      },
      {
        widgetName:"HotelLocation",
        widgetFunc : (props) => <HotelLocation {...props} />,
        mapStateToprops : ["hotels"]
      },
    ]
  }


export default config