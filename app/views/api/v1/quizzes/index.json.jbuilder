# frozen_string_literal: true

json.quizzes @quizzes do |quiz|
  json.extract! quiz,
    :id,
    :title,
    :created_at,
    :updated_at,
    :slug,
    :isDraft,
    :isPublished

  json.submission_count quiz.attempts.size

  json.category do
    json.extract! quiz.category, :id, :name
  end

  json.questions quiz.questions do |question|
    json.extract! question,
      :id,
      :title,
      :correct_option,
      :position
    json.options [
      question.option1,
      question.option2,
      question.option3,
      question.option4,
      question.option5,
      question.option6
    ].compact_blank
  end

  if quiz.published_quiz&.data.present?
    json.published quiz.published_quiz.data
  else
    json.published nil
  end

  json.user do
    json.extract! quiz.user,
      :id,
      :name,
      :email
  end
end

json.meta do
  json.current_page @quizzes.current_page
  json.total_pages @quizzes.total_pages
  json.total_count @quizzes.total_count
  json.published_count @quizzes.where(isPublished: true).count
  json.draft_count @quizzes.where(isDraft: true).count
  json.per_page @quizzes.limit_value
end
