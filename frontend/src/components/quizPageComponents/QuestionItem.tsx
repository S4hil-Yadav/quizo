import { TypeQuestion, TypeQuiz } from "@/lib/types";
import { FiMinusCircle } from "react-icons/fi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface QuestionItemTypes {
  questionItem: TypeQuestion;
  questionIdx: number;
  setQuiz: React.Dispatch<React.SetStateAction<TypeQuiz>>;
}

export default function QuestionItem({
  questionItem,
  questionIdx,
  setQuiz,
}: QuestionItemTypes) {
  return (
    <div className="flex flex-col px-2">
      <div className="flex items-start">
        <Select
          value={questionItem.type}
          onValueChange={(e: typeof questionItem.type) => {
            setQuiz((prevQuiz) => ({
              ...prevQuiz,
              questionItems: prevQuiz.questionItems.map((prevQuestionItem) =>
                prevQuestionItem.id === questionItem.id
                  ? { ...prevQuestionItem, type: e }
                  : prevQuestionItem,
              ),
            }));
          }}
        >
          <SelectTrigger className="mb-3 border-black">
            <SelectValue defaultValue="mcq" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mcq">MCQ</SelectItem>
            <SelectItem value="theory">Theory</SelectItem>
            <SelectItem value="numerical">Numerical</SelectItem>
          </SelectContent>
        </Select>
        <button
          onClick={() => {
            setQuiz((prevQuiz) => ({
              ...prevQuiz,
              questionItems: prevQuiz.questionItems.filter(
                (prevQuestionItem) => prevQuestionItem.id !== questionItem.id,
              ),
            }));
          }}
          className="ml-5 flex h-9 cursor-pointer items-center gap-1 rounded-md bg-red-500 px-5 text-white hover:bg-red-400"
        >
          Remove
        </button>
      </div>

      <div className="flex flex-col">
        <div className="flex gap-2">
          <span className="flex size-9 items-center justify-center rounded-md border border-gray-400">
            {questionIdx + 1}
          </span>
          <textarea
            placeholder="Write your question here"
            value={questionItem.question}
            onChange={(e) => {
              setQuiz((prevQuiz) => ({
                ...prevQuiz,
                questionItems: prevQuiz.questionItems.map((prevQuestionItem) =>
                  prevQuestionItem.id === questionItem.id
                    ? { ...prevQuestionItem, question: e.target.value }
                    : prevQuestionItem,
                ),
              }));
            }}
            className="field-sizing-content w-full resize-none border border-gray-400 px-2 py-1 outline-none focus:border-gray-700"
          />
        </div>

        <label className="my-2 flex cursor-text gap-1 self-end px-2 text-lg font-bold text-red-500">
          <input
            id="marks"
            value={questionItem.marks || ""}
            placeholder="0"
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) {
                return;
              }
              setQuiz((prevQuiz) => ({
                ...prevQuiz,
                questionItems: prevQuiz.questionItems.map((prevQuestionItem) =>
                  prevQuestionItem.id === questionItem.id
                    ? {
                        ...prevQuestionItem,
                        marks: parseInt(e.target.value, 10) || 0,
                      }
                    : prevQuestionItem,
                ),
              }));
            }}
            className="field-sizing-content text-center outline-none"
          />
          <span>{questionItem.marks <= 1 ? "mark" : "marks"}</span>
        </label>
      </div>
      {questionItem.type === "mcq" ? (
        <>
          <div className="ml-10 grid grid-cols-1 space-y-3 md:grid-cols-2">
            {questionItem.options!.map((option, i) => (
              <div key={i} className="flex items-baseline gap-2">
                <span
                  onClick={() => {
                    setQuiz((prevQuiz) => ({
                      ...prevQuiz,
                      questionItems: prevQuiz.questionItems.map(
                        (prevQuestionItem) =>
                          prevQuestionItem.id === questionItem.id
                            ? { ...prevQuestionItem, correctOption: i }
                            : prevQuestionItem,
                      ),
                    }));
                  }}
                  className="w-4 cursor-pointer"
                >
                  {String.fromCharCode(65 + i)})
                </span>
                <textarea
                  className={`field-sizing-content w-full max-w-[80%] resize-none px-2 py-1 outline-none placeholder:text-black ${questionItem.correctOption === i ? "bg-green-200" : "bg-gray-200"}`}
                  onChange={(e) => {
                    setQuiz((prevQuiz) => ({
                      ...prevQuiz,
                      questionItems: prevQuiz.questionItems.map(
                        (prevQuestionItem) =>
                          prevQuestionItem.id === questionItem.id
                            ? {
                                ...prevQuestionItem,
                                options: prevQuestionItem.options.map(
                                  (option, optionIdx) =>
                                    i === optionIdx ? e.target.value : option,
                                ),
                              }
                            : prevQuestionItem,
                      ),
                    }));
                  }}
                  value={option}
                />
                {questionItem.options.length > 2 && (
                  <FiMinusCircle
                    size="15"
                    color="red"
                    onClick={() => {
                      if (questionItem.correctOption > i) {
                        setQuiz((prevQuiz) => ({
                          ...prevQuiz,
                          questionItems: prevQuiz.questionItems.map(
                            (prevQuestionItem) =>
                              prevQuestionItem.id === questionItem.id
                                ? {
                                    ...prevQuestionItem,
                                    correctOption:
                                      questionItem.correctOption - 1,
                                  }
                                : prevQuestionItem,
                          ),
                        }));
                      }
                      setQuiz((prevQuiz) => ({
                        ...prevQuiz,
                        questionItems: prevQuiz.questionItems.map(
                          (prevQuestionItem) =>
                            prevQuestionItem.id === questionItem.id
                              ? {
                                  ...prevQuestionItem,
                                  options:
                                    prevQuestionItem.options.length > 2
                                      ? prevQuestionItem.options.filter(
                                          (_option, optionIdx) =>
                                            i !== optionIdx,
                                        )
                                      : prevQuestionItem.options,
                                }
                              : prevQuestionItem,
                        ),
                      }));
                    }}
                    className="cursor-pointer"
                  />
                )}
              </div>
            ))}
            {questionItem.options.length < 10 && (
              <button
                onClick={() => {
                  setQuiz((prevQuiz) => ({
                    ...prevQuiz,
                    questionItems: prevQuiz.questionItems.map(
                      (prevQuestionItem) =>
                        prevQuestionItem.id === questionItem.id
                          ? {
                              ...prevQuestionItem,
                              options: [...prevQuestionItem.options, ""],
                            }
                          : prevQuestionItem,
                    ),
                  }));
                }}
                className="ml-6 flex h-8 w-[80%] cursor-pointer items-center gap-1 border border-gray-400 px-2 py-1 text-gray-400"
              >
                Click here to add option
              </button>
            )}
          </div>
          <span className="mt-3 ml-6 text-xs text-blue-600">
            *Click on option number to mark it as correct option
          </span>
        </>
      ) : (
        <div className="flex flex-col">
          <span className="text-lg font-semibold">Answer</span>
          <textarea
            placeholder="Write correct answer here"
            defaultValue={questionItem.correctAnswer}
            onChange={(e) => {
              setQuiz((prevQuiz) => ({
                ...prevQuiz,
                questionItems: prevQuiz.questionItems.map((prevQuestionItem) =>
                  prevQuestionItem.id === questionItem.id
                    ? { ...prevQuestionItem, correctAnswer: e.target.value }
                    : prevQuestionItem,
                ),
              }));
            }}
            className="field-sizing-content w-full resize-none border border-gray-400 px-2 py-1 outline-none focus:border-gray-700"
          />
        </div>
      )}
    </div>
  );
}
