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

    nothingHandler = () =>{
        const message = this.createChatBotMessage("Sorry i didn't get you could u repeat")
        this.setChatbotMsg(message)
    }

    OrderInsHandler = () =>{
        const message = this.createChatBotMessage("Here are the details regarding how to order the food",{
            widget:"OrderIns"
        })
        this.setChatbotMsg(message)
    }

    TopHotelHandler = () =>{
        const message = this.createChatBotMessage("Sure,Here are the top hotels from your area",{
            widget:"HotelLocation"
        })
        this.setChatbotMsg(message)
    }

    setChatbotMsg = (message)=>{
        this.setState(state =>({...state,messages:[...state.messages,message]}))
    }
  }
  
  export default ActionProvider;