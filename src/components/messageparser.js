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
      if (lowercase.includes("delivery issue")){
        this.actionProvider.deliveryHandler()
    }

    }
  }
  
  export default MessageParser;