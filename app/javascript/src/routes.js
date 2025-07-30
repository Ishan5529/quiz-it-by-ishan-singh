export const routes = {
  root: "/",
  auth: {
    login: "/login",
    signup: "/signup",
    logout: "/logout",
  },
  dashboard: {
    index: "/dashboard",
    quizzes: {
      index: "/dashboard/quizzes",
      create: "/dashboard/quizzes/create",
      quizPage: "/dashboard/quizzes/:slug",
      edit: {
        index: "/dashboard/quizzes/:slug/edit",
        addQuestion: "/dashboard/quizzes/:slug/edit/add-question",
        editQuestion: "/dashboard/quizzes/:slug/edit/edit-question/:id",
      },
      submissions: "/dashboard/quizzes/:slug/submissions",
      show: "/dashboard/quizzes/:slug",
    },
    settings: {
      index: "/dashboard/settings",
      email: "/dashboard/settings?tab=email",
      organization: "/dashboard/settings?tab=organization",
      profile: "/dashboard/settings?tab=profile",
      changePassword: "/dashboard/settings?tab=password",
    },
  },
  public: {
    index: "/public",
    quizzes: {
      index: "/public/quizzes",
      quizPage: "/public/quizzes/:slug",
      registration: "/public/quizzes/:slug/registration",
      result: "/public/quizzes/:slug/result/:attemptId",
      attempts: {
        index: "/public/quizzes/:slug/attempts",
        new: "/public/quizzes/:slug/attempts/:attemptId",
        create: "/public/quizzes/:slug/attempts/create",
      },
    },
  },
  pageNotFound: "*",
};
