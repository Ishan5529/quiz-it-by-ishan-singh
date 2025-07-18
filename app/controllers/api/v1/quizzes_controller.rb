# frozen_string_literal: true

class Api::V1::QuizzesController < Api::V1::BaseController
  before_action :load_quiz!, only: %i[update delete]
  before_action :load_quizzes, only: :bulk_destroy

  def index
    @quizzes = current_user.quizzes
      .includes(:questions)
      .order(updated_at: :desc)
    render
  end

  def show
    @quiz = current_user.quizzes.includes(:questions).find_by!(slug: params[:slug])
    render
  end

  def create
    new_quiz = current_user.quizzes.create!(quiz_params)
    if params.key?(:quiet)
      render_json({ slug: @quiz.slug })
      return
    end
    render_json({ notice: t("successfully_created", entity: "Quiz"), slug: new_quiz.slug })
  end

  def update
    @quiz.update!(quiz_params)
    if params.key?(:quiet)
      render_json({ slug: @quiz.slug })
      return
    end
    render_json({ notice: t("successfully_updated", entity: "Quiz"), slug: @quiz.slug })
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
      params.require(:quiz).permit(:title, :slug, :status, :category_id)
    end

    def load_quiz!
      @quiz = current_user.quizzes.find_by!(slug: params[:slug])
    end

    def load_quizzes
      @quizzes = current_user.quizzes.where(slug: params[:slugs])
      render_error(t("not_found", entity: "Quiz")) if @quizzes.empty?
    end
end
