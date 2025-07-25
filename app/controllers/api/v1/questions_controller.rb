# frozen_string_literal: true

class Api::V1::QuestionsController < Api::V1::BaseController
  include DestructureOptions
  include QuestionCreatableUpdatable

  before_action :load_quiz
  before_action :load_question, only: %i[show update destroy]

  def index
    @questions = @quiz.questions.order(:position)
    render
  end

  def show
    render
  end

  def create
    handle_create_or_update_question(@quiz, params, question_params, is_create: true)
  end

  def update
    handle_create_or_update_question(@quiz, params, question_params, is_create: false, question: @question)
  end

  def bulk_destroy
    questions = @quiz.questions.where(id: params[:ids])
    positions = questions.pluck(:position)
    count = questions.size
    if questions.destroy_all
      positions.sort.reverse.each do |pos|
        @quiz.questions.where("position > ?", pos).update_all("position = position - 1")
      end
      render_message(t("successfully_deleted", count: count, entity: "Question"))
    else
      render_error(t("something_went_wrong"))
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
        :title, :correct_option, :position,
        :option1, :option2, :option3, :option4, :option5, :option6, options: []
      )
    end
end
