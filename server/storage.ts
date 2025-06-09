import { 
  students, courses, lessons, progress, challenges, achievements,
  type Student, type Course, type Lesson, type Progress, type Challenge, type Achievement,
  type InsertStudent, type InsertCourse, type InsertLesson, type InsertProgress, type InsertChallenge, type InsertAchievement 
} from "@shared/schema";

export interface IStorage {
  // Student operations
  getStudent(id: number): Promise<Student | undefined>;
  getStudentByUsername(username: string): Promise<Student | undefined>;
  createStudent(student: InsertStudent): Promise<Student>;
  updateStudent(id: number, updates: Partial<Student>): Promise<Student>;
  
  // Course operations
  getAllCourses(): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  
  // Lesson operations
  getLessonsByCourse(courseId: number): Promise<Lesson[]>;
  getLesson(id: number): Promise<Lesson | undefined>;
  createLesson(lesson: InsertLesson): Promise<Lesson>;
  
  // Progress operations
  getStudentProgress(studentId: number): Promise<Progress[]>;
  getStudentCourseProgress(studentId: number, courseId: number): Promise<Progress[]>;
  createProgress(progress: InsertProgress): Promise<Progress>;
  updateProgress(id: number, updates: Partial<Progress>): Promise<Progress>;
  
  // Challenge operations
  getAllChallenges(): Promise<Challenge[]>;
  getDailyChallenge(): Promise<Challenge | undefined>;
  createChallenge(challenge: InsertChallenge): Promise<Challenge>;
  
  // Achievement operations
  getAllAchievements(): Promise<Achievement[]>;
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;
}

export class MemStorage implements IStorage {
  private students: Map<number, Student> = new Map();
  private courses: Map<number, Course> = new Map();
  private lessons: Map<number, Lesson> = new Map();
  private progressRecords: Map<number, Progress> = new Map();
  private challenges: Map<number, Challenge> = new Map();
  private achievements: Map<number, Achievement> = new Map();
  
  private currentStudentId = 1;
  private currentCourseId = 1;
  private currentLessonId = 1;
  private currentProgressId = 1;
  private currentChallengeId = 1;
  private currentAchievementId = 1;

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Create sample student
    const student: Student = {
      id: 1,
      name: "Alex Kim",
      username: "alex_kim",
      currentWeek: 3,
      totalPoints: 1250,
      streakDays: 7,
      level: 3,
      achievements: ["first_steps", "variable_master", "decision_maker"],
      createdAt: new Date(),
    };
    this.students.set(1, student);
    this.currentStudentId = 2;

    // Create 12-week course structure
    const coursesData = [
      { title: "Hello Python!", description: "Basic syntax & your first program", weekNumber: 1, totalLessons: 5, isLocked: false },
      { title: "Data Types", description: "Numbers, strings & variables", weekNumber: 2, totalLessons: 4, isLocked: false },
      { title: "Conditions", description: "If statements & decision making", weekNumber: 3, totalLessons: 5, isLocked: false },
      { title: "Loops", description: "Repeating actions with for & while", weekNumber: 4, totalLessons: 6, isLocked: true },
      { title: "Functions", description: "Creating reusable code blocks", weekNumber: 5, totalLessons: 5, isLocked: true },
      { title: "Lists", description: "Storing multiple items together", weekNumber: 6, totalLessons: 4, isLocked: true },
      { title: "Dictionaries", description: "Key-value data storage", weekNumber: 7, totalLessons: 4, isLocked: true },
      { title: "File Handling", description: "Reading and writing files", weekNumber: 8, totalLessons: 3, isLocked: true },
      { title: "Error Handling", description: "Dealing with mistakes gracefully", weekNumber: 9, totalLessons: 3, isLocked: true },
      { title: "Libraries", description: "Using other people's code", weekNumber: 10, totalLessons: 4, isLocked: true },
      { title: "Project Time", description: "Building your own programs", weekNumber: 11, totalLessons: 3, isLocked: true },
      { title: "Showcase", description: "Share your creations!", weekNumber: 12, totalLessons: 2, isLocked: true },
    ];

    coursesData.forEach((courseData, index) => {
      const course: Course = {
        id: index + 1,
        ...courseData,
      };
      this.courses.set(course.id, course);
    });
    this.currentCourseId = 13;

    // Create sample lessons for first 3 weeks
    const lessonsData = [
      // Week 1 - Hello Python
      { courseId: 1, title: "What is Python?", description: "Introduction to programming", content: "Python is a friendly programming language that helps us talk to computers!", sampleCode: 'print("Hello, World!")', expectedOutput: "Hello, World!", lessonNumber: 1, points: 50 },
      { courseId: 1, title: "Your First Program", description: "Writing your first Python code", content: "Let's write our very first Python program together!", sampleCode: 'print("I am learning Python!")', expectedOutput: "I am learning Python!", lessonNumber: 2, points: 50 },
      { courseId: 1, title: "Print Commands", description: "Making Python talk to us", content: "The print() function is how we make Python show us messages!", sampleCode: 'print("Python is awesome!")\nprint("I love coding!")', expectedOutput: "Python is awesome!\nI love coding!", lessonNumber: 3, points: 50 },
      
      // Week 2 - Data Types
      { courseId: 2, title: "Numbers in Python", description: "Working with numbers", content: "Python can work with whole numbers (integers) and decimal numbers (floats)!", sampleCode: 'age = 10\nheight = 4.5\nprint("Age:", age)\nprint("Height:", height)', expectedOutput: "Age: 10\nHeight: 4.5", lessonNumber: 1, points: 50 },
      { courseId: 2, title: "Text and Strings", description: "Working with words", content: "Strings are how we store text in Python. Always put text in quotes!", sampleCode: 'name = "Alex"\nfavorite_color = "blue"\nprint("My name is", name)\nprint("My favorite color is", favorite_color)', expectedOutput: "My name is Alex\nMy favorite color is blue", lessonNumber: 2, points: 50 },
      
      // Week 3 - Conditions
      { courseId: 3, title: "True or False", description: "Understanding boolean values", content: "In Python, things can be either True or False. This helps us make decisions!", sampleCode: 'is_sunny = True\nis_raining = False\nprint("Is it sunny?", is_sunny)\nprint("Is it raining?", is_raining)', expectedOutput: "Is it sunny? True\nIs it raining? False", lessonNumber: 1, points: 50 },
      { courseId: 3, title: "If Statements", description: "Making decisions in code", content: "If statements let us tell Python to do different things based on conditions!", sampleCode: 'age = 10\nif age >= 8:\n    print("You can ride the roller coaster!")\nelse:\n    print("You need to grow a bit more!")', expectedOutput: "You can ride the roller coaster!", lessonNumber: 2, points: 75 },
      { courseId: 3, title: "Comparing Things", description: "Using comparison operators", content: "Python can compare numbers and text using special symbols like ==, >, <, >=, <=", sampleCode: 'score = 85\nif score >= 90:\n    print("Excellent!")\nelif score >= 80:\n    print("Great job!")\nelse:\n    print("Keep practicing!")', expectedOutput: "Great job!", lessonNumber: 3, points: 75 },
      { courseId: 3, title: "Multiple Conditions", description: "Using and, or operators", content: "Sometimes we need to check multiple things at once using 'and' and 'or'!", sampleCode: 'weather = "sunny"\ntemperature = 75\n\nif weather == "sunny" and temperature > 70:\n    print("Perfect day for the park!")\nelse:\n    print("Maybe stay inside today")', expectedOutput: "Perfect day for the park!", lessonNumber: 4, points: 100 },
      { courseId: 3, title: "Decision Making Practice", description: "Putting it all together", content: "Let's practice making complex decisions with if statements!", sampleCode: 'favorite_food = "pizza"\nhungry = True\n\nif hungry and favorite_food == "pizza":\n    print("Let\'s order pizza!")\nelif hungry:\n    print("Let\'s find something to eat")\nelse:\n    print("I\'m not hungry right now")', expectedOutput: "Let's order pizza!", lessonNumber: 5, points: 100 },
      
      // Week 4 - Loops  
      { courseId: 4, title: "What are Loops?", description: "Introduction to repetition", content: "Loops help us repeat actions without writing the same code over and over!", sampleCode: 'for i in range(5):\n    print("Python is fun!")', expectedOutput: "Python is fun!\nPython is fun!\nPython is fun!\nPython is fun!\nPython is fun!", lessonNumber: 1, points: 75 },
      { courseId: 4, title: "Counting with For Loops", description: "Using for loops to count", content: "For loops are great for counting and doing something a specific number of times!", sampleCode: 'for number in range(1, 6):\n    print("Count:", number)', expectedOutput: "Count: 1\nCount: 2\nCount: 3\nCount: 4\nCount: 5", lessonNumber: 2, points: 75 },
      { courseId: 4, title: "While Loops", description: "Loops that keep going while something is true", content: "While loops continue as long as a condition stays true!", sampleCode: 'countdown = 5\nwhile countdown > 0:\n    print("Countdown:", countdown)\n    countdown = countdown - 1\nprint("Blast off!")', expectedOutput: "Countdown: 5\nCountdown: 4\nCountdown: 3\nCountdown: 2\nCountdown: 1\nBlast off!", lessonNumber: 3, points: 100 },
    ];

    lessonsData.forEach((lessonData, index) => {
      const lesson: Lesson = {
        id: index + 1,
        ...lessonData,
      };
      this.lessons.set(lesson.id, lesson);
    });
    this.currentLessonId = lessonsData.length + 1;

    // Create sample progress
    const progressData = [
      { studentId: 1, courseId: 1, lessonId: 1, completed: true, completedAt: new Date(), codeSubmitted: 'print("Hello, World!")' },
      { studentId: 1, courseId: 1, lessonId: 2, completed: true, completedAt: new Date(), codeSubmitted: 'print("I am learning Python!")' },
      { studentId: 1, courseId: 2, lessonId: 4, completed: true, completedAt: new Date(), codeSubmitted: 'age = 10\nprint("Age:", age)' },
      { studentId: 1, courseId: 3, lessonId: 6, completed: false, completedAt: null, codeSubmitted: null },
    ];

    progressData.forEach((progressItem, index) => {
      const progressRecord: Progress = {
        id: index + 1,
        ...progressItem,
      };
      this.progressRecords.set(progressRecord.id, progressRecord);
    });
    this.currentProgressId = progressData.length + 1;

    // Create sample challenges
    const challengesData = [
      { title: "Age Group Classifier", description: "Write a program that tells someone if they're a kid, teen, or adult based on their age!", difficulty: "Easy", points: 150, sampleCode: 'age = int(input("How old are you? "))\n# Your code here', solution: 'age = int(input("How old are you? "))\nif age < 13:\n    print("You are a kid!")\nelif age < 20:\n    print("You are a teen!")\nelse:\n    print("You are an adult!")', isDaily: true },
      { title: "Number Guesser", description: "Create a simple guessing game!", difficulty: "Medium", points: 200, sampleCode: 'secret_number = 7\n# Your code here', solution: 'secret_number = 7\nguess = int(input("Guess a number: "))\nif guess == secret_number:\n    print("Correct!")\nelse:\n    print("Try again!")', isDaily: false },
    ];

    challengesData.forEach((challengeData, index) => {
      const challenge: Challenge = {
        id: index + 1,
        ...challengeData,
      };
      this.challenges.set(challenge.id, challenge);
    });
    this.currentChallengeId = challengesData.length + 1;

    // Create sample achievements
    const achievementsData = [
      { name: "First Steps", description: "Completed your first lesson", icon: "fas fa-rocket", points: 50, condition: "complete_first_lesson" },
      { name: "Variable Master", description: "Created 10 variables", icon: "fas fa-database", points: 100, condition: "create_10_variables" },
      { name: "Decision Maker", description: "Used 5 if statements", icon: "fas fa-question-circle", points: 75, condition: "use_5_if_statements" },
      { name: "Loop Hero", description: "Create your first loop", icon: "fas fa-sync", points: 100, condition: "create_first_loop" },
      { name: "Problem Solver", description: "Solve 10 challenges", icon: "fas fa-puzzle-piece", points: 200, condition: "solve_10_challenges" },
      { name: "Python Expert", description: "Complete the course", icon: "fas fa-star", points: 500, condition: "complete_course" },
    ];

    achievementsData.forEach((achievementData, index) => {
      const achievement: Achievement = {
        id: index + 1,
        ...achievementData,
      };
      this.achievements.set(achievement.id, achievement);
    });
    this.currentAchievementId = achievementsData.length + 1;
  }

  // Student operations
  async getStudent(id: number): Promise<Student | undefined> {
    return this.students.get(id);
  }

  async getStudentByUsername(username: string): Promise<Student | undefined> {
    return Array.from(this.students.values()).find(student => student.username === username);
  }

  async createStudent(insertStudent: InsertStudent): Promise<Student> {
    const student: Student = {
      ...insertStudent,
      id: this.currentStudentId++,
      currentWeek: insertStudent.currentWeek ?? 1,
      totalPoints: insertStudent.totalPoints ?? 0,
      streakDays: insertStudent.streakDays ?? 0,
      level: insertStudent.level ?? 1,
      achievements: insertStudent.achievements as string[] ?? [],
      createdAt: new Date(),
    };
    this.students.set(student.id, student);
    return student;
  }

  async updateStudent(id: number, updates: Partial<Student>): Promise<Student> {
    const student = this.students.get(id);
    if (!student) throw new Error('Student not found');
    
    const updatedStudent = { ...student, ...updates };
    this.students.set(id, updatedStudent);
    return updatedStudent;
  }

  // Course operations
  async getAllCourses(): Promise<Course[]> {
    return Array.from(this.courses.values()).sort((a, b) => a.weekNumber - b.weekNumber);
  }

  async getCourse(id: number): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const course: Course = {
      ...insertCourse,
      id: this.currentCourseId++,
      isLocked: insertCourse.isLocked ?? false,
    };
    this.courses.set(course.id, course);
    return course;
  }

  // Lesson operations
  async getLessonsByCourse(courseId: number): Promise<Lesson[]> {
    return Array.from(this.lessons.values())
      .filter(lesson => lesson.courseId === courseId)
      .sort((a, b) => a.lessonNumber - b.lessonNumber);
  }

  async getLesson(id: number): Promise<Lesson | undefined> {
    return this.lessons.get(id);
  }

  async createLesson(insertLesson: InsertLesson): Promise<Lesson> {
    const lesson: Lesson = {
      ...insertLesson,
      id: this.currentLessonId++,
      sampleCode: insertLesson.sampleCode ?? null,
      expectedOutput: insertLesson.expectedOutput ?? null,
      points: insertLesson.points ?? 50,
    };
    this.lessons.set(lesson.id, lesson);
    return lesson;
  }

  // Progress operations
  async getStudentProgress(studentId: number): Promise<Progress[]> {
    return Array.from(this.progressRecords.values()).filter(progress => progress.studentId === studentId);
  }

  async getStudentCourseProgress(studentId: number, courseId: number): Promise<Progress[]> {
    return Array.from(this.progressRecords.values())
      .filter(progress => progress.studentId === studentId && progress.courseId === courseId);
  }

  async createProgress(insertProgress: InsertProgress): Promise<Progress> {
    const progress: Progress = {
      ...insertProgress,
      id: this.currentProgressId++,
      lessonId: insertProgress.lessonId ?? null,
      completed: insertProgress.completed ?? false,
      codeSubmitted: insertProgress.codeSubmitted ?? null,
      completedAt: insertProgress.completed ? new Date() : null,
    };
    this.progressRecords.set(progress.id, progress);
    return progress;
  }

  async updateProgress(id: number, updates: Partial<Progress>): Promise<Progress> {
    const progress = this.progressRecords.get(id);
    if (!progress) throw new Error('Progress not found');
    
    const updatedProgress = { 
      ...progress, 
      ...updates,
      completedAt: updates.completed ? new Date() : progress.completedAt 
    };
    this.progressRecords.set(id, updatedProgress);
    return updatedProgress;
  }

  // Challenge operations
  async getAllChallenges(): Promise<Challenge[]> {
    return Array.from(this.challenges.values());
  }

  async getDailyChallenge(): Promise<Challenge | undefined> {
    return Array.from(this.challenges.values()).find(challenge => challenge.isDaily);
  }

  async createChallenge(insertChallenge: InsertChallenge): Promise<Challenge> {
    const challenge: Challenge = {
      ...insertChallenge,
      id: this.currentChallengeId++,
      sampleCode: insertChallenge.sampleCode ?? null,
      solution: insertChallenge.solution ?? null,
      isDaily: insertChallenge.isDaily ?? false,
    };
    this.challenges.set(challenge.id, challenge);
    return challenge;
  }

  // Achievement operations
  async getAllAchievements(): Promise<Achievement[]> {
    return Array.from(this.achievements.values());
  }

  async createAchievement(insertAchievement: InsertAchievement): Promise<Achievement> {
    const achievement: Achievement = {
      ...insertAchievement,
      id: this.currentAchievementId++,
    };
    this.achievements.set(achievement.id, achievement);
    return achievement;
  }
}

export const storage = new MemStorage();
