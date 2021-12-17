export interface ITestsToShow {
  id: number;
  name: string;
  author: string | null;
  startDate: string | null;
  endDate: string | null;
  time: string | null;
  isResult: boolean;
  dateOfExecution: string | null;
  maxPoints: number | null;
  totalPoints: number | null;
}