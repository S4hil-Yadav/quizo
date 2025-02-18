import { TypeQuiz } from "../types/types.js";
import errorHandler from "../lib/error.js";
import { Request, Response, NextFunction } from "express";
import { sql } from "../lib/db.js";

export async function createQuiz(req: Request, res: Response, next: NextFunction) {
  try {
    const quiz: TypeQuiz = req.body.quiz;

    const title = quiz.title.trim(),
      subject = quiz.subject.trim(),
      date = quiz.date,
      duration = quiz.duration,
      questionItems = quiz.questionItems,
      hostId = req.userId;

    if (!title) {
      next(errorHandler(400, "Title can't be empty"));
      return;
    } else if (!subject) {
      next(errorHandler(400, "Subject can't be empty"));
      return;
    } else if (!duration) {
      next(errorHandler(400, "Duration can't be zero"));
      return;
    } else if (!questionItems.length) {
      next(errorHandler(400, "Questions can't be empty"));
      return;
    }

    const newQuiz = await sql`
      INSERT INTO quizes (host_id, title, subject, date, duration)
      VALUES (${hostId}, ${title}, ${subject}, ${date}, ${duration})
      RETURNING id;
    `;
    const quizId = newQuiz[0].id;

    await Promise.all(
      quiz.questionItems.map(({ type, question, options, correctOption, correctAnswer, marks }) => {
        return sql`
          INSERT INTO question_items (quiz_id, type, question, options, correct_option, correct_answer, marks)
          VALUES (${quizId}, ${type}, ${question}, ${options}, ${correctOption}, ${correctAnswer}, ${marks})
        `;
      })
    );

    res.status(204).end();
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error in createQuiz controller:", err.message);
      next();
    }
  }
}

export async function getQuizes(req: Request, res: Response, next: NextFunction) {
  try {
    const hostId = req.userId;

    const quizes = await sql`
      SELECT 
        t.id AS id,
        t.title AS title,
        t.subject AS subject,
        t.date AS date,
        t.duration AS duration,
        array_agg(
          jsonb_build_object(
            'id', q.id,
            'type', q.type,
            'questionItem', q.question,
            'options', q.options,
            'correctOption', q.correct_option,
            'correctAnswer', q.correct_answer,
            'marks', q.marks
          )
        ) AS "questionItems"
      FROM quizes t LEFT JOIN question_items q ON q.quiz_id = t.id WHERE t.host_id = ${hostId} GROUP BY t.id;
    `;

    res.status(200).json(quizes);
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error in getQuizes controller:", err.message);
      next();
    }
  }
}

export async function getQuiz(req: Request, res: Response, next: NextFunction) {
  try {
    const quizId = req.params.quizId;

    const quiz = await sql`
      SELECT 1 FROM quizes WHERE id = ${quizId} AND host_id = ${req.userId} LIMIT 1;
    `;

    if (quiz.length === 0) {
      next(errorHandler(401, "Unauthorized to edit other's quiz"));
      return;
    }

    const quizes = await sql`
      SELECT 
        t.id AS id,
        t.title AS title,
        t.subject AS subject,
        TO_CHAR(t.date, 'YYYY-MM-DD') AS date,
        t.duration AS duration,
        array_agg(
          jsonb_build_object(
            'id', q.id,
            'type', q.type,
            'question', q.question,
            'options', q.options,
            'correctOption', q.correct_option,
            'correctAnswer', q.correct_answer,
            'marks', q.marks
          )
        ) AS "questionItems"
      FROM quizes t LEFT JOIN question_items q ON q.quiz_id = t.id WHERE t.id = ${quizId} GROUP BY t.id;
    `;

    res.status(200).json(quizes[0]);
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error in getQuiz controller:", err.message);
      next();
    }
  }
}

export async function editQuiz(req: Request, res: Response, next: NextFunction) {
  try {
    const newQuiz: TypeQuiz = req.body.newQuiz;

    const quiz = await sql`
      SELECT 1 FROM quizes WHERE id = ${newQuiz.id} AND host_id = ${req.userId} LIMIT 1;
    `;

    if (quiz.length === 0) {
      next(errorHandler(401, "Unauthorized to edit other's quiz"));
      return;
    }

    await sql`
      UPDATE quizes
        SET 
          title = ${newQuiz.title},
          subject = ${newQuiz.subject},
          date = ${newQuiz.date},
          duration = ${newQuiz.duration}
        WHERE id = ${newQuiz.id};
    `;

    await sql`
    DELETE FROM question_items WHERE quiz_id = ${newQuiz.id};
  `;

    await Promise.all(
      newQuiz.questionItems.map(
        ({ question, marks, type, options, correctOption, correctAnswer }) =>
          sql`
          INSERT INTO question_items (quiz_id, question, marks, type, options, correct_option, correct_answer)
          VALUES (${newQuiz.id}, ${question}, ${marks}, ${type}, ${options}, ${correctOption}, ${correctAnswer});
        `
      )
    );

    res.status(204).end();
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error in updateQuiz controller:", err.message);
      next();
    }
  }
}

export async function deleteQuiz(req: Request, res: Response, next: NextFunction) {
  try {
    const { quizId } = req.params;

    await sql`
      DELETE FROM question_items WHERE quiz_id = ${quizId};
    `;

    await sql`
      DELETE FROM quizes WHERE id = ${quizId};
    `;

    res.status(204).end();
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error in deleteQuiz controller:", err.message);
      next();
    }
  }
}
