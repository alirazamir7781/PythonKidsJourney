import { db } from "./db";
import { students, courses, lessons, progress, challenges, achievements } from "@shared/schema";

export async function seedDatabase() {
  try {
    // Check if data already exists
    const existingStudents = await db.select().from(students);
    if (existingStudents.length > 0) {
      console.log("Database already seeded");
      return;
    }

    // Create sample student
    const [student] = await db.insert(students).values({
      name: "Alex Kim",
      username: "alex_kim",
      currentWeek: 3,
      totalPoints: 1250,
      streakDays: 7,
      level: 3,
      achievements: ["first_steps", "variable_master", "decision_maker"],
    }).returning();

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

    const insertedCourses = await db.insert(courses).values(coursesData).returning();

    // Create sample lessons
    const lessonsData = [
      // Week 1 - Hello Python
      { courseId: insertedCourses[0].id, title: "What is Python?", description: "Introduction to programming", content: "Python is a friendly programming language that helps us talk to computers!", sampleCode: 'print("Hello, World!")', expectedOutput: "Hello, World!", lessonNumber: 1, points: 50 },
      { courseId: insertedCourses[0].id, title: "Your First Program", description: "Writing your first Python code", content: "Let's write our very first Python program together!", sampleCode: 'print("I am learning Python!")', expectedOutput: "I am learning Python!", lessonNumber: 2, points: 50 },
      { courseId: insertedCourses[0].id, title: "Print Commands", description: "Making Python talk to us", content: "The print() function is how we make Python show us messages!", sampleCode: 'print("Python is awesome!")\nprint("I love coding!")', expectedOutput: "Python is awesome!\nI love coding!", lessonNumber: 3, points: 50 },
      
      // Week 2 - Data Types
      { courseId: insertedCourses[1].id, title: "Numbers in Python", description: "Working with numbers", content: "Python can work with whole numbers (integers) and decimal numbers (floats)!", sampleCode: 'age = 10\nheight = 4.5\nprint("Age:", age)\nprint("Height:", height)', expectedOutput: "Age: 10\nHeight: 4.5", lessonNumber: 1, points: 50 },
      { courseId: insertedCourses[1].id, title: "Text and Strings", description: "Working with words", content: "Strings are how we store text in Python. Always put text in quotes!", sampleCode: 'name = "Alex"\nfavorite_color = "blue"\nprint("My name is", name)\nprint("My favorite color is", favorite_color)', expectedOutput: "My name is Alex\nMy favorite color is blue", lessonNumber: 2, points: 50 },
      
      // Week 3 - Conditions
      { courseId: insertedCourses[2].id, title: "True or False", description: "Understanding boolean values", content: "In Python, things can be either True or False. This helps us make decisions!", sampleCode: 'is_sunny = True\nis_raining = False\nprint("Is it sunny?", is_sunny)\nprint("Is it raining?", is_raining)', expectedOutput: "Is it sunny? True\nIs it raining? False", lessonNumber: 1, points: 50 },
      { courseId: insertedCourses[2].id, title: "If Statements", description: "Making decisions in code", content: "If statements let us tell Python to do different things based on conditions!", sampleCode: 'age = 10\nif age >= 8:\n    print("You can ride the roller coaster!")\nelse:\n    print("You need to grow a bit more!")', expectedOutput: "You can ride the roller coaster!", lessonNumber: 2, points: 75 },
      { courseId: insertedCourses[2].id, title: "Comparing Things", description: "Using comparison operators", content: "Python can compare numbers and text using special symbols like ==, >, <, >=, <=", sampleCode: 'score = 85\nif score >= 90:\n    print("Excellent!")\nelif score >= 80:\n    print("Great job!")\nelse:\n    print("Keep practicing!")', expectedOutput: "Great job!", lessonNumber: 3, points: 75 },
      { courseId: insertedCourses[2].id, title: "Multiple Conditions", description: "Using and, or operators", content: "Sometimes we need to check multiple things at once using 'and' and 'or'!", sampleCode: 'weather = "sunny"\ntemperature = 75\n\nif weather == "sunny" and temperature > 70:\n    print("Perfect day for the park!")\nelse:\n    print("Maybe stay inside today")', expectedOutput: "Perfect day for the park!", lessonNumber: 4, points: 100 },
      { courseId: insertedCourses[2].id, title: "Decision Making Practice", description: "Putting it all together", content: "Let's practice making complex decisions with if statements!", sampleCode: 'favorite_food = "pizza"\nhungry = True\n\nif hungry and favorite_food == "pizza":\n    print("Let\'s order pizza!")\nelif hungry:\n    print("Let\'s find something to eat")\nelse:\n    print("I\'m not hungry right now")', expectedOutput: "Let's order pizza!", lessonNumber: 5, points: 100 },
      
      // Week 4 - Loops  
      { courseId: insertedCourses[3].id, title: "What are Loops?", description: "Introduction to repetition", content: "Loops help us repeat actions without writing the same code over and over!", sampleCode: 'for i in range(5):\n    print("Python is fun!")', expectedOutput: "Python is fun!\nPython is fun!\nPython is fun!\nPython is fun!\nPython is fun!", lessonNumber: 1, points: 75 },
      { courseId: insertedCourses[3].id, title: "Counting with For Loops", description: "Using for loops to count", content: "For loops are great for counting and doing something a specific number of times!", sampleCode: 'for number in range(1, 6):\n    print("Count:", number)', expectedOutput: "Count: 1\nCount: 2\nCount: 3\nCount: 4\nCount: 5", lessonNumber: 2, points: 75 },
      { courseId: insertedCourses[3].id, title: "While Loops", description: "Loops that keep going while something is true", content: "While loops continue as long as a condition stays true!", sampleCode: 'countdown = 5\nwhile countdown > 0:\n    print("Countdown:", countdown)\n    countdown = countdown - 1\nprint("Blast off!")', expectedOutput: "Countdown: 5\nCountdown: 4\nCountdown: 3\nCountdown: 2\nCountdown: 1\nBlast off!", lessonNumber: 3, points: 100 },
    ];

    const insertedLessons = await db.insert(lessons).values(lessonsData).returning();

    // Create sample progress
    const progressData = [
      { studentId: student.id, courseId: insertedCourses[0].id, lessonId: insertedLessons[0].id, completed: true, codeSubmitted: 'print("Hello, World!")' },
      { studentId: student.id, courseId: insertedCourses[0].id, lessonId: insertedLessons[1].id, completed: true, codeSubmitted: 'print("I am learning Python!")' },
      { studentId: student.id, courseId: insertedCourses[1].id, lessonId: insertedLessons[3].id, completed: true, codeSubmitted: 'age = 10\nprint("Age:", age)' },
      { studentId: student.id, courseId: insertedCourses[2].id, lessonId: insertedLessons[6].id, completed: false, codeSubmitted: null },
    ];

    await db.insert(progress).values(progressData);

    // Create sample challenges
    const challengesData = [
      { title: "Age Group Classifier", description: "Write a program that tells someone if they're a kid, teen, or adult based on their age!", difficulty: "Easy", points: 150, sampleCode: 'age = int(input("How old are you? "))\n# Your code here', solution: 'age = int(input("How old are you? "))\nif age < 13:\n    print("You are a kid!")\nelif age < 20:\n    print("You are a teen!")\nelse:\n    print("You are an adult!")', isDaily: true },
      { title: "Number Guesser", description: "Create a simple guessing game!", difficulty: "Medium", points: 200, sampleCode: 'secret_number = 7\n# Your code here', solution: 'secret_number = 7\nguess = int(input("Guess a number: "))\nif guess == secret_number:\n    print("Correct!")\nelse:\n    print("Try again!")', isDaily: false },
    ];

    await db.insert(challenges).values(challengesData);

    // Create sample achievements
    const achievementsData = [
      { name: "First Steps", description: "Completed your first lesson", icon: "fas fa-rocket", points: 50, condition: "complete_first_lesson" },
      { name: "Variable Master", description: "Created 10 variables", icon: "fas fa-database", points: 100, condition: "create_10_variables" },
      { name: "Decision Maker", description: "Used 5 if statements", icon: "fas fa-question-circle", points: 75, condition: "use_5_if_statements" },
      { name: "Loop Hero", description: "Create your first loop", icon: "fas fa-sync", points: 100, condition: "create_first_loop" },
      { name: "Problem Solver", description: "Solve 10 challenges", icon: "fas fa-puzzle-piece", points: 200, condition: "solve_10_challenges" },
      { name: "Python Expert", description: "Complete the course", icon: "fas fa-star", points: 500, condition: "complete_course" },
    ];

    await db.insert(achievements).values(achievementsData);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}