import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import CodeEditor from "@/components/code-editor";

export default function Playground() {
  const [output, setOutput] = useState("");
  const [activeExample, setActiveExample] = useState("");

  const codeExamples = [
    {
      id: "hello",
      name: "Hello World",
      icon: "fas fa-globe",
      code: `# Your first Python program!
print("Hello, World!")
print("Welcome to Python!")`,
      description: "The classic first program that every programmer writes!"
    },
    {
      id: "variables",
      name: "Variables Fun",
      icon: "fas fa-box",
      code: `# Playing with variables
name = "Python Coder"
age = 10
favorite_color = "blue"

print("Hi! My name is", name)
print("I am", age, "years old")
print("My favorite color is", favorite_color)`,
      description: "Learn how to store and use information in variables!"
    },
    {
      id: "math",
      name: "Math Magic",
      icon: "fas fa-calculator",
      code: `# Python can do math!
a = 15
b = 7

print("Addition:", a + b)
print("Subtraction:", a - b)
print("Multiplication:", a * b)
print("Division:", a / b)`,
      description: "Make Python your personal calculator!"
    },
    {
      id: "conditions",
      name: "Smart Decisions",
      icon: "fas fa-brain",
      code: `# Making smart choices
weather = "sunny"
temperature = 75

if weather == "sunny" and temperature > 70:
    print("Perfect day for the park! ☀️")
elif weather == "rainy":
    print("Great day for reading! 📚")
else:
    print("Maybe watch a movie? 🎬")`,
      description: "Teach Python how to make decisions!"
    }
  ];

  const handleCodeRun = async (code: string) => {
    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      
      const result = await response.json();
      setOutput(result.output || "Code executed successfully!");
    } catch (error) {
      setOutput("Error executing code");
    }
  };

  const loadExample = (example: typeof codeExamples[0]) => {
    setActiveExample(example.code);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <i className="fas fa-arrow-left mr-2"></i>
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-full flex items-center justify-center">
                  <i className="fas fa-play text-white text-lg"></i>
                </div>
                <h1 className="text-2xl font-heading text-gray-800">Code Playground</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge className="gradient-sunny text-white">
                <i className="fas fa-flask mr-1"></i>
                Experiment Freely
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <Card className="gradient-coral text-white rounded-3xl p-8 mb-8 relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-center">
              <h1 className="text-4xl font-heading mb-4">Python Playground 🎮</h1>
              <p className="text-xl opacity-90 mb-6">
                Experiment, play, and create amazing things with Python! No limits, just fun coding!
              </p>
              <div className="flex justify-center space-x-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center space-x-2">
                  <i className="fas fa-rocket text-[#FECA57]"></i>
                  <span className="font-semibold">Safe Environment</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center space-x-2">
                  <i className="fas fa-save text-[#FECA57]"></i>
                  <span className="font-semibold">Auto-Save</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center space-x-2">
                  <i className="fas fa-share text-[#FECA57]"></i>
                  <span className="font-semibold">Share Code</span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-4 right-4 text-6xl opacity-20">🐍</div>
          <div className="absolute bottom-4 left-4 text-4xl opacity-20">💻</div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Code Examples Sidebar */}
          <div className="lg:col-span-1">
            <Card className="rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-heading text-gray-800 flex items-center">
                  <i className="fas fa-lightbulb text-[#FECA57] mr-2"></i>
                  Code Examples
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {codeExamples.map((example) => (
                  <div
                    key={example.id}
                    className="p-3 border rounded-xl hover:bg-gray-50 cursor-pointer transition-colors duration-200 hover-lift"
                    onClick={() => loadExample(example)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 gradient-turquoise rounded-full flex items-center justify-center flex-shrink-0">
                        <i className={`${example.icon} text-white text-sm`}></i>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800 text-sm">{example.name}</h4>
                        <p className="text-gray-600 text-xs mt-1">{example.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card className="rounded-2xl shadow-lg mt-6">
              <CardHeader>
                <CardTitle className="text-lg font-heading text-gray-800 flex items-center">
                  <i className="fas fa-magic text-[#FF9FF3] mr-2"></i>
                  Coding Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <span className="text-[#4ECDC4] font-bold">💡</span>
                    <span className="text-gray-700">Use print() to see what your code does!</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-[#4ECDC4] font-bold">🔧</span>
                    <span className="text-gray-700">Don't forget quotes around text!</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-[#4ECDC4] font-bold">⚡</span>
                    <span className="text-gray-700">Python is case-sensitive: Print ≠ print</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-[#4ECDC4] font-bold">🚀</span>
                    <span className="text-gray-700">Experiment! There's no wrong way to learn</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Editor Area */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="editor" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="editor" className="flex items-center space-x-2">
                  <i className="fas fa-code"></i>
                  <span>Code Editor</span>
                </TabsTrigger>
                <TabsTrigger value="output" className="flex items-center space-x-2">
                  <i className="fas fa-terminal"></i>
                  <span>Output</span>
                </TabsTrigger>
                <TabsTrigger value="help" className="flex items-center space-x-2">
                  <i className="fas fa-question-circle"></i>
                  <span>Help</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="editor">
                <Card className="rounded-2xl shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-heading text-gray-800">
                        Write Your Python Code
                      </CardTitle>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <i className="fas fa-save mr-1"></i>Save
                        </Button>
                        <Button size="sm" variant="outline">
                          <i className="fas fa-share mr-1"></i>Share
                        </Button>
                        <Button size="sm" variant="outline">
                          <i className="fas fa-redo mr-1"></i>Clear
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CodeEditor
                      initialCode={activeExample || "# Welcome to the Python Playground!\n# Write your code here and click Run to see what happens!\n\nprint('Hello, Python Playground!')\n"}
                      onRun={handleCodeRun}
                      height="500px"
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="output">
                <Card className="rounded-2xl shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-heading text-gray-800 flex items-center">
                      <i className="fas fa-terminal text-[#96CEB4] mr-2"></i>
                      Code Output
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm min-h-[400px] overflow-auto">
                      {output || (
                        <div className="text-gray-500 text-center mt-20">
                          <i className="fas fa-play-circle text-4xl mb-4"></i>
                          <p>Run your code to see the magical results here!</p>
                          <p className="text-xs mt-2">Tip: Switch to the Code Editor tab and click the Run button</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="help">
                <Card className="rounded-2xl shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-heading text-gray-800 flex items-center">
                      <i className="fas fa-question-circle text-[#FF6B6B] mr-2"></i>
                      Need Help?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="bg-blue-50 border-l-4 border-[#45B7D1]">
                          <CardContent className="p-4">
                            <h4 className="font-bold text-[#45B7D1] mb-2">Getting Started</h4>
                            <ul className="text-sm text-gray-700 space-y-1">
                              <li>• Click on code examples to load them</li>
                              <li>• Write code in the editor</li>
                              <li>• Press the Run button to execute</li>
                              <li>• Check the Output tab to see results</li>
                            </ul>
                          </CardContent>
                        </Card>

                        <Card className="bg-green-50 border-l-4 border-[#96CEB4]">
                          <CardContent className="p-4">
                            <h4 className="font-bold text-[#96CEB4] mb-2">Basic Commands</h4>
                            <ul className="text-sm text-gray-700 space-y-1">
                              <li>• <code>print("text")</code> - Show text</li>
                              <li>• <code>name = "Alex"</code> - Store text</li>
                              <li>• <code>age = 10</code> - Store numbers</li>
                              <li>• <code>if age {'>'} 8:</code> - Make decisions</li>
                            </ul>
                          </CardContent>
                        </Card>

                        <Card className="bg-yellow-50 border-l-4 border-[#FECA57]">
                          <CardContent className="p-4">
                            <h4 className="font-bold text-[#FECA57] mb-2">Common Mistakes</h4>
                            <ul className="text-sm text-gray-700 space-y-1">
                              <li>• Forgetting quotes around text</li>
                              <li>• Using Print instead of print</li>
                              <li>• Missing colons after if statements</li>
                              <li>• Incorrect indentation</li>
                            </ul>
                          </CardContent>
                        </Card>

                        <Card className="bg-purple-50 border-l-4 border-[#FF9FF3]">
                          <CardContent className="p-4">
                            <h4 className="font-bold text-[#FF9FF3] mb-2">Fun Ideas to Try</h4>
                            <ul className="text-sm text-gray-700 space-y-1">
                              <li>• Create a greeting with your name</li>
                              <li>• Build a simple calculator</li>
                              <li>• Make a guessing game</li>
                              <li>• Write a story with variables</li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="text-center">
                        <h3 className="text-lg font-heading text-gray-800 mb-4">Still Need Help?</h3>
                        <div className="flex justify-center space-x-4">
                          <Button className="gradient-turquoise text-white">
                            <i className="fas fa-robot mr-2"></i>
                            Ask Study Buddy
                          </Button>
                          <Button variant="outline">
                            <i className="fas fa-book mr-2"></i>
                            Python Guide
                          </Button>
                          <Button variant="outline">
                            <i className="fas fa-users mr-2"></i>
                            Community Forum
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
