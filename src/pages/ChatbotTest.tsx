import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ChatbotTest = () => {
  const [messages, setMessages] = useState<
    Array<{ id: number; role: "user" | "assistant"; content: string }>
  >([
    {
      id: 1,
      role: "assistant",
      content:
        "Hi! I'm your AI assistant. I can help you with LinkedIn conversations, prospect qualification, and meeting booking. How can I help you today?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const [product, setProduct] = useState("Kakiyo");
  const [goal, setGoal] = useState("Book a demo of the product");
  const [goalLink, setGoalLink] = useState("https://cal.com/kakiyo");
  const [fallback, setFallback] = useState("visit website");
  const [fallbackLink, setFallbackLink] = useState("https://kakiyo.com");

  // Mock AI response generator
  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return "Hello! Nice to meet you. I'm here to help you with LinkedIn automation and prospect qualification. What would you like to know?";
    }
    
    if (lowerMessage.includes("demo") || lowerMessage.includes("meeting")) {
      return `Great! I'd be happy to help you book a demo. Based on your configuration, I can schedule a ${goal} at ${goalLink}. Would you like to proceed?`;
    }
    
    if (lowerMessage.includes("product") || lowerMessage.includes("tell me about")) {
      return `I can tell you about ${product}. It's a powerful platform designed to help SDRs automate personalized LinkedIn conversations at scale. Would you like to know more about specific features?`;
    }
    
    if (lowerMessage.includes("how") || lowerMessage.includes("work")) {
      return "I work by autonomously handling entire personalized LinkedIn conversations. I can qualify prospects based on their responses, understand their needs, and either book meetings with interested prospects or direct them to alternative resources. I maintain a human-like, personalized touch throughout the conversation.";
    }
    
    if (lowerMessage.includes("price") || lowerMessage.includes("cost")) {
      return "For detailed pricing information, I can direct you to our website or schedule a call with our sales team to discuss a plan that fits your needs. Which would you prefer?";
    }
    
    if (lowerMessage.includes("bye") || lowerMessage.includes("goodbye")) {
      return "Thank you for chatting with me! If you have any more questions, feel free to reach out. Have a great day!";
    }
    
    // Default response
    return `Based on your message about "${userMessage}", I understand you're interested in learning more about ${product}. I can help you ${goal}, or if you prefer, you can ${fallback} at ${fallbackLink}. What would work best for you?`;
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === "" || isLoading) return;

    const newUserMessage = {
      id: messages.length + 1,
      role: "user" as const,
      content: inputMessage,
    };

    setMessages([...messages, newUserMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        role: "assistant" as const,
        content: generateAIResponse(inputMessage),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleNewTest = () => {
    setMessages([
      {
        id: 1,
        role: "assistant",
        content:
          "Hi! I'm your AI assistant. I can help you with LinkedIn conversations, prospect qualification, and meeting booking. How can I help you today?",
      },
    ]);
    setInputMessage("");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navigation />

      <main className="pt-20">
        {/* Main Content */}
        <div className="max-w-[1800px] mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-[1fr,400px] gap-8">
            {/* Left Column - Test Conversation */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2
                  className="text-lg font-semibold"
                  data-testid="text-conversation-title"
                >
                  Test Conversation
                </h2>
                <div className="flex gap-2">
                  <Button
                    onClick={handleNewTest}
                    variant="outline"
                    className="bg-[#1a1a1a] border-gray-700 text-white hover:bg-[#2a2a2a]"
                    data-testid="button-new-test"
                  >
                    New Test
                  </Button>
                  <Button
                    onClick={() => navigate("/prompt-builder")}
                    variant="outline"
                    className="bg-[#1a1a1a] border-gray-700 text-white hover:bg-[#2a2a2a]"
                    data-testid="button-edit-mode"
                  >
                    Edit Prompt
                  </Button>
                </div>
              </div>

              {/* Conversation Messages */}
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-4 rounded-lg ${
                        message.role === "assistant"
                          ? "bg-[#1a1a1a] border border-gray-800"
                          : "bg-white/5 border border-gray-700 ml-12"
                      }`}
                      data-testid={`message-${message.id}`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="text-xs text-gray-400"
                          data-testid={`text-sender-${message.id}`}
                        >
                          {message.role === "assistant" ? "AI Assistant" : "User"}
                        </span>
                      </div>
                      <p
                        className="text-sm text-gray-200"
                        data-testid={`text-message-${message.id}`}
                      >
                        {message.content}
                      </p>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="p-4 rounded-lg bg-[#1a1a1a] border border-gray-800">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-gray-400">AI Assistant</span>
                      </div>
                      <p className="text-sm text-gray-200">Typing...</p>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Chat Input Area */}
              <div className="flex gap-2 items-end">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="bg-[#1a1a1a] border-gray-700 text-white flex-1"
                  data-testid="input-chat-message"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-white text-black hover:bg-gray-200 px-6"
                  data-testid="button-send-message"
                  disabled={isLoading}
                >
                  Send
                </Button>
              </div>
            </div>

            {/* Right Column - Test Configuration */}
            <div className="space-y-6">
              {/* Test Configuration */}
              <div className="space-y-4">
                <h3
                  className="text-sm font-medium text-gray-300"
                  data-testid="text-config-title"
                >
                  Test Configuration
                </h3>

                {/* Product */}
                <div className="space-y-2">
                  <label
                    className="text-xs text-gray-400"
                    data-testid="text-product-label"
                  >
                    Product
                  </label>
                  <Select value={product} onValueChange={setProduct}>
                    <SelectTrigger
                      className="bg-[#1a1a1a] border-gray-700 text-white"
                      data-testid="select-product"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value="Kakiyo"
                        data-testid="select-item-kakiyo"
                      >
                        Kakiyo
                      </SelectItem>
                      <SelectItem value="Other" data-testid="select-item-other">
                        Other
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Goal */}
                <div className="space-y-2">
                  <label
                    className="text-xs text-gray-400"
                    data-testid="text-goal-label"
                  >
                    goal
                  </label>
                  <Input
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="bg-[#1a1a1a] border-gray-700 text-white"
                    data-testid="input-goal"
                  />
                </div>

                {/* Goal Link */}
                <div className="space-y-2">
                  <label
                    className="text-xs text-gray-400"
                    data-testid="text-goal-link-label"
                  >
                    goal_link
                  </label>
                  <Input
                    value={goalLink}
                    onChange={(e) => setGoalLink(e.target.value)}
                    className="bg-[#1a1a1a] border-gray-700 text-white"
                    data-testid="input-goal-link"
                  />
                </div>

                {/* Fallback */}
                <div className="space-y-2">
                  <label
                    className="text-xs text-gray-400"
                    data-testid="text-fallback-label"
                  >
                    fallback
                  </label>
                  <Input
                    value={fallback}
                    onChange={(e) => setFallback(e.target.value)}
                    className="bg-[#1a1a1a] border-gray-700 text-white"
                    data-testid="input-fallback"
                  />
                </div>

                {/* Fallback Link */}
                <div className="space-y-2">
                  <label
                    className="text-xs text-gray-400"
                    data-testid="text-fallback-link-label"
                  >
                    fallback_link
                  </label>
                  <Input
                    value={fallbackLink}
                    onChange={(e) => setFallbackLink(e.target.value)}
                    className="bg-[#1a1a1a] border-gray-700 text-white"
                    data-testid="input-fallback-link"
                  />
                </div>
                {/* Info about configuration */}
                <div className="text-xs text-gray-400 p-3 bg-[#1a1a1a] border border-gray-800 rounded">
                  These settings customize how the AI assistant responds in conversations
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatbotTest;
