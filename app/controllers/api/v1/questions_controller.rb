# frozen_string_literal: true

class Api::V1::QuestionsController < Api::V1::BaseController
  before_action :load_quiz
  before_action :load_question, only: %i[show update destroy]

  def index
    questions = @quiz.questions.order(:position)
    render_json({ questions: questions })
  end

  def show
    render_json({ question: @question })
  end

  def create
    question = @quiz.questions.create!(question_params)
    if params.key?(:quiet)
      render_json({ question: question })
      return
    end
    render_json({ notice: t("successfully_created", entity: "Question"), question: question })
  end

  def duplicate
    original = @quiz.questions.find(params[:id])
    duplicated = @quiz.questions.create!(original.attributes.except("id", "created_at", "updated_at", "position"))
    render_json({ notice: t("successfully_created", entity: "Question (duplicate)"), question: duplicated })
  end

  def update
    @question.update!(question_params)
    if params.key?(:quiet)
      render_json({ question: @question })
      return
    end
    render_json({ notice: t("successfully_updated", entity: "Question"), question: @question })
  end

  def bulk_destroy
    questions = @quiz.questions.where(id: params[:ids])
    count = questions.size
    if questions.destroy_all
      render_message(t("successfully_deleted", count: count, entity: count > 1 ? "Questions" : "Question"))
    else
      render_error(t("Something went wrong!"))
    end
  end

  private

    def load_quiz
      @quiz = current_user.quizzes.find_by!(slug: params[:quiz_slug])
    end

    def load_question
      @question = @quiz.questions.find(params[:id])
    end

    def question_params
      params.require(:question).permit(
        :title, :option1, :option2, :option3, :option4, :option5, :option6,
        :correct_option, :position)
    end
end
