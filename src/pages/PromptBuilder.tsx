import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import { Link, useNavigate } from "react-router-dom";
import { apiService } from "@/services/api";
import { toast } from "sonner";

const PromptBuilder = () => {
  const navigate = useNavigate();
  
  const [context, setContext] = useState(`# Role
You are {{agentName}}, a representative of {{companyName}}, reaching out to prospects on LinkedIn.

# Mission
Your mission is to engage in personalized conversations that lead to one of two outcomes:
1. For interested prospects, you'll guide them to {{goalLink}} through this link {{calendlyLINK}}.
2. For those not interested, you'll encourage them to {{fallbackLINK}} through this link {{fallbackLINK}}.

# Instructions
1. Begin with a personalized greeting
2. Keep messages under 50 words
3. Avoid starting your sentence with a verb, as this can make your writing feel abrupt or too commanding
4. Keep it conversational
5. Use pragmatic, straight-to-point language
6. Maintain moderate number of questions throughout conversation
7. Show genuine interest without being scripted
8. Never appear robotic without being too slow if the prospect is interested
9. Adapt your tone: don't be too slow if the prospect is interested
10. If unrelated requests: politely decline and redirect to relevant topic
11. If asked about a free trial: there is no free trial for this product
12. For company names in CAPS: capitalize first letter only`);

  const [firstMessage, setFirstMessage] = useState("");
  const [aiModel, setAiModel] = useState("gpt-3.5-turbo");
  const [isLoading, setIsLoading] = useState(false);

  const handleTestPrompt = async () => {
    if (!firstMessage.trim()) {
      toast.error("Please enter a first message");
      return;
    }

    setIsLoading(true);

    try {
      // Check if user is authenticated
      if (!apiService.isAuthenticated()) {
        toast.error("Please login first");
        navigate('/auth');
        return;
      }

      // Create a new conversation in the backend
      const conversationData = await apiService.createConversation(
        "Test Conversation",
        context,
        aiModel
      );

      // Store the first message and conversation ID for the ChatbotTest page
      localStorage.setItem('lynko_first_message', firstMessage.trim());
      localStorage.setItem('lynko_conversation_id', conversationData.conversation.id.toString());

      navigate('/chatbot-test');
      toast.success("Conversation created successfully!");
    } catch (error) {
      console.error("Error creating conversation:", error);
      toast.error("Failed to create conversation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navigation />

      <main className="pt-32 pb-20 px-6">
        {/* Main Content */}
        <div className="max-w-[1800px] mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-[1fr,400px] gap-8">
            {/* Left Column - Context and First Message */}
            <div className="space-y-6">
              {/* First Message */}
              <div className="space-y-3">
                <label
                  className="text-sm font-medium text-gray-300"
                  data-testid="text-first-message-label"
                >
                  First Message
                </label>
                <Textarea
                  value={firstMessage}
                  onChange={(e) => setFirstMessage(e.target.value)}
                  placeholder="Enter the first message..."
                  className="min-h-[100px] bg-[#1a1a1a] border-gray-700 text-white resize-none"
                  data-testid="input-first-message"
                />
              </div>

              {/* Context */}
              <div className="space-y-3">
                <label
                  className="text-sm font-medium text-gray-300"
                  data-testid="text-context-label"
                >
                  Context
                </label>
                <Textarea
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  className="min-h-[600px] bg-[#1a1a1a] border-gray-700 text-white font-mono text-sm resize-none"
                  data-testid="input-context"
                />
              </div>
            </div>

            {/* Right Column - Variables */}
            <div className="space-y-6">
              {/* AI Models */}
              <div className="space-y-3">
                <label
                  className="text-sm font-medium text-gray-300"
                  data-testid="text-gpt-label"
                >
                  Models
                </label>
                <Select value={aiModel} onValueChange={setAiModel}>
                  <SelectTrigger
                    className="bg-[#1a1a1a] border-gray-700 text-white"
                    data-testid="select-model"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-3.5-turbo" data-testid="select-item-gpt-3.5">
                      GPT-3.5 Turbo
                    </SelectItem>
                    <SelectItem value="gpt-4" data-testid="select-item-gpt-4">
                      GPT-4
                    </SelectItem>
                    <SelectItem value="claude-instant-1" data-testid="select-item-claude-instant">
                      Claude Instant-1
                    </SelectItem>
                    <SelectItem value="claude-2" data-testid="select-item-claude-2">
                      Claude-2
                    </SelectItem>
                    <SelectItem value="gemini-pro" data-testid="select-item-gemini">
                      Gemini Pro
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Test Prompt Button */}
              <Button
                onClick={handleTestPrompt}
                disabled={isLoading}
                className="w-full bg-white text-black hover:bg-gray-200"
                data-testid="button-test-prompt"
              >
                {isLoading ? "Creating..." : "Test Prompt"}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PromptBuilder;
