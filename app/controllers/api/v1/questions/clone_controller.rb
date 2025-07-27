# frozen_string_literal: true

class Api::V1::Questions::CloneController < Api::V1::BaseController
  before_action :load_quiz

  def create
    original = @quiz.questions.find(params[:id])
    ActiveRecord::Base.transaction do
      new_position = original.position + 1

      @quiz.questions.where("position >= ?", new_position).update_all("position = position + 1")

      duplicated = @quiz.questions.create!(
        original.attributes
          .except("id", "created_at", "updated_at")
          .merge(position: new_position)
      )

      render_json({ notice: t("successfully_created", entity: "Question (clone)"), question: duplicated })
    end
  end

  private

    def load_quiz
      @quiz = current_user.quizzes.find_by!(slug: params[:quiz_slug])
    end
end
