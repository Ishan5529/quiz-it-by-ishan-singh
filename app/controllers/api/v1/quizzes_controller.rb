# frozen_string_literal: true

class Api::V1::QuizzesController < Api::V1::BaseController
  include QuizFilterable

  before_action :load_quiz!, only: %i[delete]
  before_action :load_quizzes, only: %i[bulk_destroy bulk_update]

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
    new_quiz = current_user.quizzes.create!(quiz_params)
    if params.key?(:quiet)
      render_json({ slug: @quiz.slug })
      return
    end
    render_json({ notice: t("successfully_created", entity: "Quiz"), slug: new_quiz.slug })
  end

  def bulk_update
    attrs = quiz_params.to_h
    if attrs["isPublished"] == true || attrs[:isPublished] == true
      @quizzes.each do |quiz|
        quiz.publish!
      end
    else
      @quizzes.update_all(attrs)
    end
    unless params.key?(:quiet)
      render_json(
        {
          notice: t(
            "successfully_updated", count: @quizzes.size,
            entity: @quizzes.size > 1 ? "Quizzes" : "Quiz")
        })
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
