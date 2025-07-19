# frozen_string_literal: true

class Quizzes::PublishService
  def initialize(quiz)
    @quiz = quiz
  end

  def publish!
    published_data = {
      title: @quiz.title,
      slug: @quiz.slug,
      category: @quiz.category&.attributes,
      questions: @quiz.questions.map do |question|
        {
          id: question.id,
          title: question.title,
          options: [question.option1, question.option2, question.option3, question.option4, question.option5,
                    question.option6].compact_blank,
          correct_option: question.correct_option,
          position: question.position
        }
      end
    }

    if @quiz.published_quiz
      @quiz.published_quiz.update!(data: published_data)
    else
      @quiz.create_published_quiz!(data: published_data)
    end

    @quiz.update!(isPublished: true, isDraft: false)
  end
end
