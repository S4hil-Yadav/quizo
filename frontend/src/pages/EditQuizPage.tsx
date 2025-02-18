import { useRef } from "react";
import Quiz from "../components/quizPageComponents/Quiz";
import { useParams } from "react-router-dom";
import { useGetQuizQuery } from "@/lib/queries/quiz.queries";
import LoadingOrError from "@/components/LoadingOrError";

export default function EditQuiz() {
  const { quizId } = useParams();
  const {
    data: quiz,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetQuizQuery({ quizId: quizId || "" });

  const bottomRef = useRef<HTMLDivElement>(null);

  if (isLoading || isFetching || isError)
    return (
      <LoadingOrError
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        refetch={refetch}
        loadingMessage="Loading Quiz"
        errorMessage="Could not load Quiz"
      />
    );

  return (
    <div className="flex w-full flex-col p-5">
      <Quiz isNew={false} quiz={quiz} bottomRef={bottomRef} />
      <div ref={bottomRef} />
    </div>
  );
}
