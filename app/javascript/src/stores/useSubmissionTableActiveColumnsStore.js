import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSubmissionTableActiveColumnsStore = create(
  persist(
    set => ({
      showName: true,
      showEmail: true,
      showSubmissionDate: true,
      showCorrectAnswers: true,
      showWrongAnswers: true,
      showUnanswered: true,
      showQuestions: true,
      showStatus: true,
      setShowEmail: value => set({ showEmail: value }),
      setShowSubmissionDate: value => set({ showSubmissionDate: value }),
      setShowCorrectAnswers: value => set({ showCorrectAnswers: value }),
      setShowWrongAnswers: value => set({ showWrongAnswers: value }),
      setShowUnanswered: value => set({ showUnanswered: value }),
      setShowQuestions: value => set({ showQuestions: value }),
      setShowStatus: value => set({ showStatus: value }),
    }),
    {
      name: "submission-table-columns",
    }
  )
);
