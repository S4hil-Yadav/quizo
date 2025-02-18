import { RootState } from "../redux/store.ts";
import { useSelector } from "react-redux";

import { useRef } from "react";
import Quiz from "@/components/quizPageComponents/Quiz.tsx";

export default function CreateQuizPage() {
  const quiz = useSelector((state: RootState) => state.quizDraft);
  const bottomRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex w-full flex-col p-5">
      <Quiz quiz={quiz} bottomRef={bottomRef} />
      <div ref={bottomRef} />
    </div>
  );
}
