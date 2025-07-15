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
      edit: "/dashboard/quizzes/:slug/edit",
      submissions: "/dashboard/quizzes/:slug/submissions",
      show: "/dashboard/quizzes/:slug",
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
