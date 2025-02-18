import QuestionItem from "./QuestionItem";
import QuizHeader from "./QuizHeader";
import { TypeQuiz } from "@/lib/types";
import { useState } from "react";
import NewQuizActionButtons from "./NewQuizActionButtons";
import EditQuizActionButtons from "./EditQuizActionButtons";

interface QuizProps {
  quiz: TypeQuiz;
  bottomRef?: React.RefObject<HTMLDivElement | null>;
  isNew?: boolean;
}

export default function Quiz({
  quiz: _quiz,
  bottomRef,
  isNew = true,
}: QuizProps) {
  const [quiz, setQuiz] = useState(_quiz);

  return (
    <>
      <QuizHeader quiz={quiz} setQuiz={setQuiz} />
      <div className="mt-16 flex flex-col gap-20">
        {quiz.questionItems.map((questionItem, i) => (
          <QuestionItem
            key={questionItem.id}
            questionItem={questionItem}
            questionIdx={i}
            setQuiz={setQuiz}
          />
        ))}
      </div>
      <button
        onClick={() => {
          setQuiz((prevQuiz) => ({
            ...prevQuiz,
            questionItems: [
              ...prevQuiz.questionItems,
              {
                id: crypto.randomUUID(),
                correctAnswer: "",
                correctOption: 0,
                marks: 1,
                question: "",
                options: ["", ""],
                type: "mcq",
              },
            ],
          }));
          setTimeout(() =>
            bottomRef?.current?.scrollIntoView({ behavior: "smooth" }),
          );
        }}
        className="my-20 flex w-fit cursor-pointer items-center gap-1 rounded-lg bg-violet-500 px-5 py-2 font-medium text-white hover:bg-violet-400"
      >
        Add Question
      </button>
      {isNew ? (
        <NewQuizActionButtons quiz={quiz} setQuiz={setQuiz} />
      ) : (
        <EditQuizActionButtons quiz={quiz} />
      )}
    </>
  );
}
