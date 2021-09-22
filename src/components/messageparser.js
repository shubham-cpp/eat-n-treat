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
      else if (lowercase.includes("delivery issue") || lowercase.includes("delivery") ){
        this.actionProvider.deliveryHandler()
    }
    else if (lowercase.includes("order food")||lowercase.includes("order the food")||lowercase.includes("order instructions")){
      this.actionProvider.OrderInsHandler()
    }
    else if(lowercase.includes("top restaraunts")||lowercase.includes("top hotels")){
      this.actionProvider.TopHotelHandler()
    }
    else{
      this.actionProvider.nothingHandler()
    }

    }
  }
  
  export default MessageParser;