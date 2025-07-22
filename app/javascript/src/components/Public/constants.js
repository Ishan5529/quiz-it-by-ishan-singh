import * as yup from "yup";

export const QUIZ_LIST = [
  "Create quizzes with multiple question types",
  "Share quizzes with others",
  "Track quiz performance and analytics",
  "Collaborate with team members on quiz creation",
  "Integrate with other tools and platforms",
  "Customize quiz themes and branding",
  "Access quizzes from any device",
  "Receive real-time notifications and updates",
  "Export quiz data for further analysis",
  "Get support and resources for quiz creation",
  "Participate in community discussions and forums",
  "Access a library of pre-made quizzes",
  "Use advanced features like branching logic and scoring",
  "Create timed quizzes with countdown timers",
  "Set up quiz reminders and notifications",
  "Integrate with learning management systems (LMS)",
  "Use AI-powered quiz suggestions and recommendations",
  "Create quizzes in multiple languages",
  "Access detailed reports and insights on quiz performance",
];

export const REGISTRATION_FORM_INITIAL_VALUES = {
  email: "",
  firstName: "",
  lastName: "",
};

export const REGISTRATION_FORM_VALIDATION_SCHEMA = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Required"),
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
});
