import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
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
import { Plus, Trash2 } from "lucide-react";

interface Variable {
  name: string;
  required: boolean;
}

const PromptBuilder = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState("gpt-3.5-turbo");
  const [newVariableName, setNewVariableName] = useState("");

  // Example variables - you might want to make these stateful
  const requiredVariables: Variable[] = [
    { name: "username", required: true },
    { name: "product_name", required: true }
  ];

  const optionalVariables: Variable[] = [
    { name: "tone", required: false },
    { name: "language", required: false }
  ];

  const [customVariables, setCustomVariables] = useState<Variable[]>([]);

  const handleTestPrompt = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt to test");
      return;
    }

    // Navigate to chatbot test page with the prompt
    navigate("/chatbot", { 
      state: { 
        initialPrompt: prompt, 
        model: selectedModel 
      } 
    });
  };

  const handleAddVariable = () => {
    if (!newVariableName.trim()) {
      toast.error("Please enter a variable name");
      return;
    }

    const newVariable: Variable = {
      name: newVariableName.trim(),
      required: false
    };

    setCustomVariables([...customVariables, newVariable]);
    setNewVariableName("");
    toast.success(`Variable "${newVariableName}" added`);
  };

  const handleDeleteVariable = (index: number) => {
    const variableToDelete = customVariables[index];
    setCustomVariables(customVariables.filter((_, i) => i !== index));
    toast.success(`Variable "${variableToDelete.name}" deleted`);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navigation />

      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex gap-8">
            {/* Main Content - Prompt Builder */}
            <div className="flex-1 space-y-6">
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
                    className="bg-[#1a1a1a] border-gray-700 text-white min-h-[300px] resize-y"
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

            {/* Sidebar - Variables Panel */}
            <div className="w-80 border-l border-gray-700 bg-[#1a1a1a] p-6 space-y-6 overflow-auto">
              <div className="space-y-2">
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="bg-[#0a0a0a] border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                    <SelectItem value="gpt-4">GPT-4</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                className="w-full text-black"  
                variant="outline"
                onClick={handleTestPrompt}
              >
                Test Preview
              </Button>

              {/* Variables Section */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold mb-2">Variables</h3>
                  <p className="text-xs text-gray-400 mb-3">
                    Required variables are marked with *
                  </p>
                  
                  {/* New Variable Input */}
                  <div className="flex gap-2 mb-4">
                    <Input
                      placeholder="New variable name"
                      value={newVariableName}
                      onChange={(e) => setNewVariableName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddVariable()}
                      className="text-sm bg-[#0a0a0a] border-gray-700 text-white"
                    />
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={handleAddVariable}
                      className="text-white hover:bg-[#2a2a2a]"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Required Variables */}
                <div>
                  <h4 className="text-xs font-medium text-gray-400 mb-2">
                    Required Variables
                  </h4>
                  <div className="space-y-2">
                    {requiredVariables.map((variable) => (
                      <div
                        key={variable.name}
                        className="px-3 py-2 rounded-md bg-green-950 border border-green-800 text-green-400 text-sm"
                      >
                        {variable.name} *
                      </div>
                    ))}
                  </div>
                </div>

                {/* Optional Variables */}
                <div>
                  <h4 className="text-xs font-medium text-gray-400 mb-2">
                    Optional Variables
                  </h4>
                  <div className="space-y-2">
                    {optionalVariables.map((variable) => (
                      <div
                        key={variable.name}
                        className="px-3 py-2 rounded-md bg-blue-950 border border-blue-800 text-blue-400 text-sm"
                      >
                        {variable.name}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Custom Variables */}
                {customVariables.length > 0 && (
                  <div>
                    <h4 className="text-xs font-medium text-gray-400 mb-2">
                      Custom Variables
                    </h4>
                    <div className="space-y-2">
                      {customVariables.map((variable, index) => (
                        <div
                          key={index}
                          className="px-3 py-2 rounded-md bg-purple-950 border border-purple-800 text-purple-400 text-sm flex items-center justify-between group"
                        >
                          <span>{variable.name}</span>
                          <button
                            onClick={() => handleDeleteVariable(index)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-3 w-3 text-purple-400 hover:text-red-400" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PromptBuilder;