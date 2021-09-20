class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
      const lowercase = message.toLowerCase()
      console.log(this.state)
      
      if (lowercase.includes("hello")){
          this.actionProvider.helloWorldHandler()
      }
      else if (lowercase.includes("delivery issue")){
        this.actionProvider.deliveryHandler()
    }
    else{
      this.actionProvider.nothingHandler()
    }

    }
  }
  
  export default MessageParser;