import { TypeQuiz } from "@/lib/types";

interface QuizHeaderProps {
  quiz: TypeQuiz;
  setQuiz: React.Dispatch<React.SetStateAction<TypeQuiz>>;
}

export default function QuizHeader({ quiz, setQuiz }: QuizHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-5">
      <div className="flex flex-col">
        <label htmlFor="title" className="font-semibold">
          Title
        </label>
        <input
          id="title"
          placeholder="Enter quiz title"
          maxLength={128}
          value={quiz.title}
          onChange={(e) => {
            setQuiz((prev) => ({ ...prev, title: e.target.value }));
          }}
          className="min-w-40 rounded-md border border-gray-400 px-2 py-1 font-medium outline-none placeholder:font-normal focus:border-gray-700"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="subject" className="font-semibold">
          Subject
        </label>
        <input
          id="subject"
          placeholder="Enter quiz subject"
          maxLength={128}
          value={quiz.subject}
          onChange={(e) => {
            setQuiz((prev) => ({ ...prev, subject: e.target.value }));
          }}
          className="min-w-40 rounded-md border border-gray-400 px-2 py-1 font-medium outline-none placeholder:font-normal focus:border-gray-700"
        />
      </div>

      <div className="flex justify-between">
        <div className="flex flex-col">
          <label htmlFor="quiz-date" className="font-semibold">
            Date
          </label>
          <input
            type="date"
            value={quiz.date}
            onChange={(e) => {
              setQuiz((prev) => ({ ...prev, date: e.target.value }));
            }}
            className="w-fit rounded-md border border-gray-400 px-2 py-1 font-medium outline-none focus:border-gray-700"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="quiz-duration" className="font-semibold">
            Duration (in minutes)
          </label>
          <input
            placeholder="Enter duration"
            value={quiz.duration || ""}
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) {
                return;
              }
              setQuiz((prev) => ({
                ...prev,
                duration: parseInt(e.target.value, 10) || 0,
              }));
            }}
            className="w-40 rounded-md border border-gray-400 px-2 py-1 font-medium outline-none focus:border-gray-700"
          />
        </div>
      </div>
    </div>
  );
}
