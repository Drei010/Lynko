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
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const PromptBuilder = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState("gpt-3.5-turbo");

  const handleTestPrompt = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt to test");
      return;
    }

    // Navigate to chatbot test page with the prompt
    navigate("/chatbot", { state: { initialPrompt: prompt, model: selectedModel } });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navigation />

      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Prompt Builder</h1>
              <p className="text-gray-400">
                Create and test AI prompts for your chatbot
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">AI Model</label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="bg-[#1a1a1a] border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                    <SelectItem value="gpt-4">GPT-4</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">System Prompt</label>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter your system prompt here..."
                  className="bg-[#1a1a1a] border-gray-700 text-white min-h-[300px]"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleTestPrompt}
                  className="bg-white text-black hover:bg-gray-200"
                >
                  Test Prompt
                </Button>
                <Button
                  onClick={() => navigate("/chatbot")}
                  variant="outline"
                  className="bg-[#1a1a1a] border-gray-700 text-white hover:bg-[#2a2a2a]"
                >
                  Go to Chatbot
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PromptBuilder;