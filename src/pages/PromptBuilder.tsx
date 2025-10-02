import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Trash2, Plus } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";

const PromptBuilder = () => {
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
  const [requiredVars, setRequiredVars] = useState([
    "or.prospectDescription",
    "sent.LinkDescription",
  ]);
  const [optionalVars, setOptionalVars] = useState([
    "or.additionalInfo",
    "or.prospectName",
    "or.companyName",
  ]);
  const [customVars, setCustomVars] = useState([
    "or.calendly",
    "or.goalLink",
    "or.fallbackLINK",
    "or.fallbackLink",
  ]);

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
              {/* GPT Version */}
              <div className="space-y-3">
                <label
                  className="text-sm font-medium text-gray-300"
                  data-testid="text-gpt-label"
                >
                  Models
                </label>
                <Button
                  variant="outline"
                  className="w-full justify-between bg-[#1a1a1a] border-gray-700 text-white hover:bg-[#2a2a2a]"
                  data-testid="button-gpt-version"
                >
                  GPT-4.1
                </Button>
              </div>

              {/* Test Prompt Button */}
              <Link to="/chatbot-test" data-testid="link-test-prompt">
                <Button
                  className="w-full bg-white text-black hover:bg-gray-200"
                  data-testid="button-test-prompt"
                >
                  Test Prompt
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PromptBuilder;
