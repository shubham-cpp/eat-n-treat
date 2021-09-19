class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
      this.createClientMessage = createClientMessage;
    }

    helloWorldHandler = () =>{
        const message = this.createChatBotMessage("Hello how can i help you")
        this.setChatbotMsg(message)
    }

    deliveryHandler = () => {
        const message1= this.createChatBotMessage("Kindly wait untill  our  Assitant is available")
        const message2= this.createChatBotMessage("or else you can contact our customer care number 8788267588")
        this.setChatbotMsg(message1)
        this.setChatbotMsg(message2)
    }

    setChatbotMsg = (message)=>{
        this.setState(state =>({...state,messages:[...state.messages,message]}))
    }
  }
  
  export default ActionProvider;