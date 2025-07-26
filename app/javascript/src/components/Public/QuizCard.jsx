import { routes } from "routes";
import React from "react";
import { Button, Typography, Tag } from "neetoui";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const QuizCard = ({ title, slug, category, total_questions }) => {
  const history = useHistory();
  const { t } = useTranslation();

  const handleStartClick = () => {
    const link = routes.public.quizzes.registration.replace(":slug", slug);
    history.push(link);
  };

  if (total_questions === 0) {
    return;
  }

  return (
    <div className="flex h-64 w-80 flex-col rounded-lg border bg-white px-4 py-6 shadow-lg">
      <Typography className="line-clamp-2 break-words" style="h2">
        {title}
      </Typography>
      <div className="mt-2 flex-1">
        <Tag label={category} size="large" type="solid" />
      </div>
      <Typography style="h4">
        {total_questions}{" "}
        {total_questions === 1 ? t("labels.question") : t("labels.questions")}
      </Typography>
      <Button
        fullWidth
        label={t("labels.startQuiz")}
        size="large"
        className="mt-4"
        onClick={handleStartClick}
      />
    </div>
  );
};

export default QuizCard;
