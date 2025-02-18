import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
export const sql = neon(`postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`);

export async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) NOT NULL UNIQUE,
        username VARCHAR(20) NOT NULL UNIQUE,
        fullname VARCHAR(30) NOT NULL,
        profile_picture TEXT DEFAULT '',
        password VARCHAR(255) NOT NULL
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS quizes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        host_id UUID NOT NULL,
        title VARCHAR(128) NOT NULL,
        subject VARCHAR(128) NOT NULL,
        date DATE,
        duration SMALLINT,
        FOREIGN KEY (host_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS question_items (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        quiz_id UUID NOT NULL,
        type TEXT NOT NULL CHECK (type IN ('numerical', 'theory', 'mcq')),
        question TEXT NOT NULL,
        options TEXT[] NOT NULL,
        correct_option SMALLINT DEFAULT 0,
        marks SMALLINT NOT NULL,
        correct_answer TEXT DEFAULT NULL,
        FOREIGN KEY (quiz_id) REFERENCES quizes(id) ON DELETE CASCADE
      )
    `;

    await sql`CREATE INDEX IF NOT EXISTS idx_quizes_host_id ON quizes(host_id);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_question_items_quiz_id ON question_items(quiz_id);`;

    console.log("Database initialized successfully");
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error initDB", err.message);
    }
  }
}
