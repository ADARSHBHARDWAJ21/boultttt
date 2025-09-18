import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, Bot, User } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your travel assistant. How can I help you plan your next adventure?",
      isBot: true,
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      isBot: false,
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(inputValue),
        isBot: true,
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputValue("");
  };

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes("destination") || input.includes("place")) {
      return "We offer amazing destinations like Kerala Backwaters, Rajasthan Desert, Himachal Mountains, and Goa Beaches! Which type of Indian adventure interests you most?";
    }
    if (input.includes("price") || input.includes("cost")) {
      return "Our packages start from ₹9,999 for Goa beaches up to ₹18,999 for Himachal mountain retreats. We also have Basic (₹799/month) and Premium (₹2,499/month) plans!";
    }
    if (input.includes("book") || input.includes("reservation")) {
      return "You can book instantly through our platform! Premium members get priority booking and exclusive upgrades.";
    }
    if (input.includes("support") || input.includes("help")) {
      return "We provide 24/7 support for all our Premium members, and email support for Basic members. How can I assist you today?";
    }
    
    return "That's a great question! I can help you with destinations, pricing, bookings, and travel planning. What specific information are you looking for?";
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-hero hover:opacity-90 animate-glow"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chatbot Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 h-96 z-50 bg-gradient-card border-border/50 shadow-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5 text-primary" />
                <span className="font-semibold">Travel Assistant</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 p-0"
              >
                ×
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="flex flex-col h-full p-4 pt-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`flex items-start space-x-2 max-w-[80%] ${
                      message.isBot ? 'flex-row' : 'flex-row-reverse space-x-reverse'
                    }`}
                  >
                    <div className={`p-1 rounded-full ${message.isBot ? 'bg-primary' : 'bg-secondary'}`}>
                      {message.isBot ? (
                        <Bot className="h-3 w-3" />
                      ) : (
                        <User className="h-3 w-3" />
                      )}
                    </div>
                    <div
                      className={`p-3 rounded-lg text-sm ${
                        message.isBot
                          ? 'bg-secondary text-foreground'
                          : 'bg-primary text-primary-foreground'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button size="sm" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Chatbot;