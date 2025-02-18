export interface TypeQuestion {
  id: string;
  question: string;
  marks: number;
  type: "mcq" | "theory" | "numerical";
  options: string[];
  correctAnswer: string;
  correctOption: number;
}

export interface TypeQuiz {
  id: string;
  title: string;
  subject: string;
  date: string;
  duration: number;
  questionItems: TypeQuestion[];
}

export interface TypeUser {
  id?: string;
  email: string;
  username: string;
  fullname: string;
  profilePicture: string;
  password: string;
}
