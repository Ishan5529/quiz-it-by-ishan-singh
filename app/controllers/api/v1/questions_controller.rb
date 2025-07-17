# frozen_string_literal: true

class Api::V1::QuestionsController < Api::V1::BaseController
  include DestructureOptions
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
    options_hash = destructure_options_if_present(params)
    question = @quiz.questions.create!(
      question_params.except(:options).merge(options_hash)
    )

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
    options_hash = destructure_options_if_present(params)
    @question.update!(
      question_params.except(:options).merge(options_hash)
    )
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
        :title, :correct_option, :position,
        :option1, :option2, :option3, :option4, :option5, :option6, options: []
      )
    end

  # def fill_missing_options_with_nil(options_hash)
  #   (1..6).each do |i|
  #     key = "option#{i}"
  #     options_hash[key] = nil unless options_hash.key?(key)
  #   end
  #   options_hash
  # end
end
