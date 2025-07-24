# frozen_string_literal: true

class Api::V1::Quizzes::CloneController < Api::V1::BaseController
  def create
    quiz = Quiz.find_by!(slug: params[:slug])

    cloned_quiz = quiz.dup
    cloned_quiz.title = "#{quiz.title} (Copy)"
    cloned_quiz.isDraft = true
    cloned_quiz.isPublished = false
    cloned_quiz.category_id = quiz.category_id

    unless cloned_quiz.save
      render json: { error: cloned_quiz.errors.full_messages }, status: :unprocessable_entity
      return
    end

    quiz.questions.each do |question|
      cloned_question = question.dup
      cloned_question.quiz_id = cloned_quiz.id
      cloned_question.save!
    end

    render json: cloned_quiz, status: :created
  end
end
