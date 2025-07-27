# frozen_string_literal: true

module QuestionCreatableUpdatable
  extend ActiveSupport::Concern

  def handle_create_or_update_question(quiz, params, question_params, is_create: true, question: nil)
    options_hash = destructure_options_if_present(params)
    if is_create
      question = quiz.questions.create!(
        question_params.except(:options).merge(options_hash)
      )
    else
      question.update!(
        question_params.except(:options).merge(options_hash)
      )
    end

    if params.key?(:quiet)
      render_json({ question: question })
    else
      action = is_create ? "successfully_created" : "successfully_updated"
      render_json({ notice: t(action, entity: "Question"), question: question })
    end
  end
end
