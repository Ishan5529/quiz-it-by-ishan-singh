import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useQuizTableActiveColumnsStore = create(
  persist(
    set => ({
      showSubmissionCount: true,
      showCreatedOn: true,
      showStatus: true,
      showCategory: true,
      setShowSubmissionCount: value => set({ showSubmissionCount: value }),
      setShowCreatedOn: value => set({ showCreatedOn: value }),
      setShowStatus: value => set({ showStatus: value }),
      setShowCategory: value => set({ showCategory: value }),
    }),
    {
      name: "quiz-table-columns",
    }
  )
);
