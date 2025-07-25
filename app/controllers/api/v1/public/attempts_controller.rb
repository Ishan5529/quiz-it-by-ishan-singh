# frozen_string_literal: true

class Api::V1::Public::AttemptsController < Api::V1::BaseController
  include QuizFilterable
  include AttemptComputable

  skip_before_action :authenticate_user_using_x_auth_token
  skip_before_action :authenticate_user!
  skip_before_action :verify_authenticity_token
  before_action :set_quiz, only: %i[index create show update]

  def index
    @attempts = filter_quizzes(Attempt.where(quiz: @quiz).order(submission_time: :desc))
    @attempts = @attempts.page(params[:page]).per(params[:per_page] || 12)
  end

  def show
    @attempt = params[:preview].to_s == "true" ? Attempt.find_by(id: params[:id]) : Attempt.find(params[:id])
    render_json(attempt: @attempt)
    @attempt.destroy if params[:preview].to_s == "true" && @attempt.present?
  end

  def create
    attempt_attrs = build_attempt_attributes(
      attempt_params, @quiz, current_user, published_questions
    )
    attempt = Attempt.create!(attempt_attrs)
    render_json(attempt:)
  end

  def update
    attempt = Attempt.find(params[:id])
    attempt_attrs = build_attempt_attributes(
      attempt_params, @quiz, current_user, published_questions, update: true
    )
    attempt.update!(attempt_attrs)
    render_json(attempt:)
  end

  def bulk_destroy
    attempt_ids = params[:attempt_ids] || []
    attempts = Attempt.where(id: attempt_ids)
    attempts.destroy_all
    render_json(message: t("successfully_deleted", entity: "Submission", count: attempts.size)) unless params[:quiet] == "true"
  end

  private

    def set_quiz
      @quiz = Quiz.find_by!(slug: params[:quiz_slug] || params[:slug])
    end

    def attempt_params
      params.require(:attempt).permit(
        :status, questions: [:question_id, :selected_option]
      )
    end

    def published_questions
      @quiz.published_quiz&.data&.dig("questions") || []
    end
end
