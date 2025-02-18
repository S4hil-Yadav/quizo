import { TypeQuestion, TypeQuiz } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

const quizDraftSlice = createSlice({
  name: "quizDraft",
  initialState: <TypeQuiz>{
    id: crypto.randomUUID(),
    title: "",
    subject: "",
    date: "",
    duration: 0,
    questionItems: [] as TypeQuestion[],
  },
  reducers: {
    setQuizDraft: (_state, action) => {
      const { newQuiz } = action.payload as { newQuiz: TypeQuiz };
      console.log(newQuiz);
      return newQuiz;
    },

    clearQuizDraft: () => ({
      id: crypto.randomUUID(),
      title: "",
      subject: "",
      date: "",
      duration: 0,
      questionItems: [] as TypeQuestion[],
    }),

    // setQuizDraftTitle: (state, action) => {
    //   const { newTitle } = action.payload as setquizDraftTitlePayloadProps;
    //   return { ...state, title: newTitle };
    // },

    // setquizDraftSubject: (state, action) => {
    //   const { newSubject } = action.payload as setquizDraftSubjectPayloadProps;
    //   return { ...state, subject: newSubject };
    // },

    // setquizDraftDate: (state, action) => {
    //   const { newDate } = action.payload as setquizDraftDatePayloadProps;
    //   return { ...state, date: newDate };
    // },

    // setquizDraftDuration: (state, action) => {
    //   const { newDuration } =
    //     action.payload as setquizDraftDurationPayloadProps;
    //   return { ...state, duration: newDuration };
    // },

    // addQuizDraftQuestion: (state) => ({
    //   ...state,
    //   questionItems: [
    //     ...state.questionItems,
    //     {
    //       id: crypto.randomUUID(),
    //       correctAnswer: "",
    //       correctOption: 0,
    //       marks: 1,
    //       question: "",
    //       options: ["", ""],
    //       type: "mcq",
    //     },
    //   ],
    // }),

    // setQuizDraftQuestionType: (state, action) => {
    //   const { questionItemId, value } =
    //     action.payload as setquizDraftTypePayloadProps;
    //   return {
    //     ...state,
    //     questionItems: state.questionItems.map((questionItem) =>
    //       questionItem.id === questionItemId
    //         ? { ...questionItem, type: value }
    //         : questionItem,
    //     ),
    //   };
    // },

    // removeQuizDraftQuestion: (state, action) => {
    //   const { questionItemId } =
    //     action.payload as removequizDraftQuestionPayloadProps;
    //   return {
    //     ...state,
    //     questionItems: state.questionItems.filter(
    //       (questionItem) => questionItem.id !== questionItemId,
    //     ),
    //   };
    // },

    // setQuizDraftQuestion: (state, action) => {
    //   const { questionItemId, newQuestion } =
    //     action.payload as setquizDraftQuestionPayloadProps;
    //   return ;
    // },

    // setQuizDraftQuestionMarks: (state, action) => {
    //   const { questionItemId, marks } =
    //     action.payload as setquizDraftQuestionMarksPayloadProps;
    //   return ;
    // },

    // setQuizDraftQuestionCorrectOption: (state, action) => {
    //   const { questionItemId, newCorrectOption } =
    //     action.payload as setquizDraftQuestionCorrectOptionPayloadProps;
    //   return {
    //     ...state,
    //     questionItems: state.questionItems.map((questionItem) =>
    //       questionItem.id === questionItemId
    //         ? { ...questionItem, correctOption: newCorrectOption }
    //         : questionItem,
    //     ),
    //   };
    // },

    // setQuizDraftQuestionOption: (state, action) => {
    //   const { questionItemId, optionIdx, newOption } =
    //     action.payload as setquizDraftQuestionOptionPayloadProps;
    //   return {
    //     ...state,
    //     questionItems: state.questionItems.map((questionItem) =>
    //       questionItem.id === questionItemId
    //         ? {
    //             ...questionItem,
    //             options: questionItem.options.map((option, i) =>
    //               i === optionIdx ? newOption : option,
    //             ),
    //           }
    //         : questionItem,
    //     ),
    //   };
    // },

    // removeQuizDraftQuestionOption: (state, action) => {
    //   const { questionItemId, optionIdx } =
    //     action.payload as removequizDraftQuestionOptionPayloadProps;
    //   return {
    //     ...state,
    //     questionItems: state.questionItems.map((questionItem) =>
    //       questionItem.id === questionItemId
    //         ? {
    //             ...questionItem,
    //             options:
    //               questionItem.options.length > 2
    //                 ? questionItem.options.filter(
    //                     (_optionm, i) => i !== optionIdx,
    //                   )
    //                 : questionItem.options,
    //           }
    //         : questionItem,
    //     ),
    //   };
    // },

    // addQuizDraftQuestionOption: (state, action) => {
    //   const { questionItemId } =
    //     action.payload as addquizDraftQuestionOptionPayloadProps;
    //   return {
    //     ...state,
    //     questionItems: state.questionItems.map((questionItem) =>
    //       questionItem.id === questionItemId
    //         ? {
    //             ...questionItem,
    //             options: [...questionItem.options, ""],
    //           }
    //         : questionItem,
    //     ),
    //   };
    // },

    // setQuizDraftQuestionCorrectAnswer: (state, action) => {
    //   const { questionItemId, newCorrectAnswer } =
    //     action.payload as setquizDraftQuestionCorrectAnswerPayloadProps;
    //   return {
    //     ...state,
    //     questionItems: state.questionItems.map((questionItem) =>
    //       questionItem.id === questionItemId
    //         ? { ...questionItem, correctAnswer: newCorrectAnswer }
    //         : questionItem,
    //     ),
    //   };
    // },
  },
});

export const { setQuizDraft, clearQuizDraft } = quizDraftSlice.actions;

export default quizDraftSlice.reducer;
