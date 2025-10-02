import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Trash2, Plus } from "lucide-react";
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
    "sent.LinkDescription"
  ]);
  const [optionalVars, setOptionalVars] = useState([
    "or.additionalInfo",
    "or.prospectName",
    "or.companyName"
  ]);
  const [customVars, setCustomVars] = useState([
    "or.calendly",
    "or.goalLink",
    "or.fallbackLINK",
    "or.fallbackLink"
  ]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between max-w-[1800px] mx-auto">
          <div className="flex items-center gap-4">
            <Link to="/" data-testid="link-back">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white" data-testid="button-back">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-semibold" data-testid="text-title">Edit Prompt: Kakiyo Main</h1>
              <p className="text-sm text-gray-400" data-testid="text-subtitle">Edit your prompt content and variables</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="text-red-500 hover:text-red-400 hover:bg-red-500/10" data-testid="button-delete">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
            <Button className="bg-white text-black hover:bg-gray-200" data-testid="button-save">
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-[1fr,400px] gap-8">
          {/* Left Column - Context and First Message */}
          <div className="space-y-6">
            {/* First Message */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300" data-testid="text-first-message-label">
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
              <label className="text-sm font-medium text-gray-300" data-testid="text-context-label">
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
              <label className="text-sm font-medium text-gray-300" data-testid="text-gpt-label">
                GPT-4.1
              </label>
              <Button variant="outline" className="w-full justify-between bg-[#1a1a1a] border-gray-700 text-white hover:bg-[#2a2a2a]" data-testid="button-gpt-version">
                GPT-4.1
              </Button>
            </div>

            {/* Test Prompt Button */}
            <Link to="/chatbot-test" data-testid="link-test-prompt">
              <Button className="w-full bg-white text-black hover:bg-gray-200" data-testid="button-test-prompt">
                Test Prompt
              </Button>
            </Link>

            {/* Variables Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-300" data-testid="text-variables-title">Variables</h3>
              </div>
              <p className="text-xs text-gray-500" data-testid="text-variables-description">
                Required variables are marked with *
              </p>

              {/* New Variable */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400" data-testid="text-new-variable-label">New variable name</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="variable_name"
                    className="bg-[#1a1a1a] border-gray-700 text-white"
                    data-testid="input-new-variable"
                  />
                  <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white" data-testid="button-add-variable">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Required Variables */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400" data-testid="text-required-label">Required Variables</label>
                {requiredVars.map((varName, index) => (
                  <Input
                    key={index}
                    value={varName}
                    onChange={(e) => {
                      const newVars = [...requiredVars];
                      newVars[index] = e.target.value;
                      setRequiredVars(newVars);
                    }}
                    className="bg-emerald-500/10 border-emerald-500/50 text-emerald-400"
                    data-testid={`input-required-${index}`}
                  />
                ))}
              </div>

              {/* Optional Variables */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400" data-testid="text-optional-label">Optional Variables</label>
                {optionalVars.map((varName, index) => (
                  <Input
                    key={index}
                    value={varName}
                    onChange={(e) => {
                      const newVars = [...optionalVars];
                      newVars[index] = e.target.value;
                      setOptionalVars(newVars);
                    }}
                    className="bg-blue-500/10 border-blue-500/50 text-blue-400"
                    data-testid={`input-optional-${index}`}
                  />
                ))}
              </div>

              {/* Custom Variables */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400" data-testid="text-custom-label">Custom Variables</label>
                {customVars.map((varName, index) => (
                  <Input
                    key={index}
                    value={varName}
                    onChange={(e) => {
                      const newVars = [...customVars];
                      newVars[index] = e.target.value;
                      setCustomVars(newVars);
                    }}
                    className="bg-[#1a1a1a] border-emerald-500/50 text-emerald-400"
                    data-testid={`input-custom-${index}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptBuilder;
