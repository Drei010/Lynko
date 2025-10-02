import { useState } from "react";
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
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      text: "Hi Philips, saw your 'cold outreach playbook' post where you broke down your five reply rates. Curious—what's been your biggest challenge scaling that level of personalization lately?",
    },
    {
      id: 2,
      type: "user",
      text: "Hi Rian, it's taking way too much time to our team to personalise everything",
    },
    {
      id: 3,
      type: "ai",
      text: "Makes sense. Most teams get bogged down by manual research and writing. Ever considered letting an handle those LinkedIn conversations 1:1 without sacrificing that personal touch?",
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [product, setProduct] = useState("Kakiyo");
  const [goal, setGoal] = useState("Book a demo of the product");
  const [goalLink, setGoalLink] = useState("https://cal.com/kakiyo");
  const [fallback, setFallback] = useState("visit website");
  const [fallbackLink, setFallbackLink] = useState("https://kakiyo.com");

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      type: "user" as const,
      text: inputMessage,
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleNewTest = () => {
    setMessages([]);
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
                  variant="outline"
                  className="bg-[#1a1a1a] border-gray-700 text-white hover:bg-[#2a2a2a]"
                  data-testid="button-edit-mode"
                >
                  Edit Test Mode
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
                      message.type === "ai"
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
                        {message.type === "ai" ? "AI Assistant" : "User"}
                      </span>
                    </div>
                    <p
                      className="text-sm text-gray-200"
                      data-testid={`text-message-${message.id}`}
                    >
                      {message.text}
                    </p>
                  </div>
                ))}
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
              />
              <Button
                onClick={handleSendMessage}
                className="bg-white text-black hover:bg-gray-200 px-6"
                data-testid="button-send-message"
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
                    <SelectItem value="Kakiyo" data-testid="select-item-kakiyo">
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
              {/* Test Prompt Button */}
              <Button
                className="w-full bg-white text-black hover:bg-gray-200"
                data-testid="button-test-prompt"
              >
                Test Prompt
              </Button>
            </div>
          </div>
        </div>
      </div>
      </main>
    </div>
  );
};

export default ChatbotTest;
