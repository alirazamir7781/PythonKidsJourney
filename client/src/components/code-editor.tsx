import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CodeEditorProps {
  initialCode?: string;
  onRun?: (code: string) => void;
  height?: string;
  readOnly?: boolean;
}

export default function CodeEditor({ 
  initialCode = "", 
  onRun, 
  height = "400px", 
  readOnly = false 
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [isRunning, setIsRunning] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (initialCode !== code) {
      setCode(initialCode);
    }
  }, [initialCode]);

  const handleRun = async () => {
    if (!onRun || isRunning) return;
    
    setIsRunning(true);
    
    // Add visual feedback
    setTimeout(async () => {
      await onRun(code);
      setIsRunning(false);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      
      setCode(newCode);
      
      // Reset cursor position
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  const addLineNumbers = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => (
      <div key={index} className="flex">
        <span className="text-gray-500 select-none w-8 text-right pr-2 text-xs">
          {index + 1}
        </span>
        <span className="flex-1">{line || '\u00A0'}</span>
      </div>
    ));
  };

  return (
    <div className="space-y-4">
      <Card className="code-editor overflow-hidden">
        {/* Editor Header */}
        <div className="bg-gray-800 text-gray-300 p-3 text-xs font-mono">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="ml-2">main.py</span>
            </div>
            
            <div className="flex space-x-2">
              <Button
                size="sm"
                onClick={handleRun}
                disabled={isRunning || readOnly}
                className={`${
                  isRunning 
                    ? 'bg-yellow-500 hover:bg-yellow-600' 
                    : 'bg-[#4ECDC4] hover:bg-[#4ECDC4]/80'
                } text-white font-bold text-xs px-3 py-1`}
              >
                {isRunning ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-1"></i>
                    Running...
                  </>
                ) : (
                  <>
                    <i className="fas fa-play mr-1"></i>
                    Run Code
                  </>
                )}
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCode(initialCode)}
                className="text-xs px-3 py-1"
              >
                <i className="fas fa-redo mr-1"></i>
                Reset
              </Button>
            </div>
          </div>
        </div>

        {/* Editor Content */}
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            readOnly={readOnly}
            className="w-full bg-gray-900 text-gray-100 font-mono text-sm p-4 pl-12 border-none outline-none resize-none leading-6"
            style={{ height }}
            placeholder={readOnly ? "" : "# Write your Python code here...\nprint('Hello, World!')"}
            spellCheck={false}
          />
          
          {/* Line Numbers */}
          <div className="absolute top-0 left-0 bg-gray-800 text-gray-500 font-mono text-sm p-4 pr-2 leading-6 pointer-events-none border-r border-gray-700">
            {code.split('\n').map((_, index) => (
              <div key={index} className="text-right">
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Syntax Highlighting Tips */}
      <Card className="bg-blue-50 border-l-4 border-[#45B7D1]">
        <CardContent className="p-3">
          <div className="flex items-center space-x-2 text-sm">
            <i className="fas fa-info-circle text-[#45B7D1]"></i>
            <span className="text-gray-700">
              <strong>Pro Tip:</strong> Use Tab to indent your code properly. Python cares about spacing!
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
