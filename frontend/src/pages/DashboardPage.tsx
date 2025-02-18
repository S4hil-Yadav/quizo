import { SearchInput } from "@/components/Input";
import LoadingOrError from "@/components/LoadingOrError";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeleteQuizMutation } from "@/lib/mutations/quiz.mutations";
import { useGetQuizesQuery } from "@/lib/queries/quiz.queries";
import { TypeQuiz } from "@/lib/types";
import moment from "moment";
import { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { Link } from "react-router-dom";

export default function HomePage() {
  const {
    data: quizes,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetQuizesQuery();
  const [filteredQuizes, setFilteredQuizes] = useState<TypeQuiz[]>([]);

  useEffect(() => {
    setFilteredQuizes(quizes || []);
  }, [quizes]);

  if (isLoading || isFetching || isError)
    return (
      <LoadingOrError
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        refetch={refetch}
        loadingMessage="Loading Dashboard"
        errorMessage="Could not load dasboard"
      />
    );

  return (
    <div className="flex w-full max-w-screen flex-col px-5">
      <div className="my-7 w-full">
        <SearchInput
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFilteredQuizes(
              quizes.filter((quiz: TypeQuiz) =>
                Object.entries(quiz).some(([key, value]) => {
                  if (
                    (key === "title" || key === "subject") &&
                    value
                      .toString()
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase())
                  ) {
                    return true;
                  }
                }),
              ),
            );
          }}
        />
      </div>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>S.No</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Questions</TableHead>
            <TableHead>Marks</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Edit</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredQuizes!.map((quiz: TypeQuiz, i: number) => (
            <TableRow key={quiz.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{quiz.title}</TableCell>
              <TableCell>{quiz.subject}</TableCell>
              <TableCell>{quiz.questionItems.length}</TableCell>
              <TableCell>
                {quiz.questionItems.reduce(
                  (acc, questionItem) => acc + questionItem.marks,
                  0,
                )}
              </TableCell>
              <TableCell>{moment(quiz.date).format("DD/MM/YYYY")}</TableCell>
              <TableCell>{quiz.duration} min</TableCell>
              <TableCell>
                <Link
                  to={"/edit-quiz/" + quiz.id}
                  className="rounded-md bg-gray-300 px-4 py-1 hover:bg-gray-400"
                >
                  Edit
                </Link>
              </TableCell>
              <TableCell>
                <DeleteQuizButton quizId={quiz.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

interface DeleteQuizButtonProps {
  quizId: string;
}

function DeleteQuizButton({ quizId }: DeleteQuizButtonProps) {
  const { mutate: handleDelete, isPending } = useDeleteQuizMutation();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          disabled={isPending}
          className="flex h-7 w-16 cursor-pointer items-center justify-between rounded-md bg-red-500 py-1 text-white hover:bg-red-400"
        >
          {isPending ? (
            <ImSpinner2 size="15" className="mx-auto animate-spin" />
          ) : (
            <span className="mx-auto">Delete</span>
          )}
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this quiz?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild className="bg-red-600 hover:bg-red-400">
            <button onClick={() => handleDelete({ quizId })}>Delete</button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
// {
//   useMemo(
//     () => (
//       <div
//         className={`mx-auto w-[90vw] ${showNavbar ? "md:w-[calc(90vw-10rem)] lg:w-[calc(75vw-10rem)]" : "lg:w-[75vw]"}`}
//       >
//         <ReadyQuizesSlider />
//         <UpcomingQuizesSlider />
//       </div>
//     ),
//     [showNavbar],
//   );
// }
