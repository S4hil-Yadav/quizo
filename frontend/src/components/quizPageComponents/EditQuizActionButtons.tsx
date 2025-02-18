import { useUpdateQuizMutation } from "@/lib/mutations/quiz.mutations";
import { TypeQuiz } from "@/lib/types";
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
import { Link } from "react-router-dom";

interface EditQuizActionButtonsProps {
  quiz: TypeQuiz;
}

export default function EditQuizActionButtons({
  quiz,
}: EditQuizActionButtonsProps) {
  const { mutate: handleUpdate, isPending } = useUpdateQuizMutation();

  return (
    <div className="mx-auto flex flex-col gap-5 md:flex-row md:gap-10">
      <button
        onClick={() => handleUpdate({ newQuiz: quiz })}
        disabled={isPending}
        className="flex w-40 cursor-pointer items-center justify-center gap-2 self-center rounded-md bg-green-500 py-2 text-xl text-white hover:bg-green-400 disabled:bg-green-400"
      >
        {isPending ? "Processing" : "Update"}
        {isPending && <ImSpinner2 size="20" className="animate-spin" />}
      </button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="w-40 cursor-pointer rounded-md bg-red-500 py-2 text-xl text-white hover:bg-red-400">
            Cancel
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild className="bg-red-600 hover:bg-red-400">
              <Link to="/dashboard">Cancel</Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
