export type IQuestionTypes = "SINGLE" | "MULTI" | "DESCRIPTIVE" | "";

export interface IQuestionAnswer {
  id: number;
  correct: boolean;
  answer: string;
}
