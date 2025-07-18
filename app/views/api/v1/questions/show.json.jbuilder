# frozen_string_literal: true

json.question do
  json.extract! @question,
    :id,
    :title,
    :created_at,
    :updated_at,
    :position,
    :quiz_id,
    :correct_option
  json.options [
    @question.option1,
    @question.option2,
    @question.option3,
    @question.option4,
    @question.option5,
    @question.option6
  ].compact_blank
end
