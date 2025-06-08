export const COLORS = {
  coral: '#FF6B6B',
  turquoise: '#4ECDC4',
  skyblue: '#45B7D1',
  mint: '#96CEB4',
  sunny: '#FECA57',
  pink: '#FF9FF3',
  orange: '#FF9F43',
  darkblue: '#2C3E50'
} as const;

export const ACHIEVEMENTS = {
  FIRST_STEPS: 'first_steps',
  VARIABLE_MASTER: 'variable_master',
  DECISION_MAKER: 'decision_maker',
  LOOP_HERO: 'loop_hero',
  PROBLEM_SOLVER: 'problem_solver',
  PYTHON_EXPERT: 'python_expert'
} as const;

export const COURSE_WEEKS = [
  { number: 1, title: "Hello Python!", description: "Basic syntax & your first program" },
  { number: 2, title: "Data Types", description: "Numbers, strings & variables" },
  { number: 3, title: "Conditions", description: "If statements & decision making" },
  { number: 4, title: "Loops", description: "Repeating actions with for & while" },
  { number: 5, title: "Functions", description: "Creating reusable code blocks" },
  { number: 6, title: "Lists", description: "Storing multiple items together" },
  { number: 7, title: "Dictionaries", description: "Key-value data storage" },
  { number: 8, title: "File Handling", description: "Reading and writing files" },
  { number: 9, title: "Error Handling", description: "Dealing with mistakes gracefully" },
  { number: 10, title: "Libraries", description: "Using other people's code" },
  { number: 11, title: "Project Time", description: "Building your own programs" },
  { number: 12, title: "Showcase", description: "Share your creations!" }
] as const;

export const DIFFICULTY_LEVELS = {
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard'
} as const;

export const POINTS = {
  LESSON_COMPLETE: 50,
  FIRST_IF_STATEMENT: 50,
  WEEK_WARRIOR: 100,
  PROBLEM_SOLVER: 75,
  CHALLENGE_EASY: 150,
  CHALLENGE_MEDIUM: 200,
  CHALLENGE_HARD: 300
} as const;
