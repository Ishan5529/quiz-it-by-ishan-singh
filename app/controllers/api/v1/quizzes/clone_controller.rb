# frozen_string_literal: true

class Api::V1::Quizzes::CloneController < Api::V1::BaseController
  include QuizClonable

  def create
    quiz = Quiz.find_by!(slug: params[:slug])
    cloned_quiz = clone_quiz_with_questions(quiz)

    if cloned_quiz.persisted?
      render json: cloned_quiz, status: :created
    else
      render json: { error: cloned_quiz.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
