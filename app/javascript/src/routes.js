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
    quizzes: "/dashboard/quizzes",
    settings: {
      index: "/dashboard/settings",
      email: "/dashboard/settings?tab=email",
      profile: "/dashboard/settings?tab=profile",
      changePassword: "/dashboard/settings?tab=password",
    },
  },
  public: "/public",
};
