import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import ChatBubble from "@material-ui/icons/ChatBubble";
import OrderIns from "./OrderIns";
import HotelLocation from "./HotelLocation";

function Chatbotcomp(props) {
  let [showChat, setShowChat] = useState(false);

  const startChat = () => setShowChat(true);
  const hideChat = () => setShowChat(false);

  return (
    <>
      {!props.disabled ? (
        <>
          <div
            style={{
              marginTop: "70px",
              position: "fixed",
              zIndex: 100,
              padding: "5px",
              bottom: "10px",
              right: "23px",
              marginRight: "50px",
              display: showChat ? "block" : "none",
            }}
          >
            <ChatBot
              steps={[
                {
                  id: "1",
                  message: "Hello welcome to Eat and Treat How can i help you?",
                  trigger: "2",
                },
                {
                  id: "2",
                  options: [
                    {
                      value: 1,
                      label: "Delivery related questions",
                      trigger: "3",
                    },
                    { value: 2, label: "how to place order", trigger: "5" },
                    {
                      value: 3,
                      label: "return/refund isssue",
                      trigger: "hotels",
                    },
                  ],
                },
                {
                  id: "3",
                  options: [
                    {
                      value: 1,
                      label: "Order not yet Delivered",
                      trigger: "4",
                    },
                    {
                      value: 2,
                      label: "Contact Delivery patter",
                      trigger: "4",
                    },
                    { value: 3, label: "Track the order", trigger: "4" },
                  ],
                },
                {
                  id: "5",
                  component: <OrderIns />,
                  end: false,
                },
                {
                  id: "hotels",
                  options: [
                    {
                      value: 1,
                      label: "Different Food items recieved",
                      trigger: "different",
                    },
                    {
                      value: 2,
                      label: "Order not recieved on time",
                      trigger: "lateDelivery",
                    },
                    {
                      value: 3,
                      label: "Food spilled out  through the wrapper of order",
                      trigger: "food",
                    },
                  ],

                  end: false,
                },
                {
                  id: "food",
                  message:
                    "Apologise for your inconvinience,you can mail images to EatNTreat@gmail.com our Agent will contact you as soon as possible",
                  end: false,
                },
                {
                  id: "different",
                  message:
                    "Apologise for your inconvinience,you can mail images to EatNTreat@gmail.com our Agent will contact you as soon as possible",
                  end: false,
                },
                {
                  id: "lateDelivery",
                  message:
                    "We uderstand your concern,you can rate your delivery service next we will take care of delivery on time",
                  end: false,
                },

                {
                  id: "4",
                  message: "Kindly wait or contact our delivery partner",
                  end: true,
                },
              ]}
            />
          </div>
          <div style={{ position: "fixed", zIndex: 10, float: "right" }}>
            {!showChat ? (
              <button
                id="123"
                className="open-button"
                onClick={() => {
                  startChat();
                }}
              >
                <ChatBubble
                  style={{ height: "30px", width: "30px", display: "block" }}
                />
              </button>
            ) : (
              <button
                id="123"
                className="close-button"
                onClick={() => {
                  hideChat();
                }}
              >
                <ChatBubble
                  style={{
                    height: "30px",
                    width: "30px",
                    display: "block",
                    zIindex: 1000,
                  }}
                />
              </button>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Chatbotcomp;
