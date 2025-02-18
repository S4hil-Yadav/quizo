import { TypeQuestion } from "@/lib/types";

export interface setTestDraftTitlePayloadProps {
  newTitle: string;
}

export interface setTestDraftSubjectPayloadProps {
  newSubject: string;
}

export interface setTestDraftDatePayloadProps {
  newDate: string;
}

export interface setTestDraftDurationPayloadProps {
  newDuration: number;
}
export interface setTestDraftTypePayloadProps {
  questionItemId: TypeQuestion["id"];
  value: TypeQuestion["type"];
}

export interface removeTestDraftQuestionPayloadProps {
  questionItemId: TypeQuestion["id"];
}

export interface setTestDraftQuestionPayloadProps {
  questionItemId: TypeQuestion["id"];
  newQuestion: TypeQuestion["question"];
}

export interface setTestDraftQuestionMarksPayloadProps {
  questionItemId: TypeQuestion["id"];
  marks: TypeQuestion["marks"];
}

export interface setTestDraftQuestionCorrectOptionPayloadProps {
  questionItemId: TypeQuestion["id"];
  newCorrectOption: number;
}

export interface setTestDraftQuestionOptionPayloadProps {
  questionItemId: TypeQuestion["id"];
  optionIdx: number;
  newOption: string;
}

export interface removeTestDraftQuestionOptionPayloadProps {
  questionItemId: TypeQuestion["id"];
  optionIdx: number;
}

export interface addTestDraftQuestionOptionPayloadProps {
  questionItemId: TypeQuestion["id"];
}

export interface setTestDraftQuestionCorrectAnswerPayloadProps {
  questionItemId: TypeQuestion["id"];
  newCorrectAnswer: TypeQuestion["correctAnswer"];
}
