# frozen_string_literal: true

class Api::V1::QuestionsController < Api::V1::BaseController
  include DestructureOptions
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

  def clone
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
