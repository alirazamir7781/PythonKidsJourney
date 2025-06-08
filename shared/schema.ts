import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  username: text("username").notNull().unique(),
  currentWeek: integer("current_week").default(1),
  totalPoints: integer("total_points").default(0),
  streakDays: integer("streak_days").default(0),
  level: integer("level").default(1),
  achievements: jsonb("achievements").$type<string[]>().default([]),
  createdAt: timestamp("created_at").defaultNow(),
});

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  weekNumber: integer("week_number").notNull(),
  totalLessons: integer("total_lessons").notNull(),
  isLocked: boolean("is_locked").default(false),
});

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  sampleCode: text("sample_code"),
  expectedOutput: text("expected_output"),
  lessonNumber: integer("lesson_number").notNull(),
  points: integer("points").default(50),
});

export const progress = pgTable("progress", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull(),
  courseId: integer("course_id").notNull(),
  lessonId: integer("lesson_id"),
  completed: boolean("completed").default(false),
  completedAt: timestamp("completed_at"),
  codeSubmitted: text("code_submitted"),
});

export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  difficulty: text("difficulty").notNull(),
  points: integer("points").notNull(),
  sampleCode: text("sample_code"),
  solution: text("solution"),
  isDaily: boolean("is_daily").default(false),
});

export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  points: integer("points").notNull(),
  condition: text("condition").notNull(),
});

export const insertStudentSchema = createInsertSchema(students).omit({
  id: true,
  createdAt: true,
});

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
});

export const insertLessonSchema = createInsertSchema(lessons).omit({
  id: true,
});

export const insertProgressSchema = createInsertSchema(progress).omit({
  id: true,
  completedAt: true,
});

export const insertChallengeSchema = createInsertSchema(challenges).omit({
  id: true,
});

export const insertAchievementSchema = createInsertSchema(achievements).omit({
  id: true,
});

export type Student = typeof students.$inferSelect;
export type Course = typeof courses.$inferSelect;
export type Lesson = typeof lessons.$inferSelect;
export type Progress = typeof progress.$inferSelect;
export type Challenge = typeof challenges.$inferSelect;
export type Achievement = typeof achievements.$inferSelect;

export type InsertStudent = z.infer<typeof insertStudentSchema>;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type InsertLesson = z.infer<typeof insertLessonSchema>;
export type InsertProgress = z.infer<typeof insertProgressSchema>;
export type InsertChallenge = z.infer<typeof insertChallengeSchema>;
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
