# frozen_string_literal: true

class Api::V1::Questions::CloneController < Api::V1::BaseController
  include QuestionClonable
  before_action :load_quiz

  def create
    duplicated = clone_question_with_position(@quiz, params[:id])
    render_json({ notice: t("successfully_created", entity: "Question (clone)"), question: duplicated })
  end

  private

    def load_quiz
      @quiz = current_user.quizzes.find_by!(slug: params[:quiz_slug])
    end
end
