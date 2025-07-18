# frozen_string_literal: true

json.quiz do
  json.extract! @quiz,
    :id,
    :title,
    :created_at,
    :updated_at,
    :slug,
    :status

  json.category do
    json.extract! @quiz.category, :id, :name
  end

  json.questions @quiz.questions do |question|
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

  json.user do
    json.extract! @quiz.user,
      :id,
      :name,
      :email
  end
end
