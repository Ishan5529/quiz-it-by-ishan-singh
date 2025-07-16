export const routes = {
  root: "/",
  auth: {
    login: "/login",
    signup: "/signup",
    resetPassword: "/my/password/new",
    password: "/my/password/edit",
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
      // question: {
      //   index: "/dashboard/quizzes/:slug/questions",
      //   add: "/dashboard/quizzes/:slug/add-question",
      //   edit: "/dashboard/quizzes/:slug/edit-question/:id",
      // },
    },
    settings: {
      index: "/dashboard/settings",
      email: "/dashboard/settings?tab=email",
      profile: "/dashboard/settings?tab=profile",
      changePassword: "/dashboard/settings?tab=password",
    },
  },
  public: "/public",
};
