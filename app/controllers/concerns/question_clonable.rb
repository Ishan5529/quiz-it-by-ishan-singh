# frozen_string_literal: true

module QuestionClonable
  extend ActiveSupport::Concern

  private

    def clone_question_with_position(quiz, question_id)
      original = quiz.questions.find(question_id)
      ActiveRecord::Base.transaction do
        new_position = original.position + 1

        quiz.questions.where("position >= ?", new_position).update_all("position = position + 1")

        duplicated = quiz.questions.create!(
          original.attributes
            .except("id", "created_at", "updated_at")
            .merge(position: new_position)
        )

        duplicated
      end
    end
end
