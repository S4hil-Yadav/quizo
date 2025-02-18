import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ImSpinner2 } from "react-icons/im";
import { TypeQuestion, TypeQuiz } from "@/lib/types";
import { useDispatch } from "react-redux";
import { clearQuizDraft, setQuizDraft } from "@/redux/quizDraft/quizDraftSlice";
import toast from "react-hot-toast";
import { useCreateQuizMutation } from "@/lib/mutations/quiz.mutations";

interface NewQuizActionButtonsProps {
  quiz: TypeQuiz;
  setQuiz: React.Dispatch<React.SetStateAction<TypeQuiz>>;
}

export default function NewQuizActionButtons({
  quiz,
  setQuiz,
}: NewQuizActionButtonsProps) {
  const dispatch = useDispatch();
  const { mutateAsync: handleCreateAsync, isPending } = useCreateQuizMutation();

  return (
    <div className="mx-auto flex flex-col gap-5 md:flex-row md:gap-10">
      <button
        onClick={async () => {
          await handleCreateAsync({ quiz });
          setQuiz({
            id: crypto.randomUUID(),
            title: "",
            subject: "",
            date: "",
            duration: NaN,
            questionItems: [] as TypeQuestion[],
          });
        }}
        disabled={isPending}
        className="flex w-32 cursor-pointer items-center justify-center gap-2 self-center rounded-md bg-green-500 py-2 text-white hover:bg-green-400 disabled:bg-green-400"
      >
        {isPending ? "Processing" : "Create"}
        {isPending && <ImSpinner2 size="20" className="animate-spin" />}
      </button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="w-32 cursor-pointer rounded-md bg-red-500 py-2 text-white hover:bg-red-400">
            Clear All
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Quiz?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this quiz?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setQuiz({
                  id: crypto.randomUUID(),
                  title: "",
                  subject: "",
                  date: "",
                  duration: 0,
                  questionItems: [] as TypeQuestion[],
                });
                dispatch(clearQuizDraft());
              }}
              className="bg-red-600 hover:bg-red-400"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <button
        onClick={() => {
          dispatch(setQuizDraft({ newQuiz: quiz }));
          toast.success("Draft saved");
        }}
        className="w-32 cursor-pointer rounded-md bg-blue-500 py-2 text-white hover:bg-blue-400"
      >
        Save as draft
      </button>
    </div>
  );
}
