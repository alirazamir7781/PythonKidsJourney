import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import CodeEditor from "@/components/code-editor";
import { useState } from "react";
import type { Lesson, Course } from "@shared/schema";

export default function LessonPage() {
  const [, params] = useRoute("/lesson/:id");
  const lessonId = params?.id ? parseInt(params.id) : 0;
  const [codeOutput, setCodeOutput] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const { data: lesson, isLoading: lessonLoading } = useQuery<Lesson>({
    queryKey: [`/api/lessons/${lessonId}`]
  });

  const { data: course } = useQuery<Course>({
    queryKey: [`/api/courses/${lesson?.courseId}`],
    enabled: !!lesson?.courseId
  });

  const handleCodeRun = async (code: string) => {
    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, lessonId })
      });
      
      const result = await response.json();
      setCodeOutput(result.output);
      
      // Check if lesson is completed based on code execution
      if (!result.hasError && code.includes('if') && code.includes('print')) {
        setIsCompleted(true);
      }
    } catch (error) {
      setCodeOutput("Error executing code");
    }
  };

  if (lessonLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Skeleton className="h-20 w-full mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="h-96 w-full" />
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex items-center justify-center">
        <Card className="p-8 text-center">
          <CardContent>
            <h1 className="text-2xl font-heading text-gray-800 mb-4">Lesson Not Found</h1>
            <p className="text-gray-600 mb-4">The lesson you're looking for doesn't exist.</p>
            <Link href="/dashboard">
              <Button className="gradient-coral text-white">Back to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

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
                  <i className="fas fa-code text-white text-lg"></i>
                </div>
                <h1 className="text-2xl font-heading text-gray-800">PythonKids</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {course && (
                <Badge variant="outline" className="gradient-turquoise text-white border-none">
                  Week {course.weekNumber}: {course.title}
                </Badge>
              )}
              <Badge variant="outline" className="gradient-sunny text-white border-none">
                Lesson {lesson.lessonNumber}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Lesson Header */}
        <Card className="rounded-3xl shadow-xl mb-8 overflow-hidden">
          <div className="gradient-coral text-white p-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-heading mb-2">{lesson.title}</h1>
                <p className="text-xl opacity-90">{lesson.description}</p>
              </div>
              <div className="text-right">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="font-bold">Lesson {lesson.lessonNumber}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Lesson Progress</span>
                <span className="font-bold">{isCompleted ? '100%' : '0%'}</span>
              </div>
              <Progress value={isCompleted ? 100 : 0} className="h-2" />
            </div>
          </div>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Instruction Panel */}
          <div className="space-y-6">
            <Card className="rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-heading text-gray-800 flex items-center">
                  <i className="fas fa-book-open text-[#4ECDC4] mr-2"></i>
                  Learn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed">{lesson.content}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-l-4 border-[#45B7D1] rounded-2xl">
              <CardContent className="p-6">
                <h3 className="font-bold text-[#45B7D1] mb-3 flex items-center">
                  <i className="fas fa-lightbulb mr-2"></i>
                  Example Code
                </h3>
                {lesson.sampleCode && (
                  <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-gray-100 whitespace-pre-wrap">{lesson.sampleCode}</pre>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="gradient-sunny text-white rounded-2xl">
              <CardContent className="p-6">
                <h3 className="font-bold mb-3 flex items-center">
                  <i className="fas fa-target mr-2"></i>
                  Expected Output
                </h3>
                {lesson.expectedOutput && (
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 font-mono text-sm">
                    <pre className="whitespace-pre-wrap">{lesson.expectedOutput}</pre>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="gradient-mint text-white rounded-2xl">
              <CardContent className="p-6">
                <h3 className="font-bold mb-3 flex items-center">
                  <i className="fas fa-star mr-2"></i>
                  Points Reward
                </h3>
                <div className="flex items-center justify-between">
                  <span>Complete this lesson to earn:</span>
                  <span className="text-2xl font-bold">+{lesson.points} points</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Code Editor Panel */}
          <div className="space-y-6">
            <Card className="rounded-2xl shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-heading text-gray-800 flex items-center">
                    <i className="fas fa-code text-[#FF6B6B] mr-2"></i>
                    Try It Yourself!
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <i className="fas fa-copy mr-1"></i>Copy Example
                    </Button>
                    <Button size="sm" variant="outline">
                      <i className="fas fa-redo mr-1"></i>Reset
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CodeEditor
                  initialCode={lesson.sampleCode || "# Write your code here\n"}
                  onRun={handleCodeRun}
                  height="300px"
                />
              </CardContent>
            </Card>

            {/* Output Panel */}
            <Card className="rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-heading text-gray-800 flex items-center">
                  <i className="fas fa-terminal text-[#96CEB4] mr-2"></i>
                  Output
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm min-h-[100px] overflow-auto">
                  {codeOutput || (
                    <div className="text-gray-500">
                      Run your code to see the output here...
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Success Message */}
            {isCompleted && (
              <Card className="gradient-mint text-white rounded-2xl border-4 border-white">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">🎉</div>
                  <h3 className="text-xl font-bold mb-2">Congratulations!</h3>
                  <p className="mb-4">You've successfully completed this lesson!</p>
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <i className="fas fa-star text-[#FECA57]"></i>
                    <span className="font-bold">+{lesson.points} points earned!</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Navigation */}
        <Card className="rounded-2xl shadow-lg mt-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <Button variant="outline" className="flex items-center space-x-2">
                <i className="fas fa-arrow-left"></i>
                <span>Previous Lesson</span>
              </Button>

              <div className="flex items-center space-x-4">
                <Button variant="outline">
                  <i className="fas fa-bookmark mr-2"></i>
                  Save for Later
                </Button>
                
                {isCompleted ? (
                  <Button className="gradient-turquoise text-white hover-lift">
                    Next Lesson <i className="fas fa-arrow-right ml-2"></i>
                  </Button>
                ) : (
                  <Button disabled className="bg-gray-300 text-gray-500">
                    Complete lesson to continue
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
