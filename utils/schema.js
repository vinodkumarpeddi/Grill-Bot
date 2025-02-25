
import { pgTable, serial,jsonb, text, varchar } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mockInterview', {
      id: serial('id').primaryKey(),
      jsonMockResp: text('jsonMockResp').notNull(), // Full AI response (for reference)
      questions: jsonb('questions').notNull(),      // Extracted questions & answers
      jobPosition: varchar('jobPosition').notNull(),
      jobDescription: varchar('jobDescription').notNull(),
      jobExperience: varchar('jobExperience').notNull(),
      createdBy: varchar('createdBy').notNull(),
      createdAt: varchar('createdAt'),
      mockId: varchar('mockId').notNull()
  });
  


export const UserAnswer=pgTable('userAnswer',{
      id:serial('id').primaryKey(),
      mockIdRef:varchar('mockIdRef').notNull(),
      question:varchar('question').notNull(),
      correctAns:varchar('correctAns'),
      userAns: text('userAns'),
      feedback:text('feedback'),
      rating:varchar('rating'),
      userEmail:varchar('userEmail'),
      createdAt:varchar('createdAt'),
})