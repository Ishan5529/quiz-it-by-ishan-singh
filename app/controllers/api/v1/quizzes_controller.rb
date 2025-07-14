# frozen_string_literal: true

class Api::V1::QuizzesController < Api::V1::BaseController
  before_action :load_quiz!, only: %i[update delete]
  before_action :load_quizzes, only: :bulk_destroy

  def index
    render_json({ quizzes: current_user.quizzes })
  end

  def create
    current_user.quizzes.create!(quiz_params)
    render_message(t("successfully_created", entity: "Quiz"))
  end

  def update
    @quiz.update!(quiz_params)
    render_message(t("successfully_updated", entity: "Quiz"))
  end

  def bulk_destroy
    records_size = @quizzes.size
    if @quizzes.destroy_all
      render_message(t("successfully_deleted", count: records_size, entity: records_size > 1 ? "Quizzes" : "Quiz"))
    else
      render_error(t("Something went wrong!"))
    end
  end

  private

    def quiz_params
      params.require(:quiz).permit(:title)
    end

    def load_quiz!
      @quiz = current_user.quizzes.find(params[:id])
    end

    def load_quizzes
      @quizzes = current_user.quizzes.where(id: params[:ids])
      render_error(t("not_found", entity: "Quiz")) if @quizzes.empty?
    end
end
