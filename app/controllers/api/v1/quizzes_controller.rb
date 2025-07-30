# frozen_string_literal: true

class Api::V1::QuizzesController < Api::V1::BaseController
  include QuizFilterable

  before_action :load_quiz!, only: %i[show update]
  before_action :load_quizzes, only: %i[bulk_destroy]

  def index
    @quizzes = current_user.quizzes
      .includes(:category, :questions, :published_quiz)
      .order(updated_at: :desc)

    @quizzes = filter_quizzes(@quizzes)

    @quizzes = @quizzes.page(params[:page]).per(params[:per_page] || 12)
    render
  end

  def show
    @quiz = current_user.quizzes.find_by!(slug: params[:slug])
    render
  end

  def create
    quiz_attributes = quiz_params.to_h
    quiz_attributes[:category_id] ||= Category.first&.id
    new_quiz = current_user.quizzes.create!(quiz_attributes)
    if params.key?(:quiet)
      render_json({ slug: new_quiz.slug })
      return
    end
    render_json({ notice: t("successfully_created", entity: "Quiz"), slug: new_quiz.slug })
  end

  def update
    if @quiz.update(quiz_params)
      render_json({ notice: t("successfully_updated", entity: "Quiz"), slug: @quiz.slug }) unless params.key?(:quiet)
    else
      render_error(@quiz.errors.full_messages)
    end
  end

  def bulk_destroy
    records_size = @quizzes.size
    if @quizzes.destroy_all
      render_message(t("successfully_deleted", count: records_size, entity: records_size > 1 ? "Quizzes" : "Quiz"))
    else
      render_error(t("something_went_wrong"))
    end
  end

  private

    def quiz_params
      params.require(:quiz).permit(
        :title, :slug, :status, :category_id, :category, :isDraft, :isPublished)
    end

    def load_quiz!
      @quiz = current_user.quizzes.find_by!(slug: params[:slug])
    end

    def load_quizzes
      @quizzes = current_user.quizzes.where(slug: params[:slugs])
      render_error(t("not_found", entity: "Quiz")) if @quizzes.empty?
    end
end
