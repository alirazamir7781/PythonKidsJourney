import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import CodeEditor from "@/components/code-editor";
import ProgressRing from "@/components/progress-ring";
import AchievementNotification from "@/components/achievement-notification";
import { useState, useEffect } from "react";
import type { Student, Course, Progress as StudentProgress, Challenge } from "@shared/schema";

export default function Dashboard() {
  const [showAchievement, setShowAchievement] = useState(false);
  const [achievementData, setAchievementData] = useState<{title: string, description: string, points: number} | null>(null);

  const { data: student, isLoading: studentLoading } = useQuery<Student>({
    queryKey: ['/api/students/username/alex_kim']
  });

  const { data: courses, isLoading: coursesLoading } = useQuery<Course[]>({
    queryKey: ['/api/courses']
  });

  const { data: progress, isLoading: progressLoading } = useQuery<StudentProgress[]>({
    queryKey: ['/api/students/1/progress']
  });

  const { data: dailyChallenge } = useQuery<Challenge>({
    queryKey: ['/api/challenges/daily']
  });

  const currentLesson = {
    id: 7,
    title: "Making Decisions",
    description: "Learn how to use if statements to make your programs smart!",
    weekNumber: 3,
    lessonNumber: 2,
    totalLessons: 5
  };

  const sampleCode = `# Ask the user their age
age = int(input("How old are you? "))

# Check if they can ride the roller coaster
if age >= 8:
    print("You can ride the roller coaster! 🎢")
else:
    print("You need to grow a bit more! 🌱")`;

  const handleCodeRun = () => {
    // Simulate achievement unlock
    setTimeout(() => {
      setAchievementData({
        title: "Condition Master!",
        description: "You wrote your first if-else statement!",
        points: 75
      });
      setShowAchievement(true);
    }, 1000);
  };

  if (studentLoading || coursesLoading || progressLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-64 w-full rounded-3xl mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Skeleton className="h-96 w-full rounded-3xl" />
              <Skeleton className="h-64 w-full rounded-3xl" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-64 w-full rounded-2xl" />
              <Skeleton className="h-48 w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!student) {
    return <div>Student not found</div>;
  }

  const overallProgress = Math.round((student.currentWeek - 1) / 12 * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-full flex items-center justify-center pulse-slow">
                  <i className="fas fa-code text-white text-lg"></i>
                </div>
                <h1 className="text-2xl font-heading text-gray-800">PythonKids</h1>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <Link href="/dashboard" className="text-gray-700 hover:text-[#FF6B6B] transition-colors duration-200 font-semibold">Dashboard</Link>
              <Link href="#lessons" className="text-gray-700 hover:text-[#FF6B6B] transition-colors duration-200 font-semibold">Lessons</Link>
              <Link href="/playground" className="text-gray-700 hover:text-[#FF6B6B] transition-colors duration-200 font-semibold">Playground</Link>
              <Link href="#achievements" className="text-gray-700 hover:text-[#FF6B6B] transition-colors duration-200 font-semibold">Achievements</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <ProgressRing percentage={overallProgress} level={student.level} />
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF9FF3] to-[#FF6B6B] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <span className="hidden sm:block text-gray-700 font-semibold">{student.name.split(' ')[0]} K.</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <Card className="gradient-coral text-white rounded-3xl p-8 mb-8 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="lg:w-2/3 mb-6 lg:mb-0">
                <h2 className="text-4xl font-heading mb-4">Welcome back, {student.name.split(' ')[0]}! 🎉</h2>
                <p className="text-xl mb-6 opacity-90">Ready to continue your Python adventure? You're doing amazing!</p>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center space-x-2">
                    <i className="fas fa-fire text-[#FECA57]"></i>
                    <span className="font-semibold">{student.streakDays} day streak!</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center space-x-2">
                    <i className="fas fa-star text-[#FECA57]"></i>
                    <span className="font-semibold">{student.totalPoints.toLocaleString()} points</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center space-x-2">
                    <i className="fas fa-trophy text-[#FECA57]"></i>
                    <span className="font-semibold">{student.achievements.length} badges</span>
                  </div>
                </div>

                <Link href={`/lesson/${currentLesson.id}`}>
                  <Button className="bg-white text-[#FF6B6B] font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-all duration-200 hover-lift">
                    Continue Learning <i className="fas fa-arrow-right ml-2"></i>
                  </Button>
                </Link>
              </div>
              
              <div className="lg:w-1/3 flex justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1516542076529-1ea3854896f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400" 
                  alt="Python mascot character" 
                  className="w-64 h-64 object-cover rounded-full bounce-gentle" 
                />
              </div>
            </div>
          </div>
          
          <div className="absolute top-4 right-4 text-6xl opacity-20">🐍</div>
          <div className="absolute bottom-4 left-4 text-4xl opacity-20 wiggle">💻</div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Progress */}
            <Card className="rounded-3xl shadow-xl mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-heading text-gray-800">Your Python Journey</CardTitle>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <i className="fas fa-calendar-alt"></i>
                    <span>Week {student.currentWeek} of 12</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-8">
                  <Progress value={overallProgress} className="h-4" />
                  <p className="text-sm text-gray-600 mt-2">{overallProgress}% Complete</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {courses?.slice(0, 6).map((course, index) => {
                    const isCompleted = course.weekNumber < student.currentWeek;
                    const isCurrent = course.weekNumber === student.currentWeek;
                    const isLocked = course.weekNumber > student.currentWeek;
                    
                    let cardClass = "rounded-xl p-4 text-white relative overflow-hidden hover-lift cursor-pointer ";
                    if (isCompleted) {
                      cardClass += "gradient-mint";
                    } else if (isCurrent) {
                      cardClass += "gradient-sunny ring-4 ring-white ring-opacity-50";
                    } else {
                      cardClass += "bg-gray-300 text-gray-600 cursor-not-allowed";
                    }

                    return (
                      <Card key={course.id} className={cardClass}>
                        <div className="absolute top-2 right-2">
                          {isCompleted && <i className="fas fa-check-circle text-2xl"></i>}
                          {isCurrent && <i className="fas fa-play-circle text-2xl animate-pulse"></i>}
                          {isLocked && <i className="fas fa-lock text-xl"></i>}
                        </div>
                        <div className="mb-2">
                          <span className="text-sm opacity-80">
                            Week {course.weekNumber}{isCurrent ? " - Current" : ""}
                          </span>
                          <h4 className="font-bold text-lg">{course.title}</h4>
                        </div>
                        <p className="text-sm opacity-90">{course.description}</p>
                        <div className="mt-3 flex items-center justify-between">
                          {isLocked ? (
                            <Badge variant="secondary" className="bg-gray-400 text-white">Locked</Badge>
                          ) : (
                            <>
                              <Badge variant="secondary" className="bg-white/20">
                                {isCompleted ? course.totalLessons : Math.floor(course.totalLessons * 0.4)}/{course.totalLessons} lessons
                              </Badge>
                              <span className="text-xs">
                                {isCompleted ? "100%" : isCurrent ? "40%" : "0%"}
                              </span>
                            </>
                          )}
                        </div>
                      </Card>
                    );
                  })}
                </div>

                <div className="mt-6 text-center">
                  <p className="text-gray-600 text-sm mb-4">Complete Week {student.currentWeek} to unlock more adventures!</p>
                  <Link href={`/lesson/${currentLesson.id}`}>
                    <Button className="gradient-coral text-white font-bold py-3 px-8 rounded-full hover-lift">
                      Continue Current Lesson <i className="fas fa-arrow-right ml-2"></i>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Current Lesson Preview */}
            <Card className="rounded-3xl shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-heading text-gray-800">
                      Lesson {currentLesson.weekNumber}.{currentLesson.lessonNumber}: {currentLesson.title}
                    </CardTitle>
                    <p className="text-gray-600">{currentLesson.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 gradient-mint rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{currentLesson.lessonNumber}</span>
                    </div>
                    <span className="text-gray-600">of {currentLesson.totalLessons}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Card className="bg-blue-50 border-l-4 border-[#45B7D1]">
                      <CardContent className="p-4">
                        <h4 className="font-bold text-[#45B7D1] mb-2 flex items-center">
                          <i className="fas fa-lightbulb mr-2"></i>
                          What you'll learn:
                        </h4>
                        <p className="text-gray-700 text-sm">
                          How to ask Python to check if something is true or false, and do different things based on the answer!
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="gradient-sunny text-white">
                      <CardContent className="p-4">
                        <h4 className="font-bold mb-3 flex items-center">
                          <i className="fas fa-rocket mr-2"></i>
                          Try this example:
                        </h4>
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 font-mono text-sm">
                          <div className="text-gray-200"># Ask the user their age</div>
                          <div>age = int(input("How old are you? "))</div>
                          <div>if age {'>'}= 8:</div>
                          <div className="ml-4">print("You can ride! 🎢")</div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex space-x-2">
                      <Button className="flex-1 gradient-mint text-white">
                        <i className="fas fa-copy mr-2"></i>Copy Code
                      </Button>
                      <Button className="flex-1 gradient-turquoise text-white">
                        <i className="fas fa-question-circle mr-2"></i>Need Help?
                      </Button>
                    </div>
                  </div>

                  <div>
                    <CodeEditor
                      initialCode={sampleCode}
                      onRun={handleCodeRun}
                      height="300px"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                  <Button variant="outline" className="flex items-center space-x-2">
                    <i className="fas fa-arrow-left"></i>
                    <span>Previous Lesson</span>
                  </Button>

                  <div className="flex items-center space-x-4">
                    <Button variant="outline">Save Progress</Button>
                    <Link href={`/lesson/${currentLesson.id}`}>
                      <Button className="gradient-coral text-white hover-lift">
                        Complete Lesson <i className="fas fa-arrow-right ml-2"></i>
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Achievements */}
            <Card className="rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-heading text-gray-800 flex items-center">
                  <i className="fas fa-trophy text-[#FECA57] mr-2"></i>
                  Latest Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-[#96CEB4]/20 to-[#4ECDC4]/20 rounded-xl achievement-glow">
                  <div className="w-12 h-12 gradient-mint rounded-full flex items-center justify-center">
                    <i className="fas fa-code text-white text-lg"></i>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 text-sm">First If Statement!</h4>
                    <p className="text-gray-600 text-xs">Completed your first conditional</p>
                  </div>
                  <div className="text-[#FECA57] text-lg">+50</div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-[#FECA57]/20 to-[#FF9FF3]/20 rounded-xl">
                  <div className="w-12 h-12 gradient-sunny rounded-full flex items-center justify-center">
                    <i className="fas fa-fire text-white text-lg"></i>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 text-sm">Week Warrior</h4>
                    <p className="text-gray-600 text-xs">7 days in a row!</p>
                  </div>
                  <div className="text-[#FECA57] text-lg">+100</div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-[#45B7D1]/20 to-[#FF6B6B]/20 rounded-xl">
                  <div className="w-12 h-12 gradient-turquoise rounded-full flex items-center justify-center">
                    <i className="fas fa-lightbulb text-white text-lg"></i>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 text-sm">Problem Solver</h4>
                    <p className="text-gray-600 text-xs">Solved 5 challenges</p>
                  </div>
                  <div className="text-[#FECA57] text-lg">+75</div>
                </div>

                <Button className="w-full gradient-coral text-white font-bold hover-lift">
                  View All Badges <i className="fas fa-external-link-alt ml-2"></i>
                </Button>
              </CardContent>
            </Card>

            {/* Quick Tools */}
            <Card className="rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-heading text-gray-800 flex items-center">
                  <i className="fas fa-tools text-[#FF6B6B] mr-2"></i>
                  Quick Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/playground">
                  <Button className="w-full gradient-mint text-white font-bold py-3 hover-lift">
                    <i className="fas fa-play-circle mr-2"></i>Code Playground
                  </Button>
                </Link>

                <Button className="w-full gradient-turquoise text-white font-bold py-3 hover-lift">
                  <i className="fas fa-puzzle-piece mr-2"></i>Practice Challenges
                </Button>

                <Button className="w-full gradient-sunny text-white font-bold py-3 hover-lift">
                  <i className="fas fa-question-circle mr-2"></i>Ask for Help
                </Button>

                <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold py-3 hover-lift">
                  <i className="fas fa-book mr-2"></i>Python Dictionary
                </Button>
              </CardContent>
            </Card>

            {/* Daily Challenge */}
            {dailyChallenge && (
              <Card className="gradient-pink rounded-2xl shadow-lg text-white">
                <CardHeader>
                  <CardTitle className="text-xl font-heading flex items-center">
                    <i className="fas fa-star mr-2 text-[#FECA57]"></i>
                    Daily Challenge
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-4">
                    <h4 className="font-bold mb-2">{dailyChallenge.title}</h4>
                    <p className="text-sm opacity-90 mb-3">{dailyChallenge.description}</p>
                    
                    <div className="flex items-center justify-between text-xs">
                      <Badge className="bg-white/20 text-white">Difficulty: {dailyChallenge.difficulty}</Badge>
                      <Badge className="bg-[#FECA57]/80 text-gray-800">+{dailyChallenge.points} points</Badge>
                    </div>
                  </div>

                  <Button className="w-full bg-white text-purple-600 font-bold py-2 hover:bg-gray-100 transition-all duration-200">
                    Start Challenge <i className="fas fa-arrow-right ml-2"></i>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Study Buddy */}
            <Card className="rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-heading text-gray-800 flex items-center">
                  <i className="fas fa-robot text-[#4ECDC4] mr-2"></i>
                  Study Buddy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 gradient-turquoise rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-robot text-white text-sm"></i>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 text-sm mb-2">
                        "Great job on your if statements! Want to try a fun quiz about conditions?"
                      </p>
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-[#4ECDC4] text-white text-xs">Yes!</Button>
                        <Button size="sm" variant="outline" className="text-xs">Later</Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Button variant="link" className="text-[#4ECDC4] font-semibold text-sm">
                    Chat with Buddy <i className="fas fa-comment ml-1"></i>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3">
        <Button className="w-14 h-14 gradient-coral rounded-full shadow-lg text-white hover-lift group">
          <i className="fas fa-question-circle text-xl group-hover:scale-110 transition-transform duration-200"></i>
        </Button>
        
        <Link href="/playground">
          <Button className="w-14 h-14 gradient-sunny rounded-full shadow-lg text-white hover-lift group">
            <i className="fas fa-play text-xl group-hover:scale-110 transition-transform duration-200"></i>
          </Button>
        </Link>
      </div>

      {/* Achievement Notification */}
      {showAchievement && achievementData && (
        <AchievementNotification
          title={achievementData.title}
          description={achievementData.description}
          points={achievementData.points}
          onClose={() => setShowAchievement(false)}
        />
      )}
    </div>
  );
}
