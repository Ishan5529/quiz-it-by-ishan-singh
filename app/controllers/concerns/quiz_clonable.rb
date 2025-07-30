# frozen_string_literal: true

module QuizClonable
  extend ActiveSupport::Concern

  private

    def clone_quiz_with_questions(quiz)
      cloned_quiz = quiz.dup
      cloned_quiz.title = "#{quiz.title} (Copy)"
      cloned_quiz.isDraft = true
      cloned_quiz.isPublished = false
      cloned_quiz.category_id = quiz.category_id

      return cloned_quiz unless cloned_quiz.save

      quiz.questions.each do |question|
        cloned_question = question.dup
        cloned_question.quiz_id = cloned_quiz.id
        cloned_question.save!
      end

      cloned_quiz
    end
end
