# frozen_string_literal: true

class Api::V1::Public::AttemptsController < Api::V1::BaseController
  skip_before_action :authenticate_user_using_x_auth_token
  skip_before_action :authenticate_user!
  skip_before_action :verify_authenticity_token
  before_action :set_quiz

  def index
    @attempts = Attempt.where(quiz: @quiz)
    render json: @attempts
  end

  def show
    @attempt = Attempt.find(params[:id])
    render json: @attempt
  end

  def create
    questions = attempt_params[:questions] || []
    correct = 0
    wrong = 0
    unanswered = 0

    questions.each do |q|
      question = Question.find_by(id: q["question_id"])
      if q["selected_option"].blank?
        unanswered += 1
      elsif question && q["selected_option"].to_s == question.correct_option.to_s
        correct += 1
      else
        wrong += 1
      end
    end

    attempt_attrs = attempt_params.merge(
      user: current_user,
      # user_id: "db0e8ad9-a99c-4736-b453-c2ad8e7ae609",
      user_name: current_user.name,
      # user_name: "Oliver Smith",
      user_email: current_user.email,
      # user_email: "oliver@example.com",
      quiz: @quiz,
      submission_time: Time.current,
      correct_answers: correct,
      wrong_answers: wrong,
      unanswered: unanswered
    )

    if params[:preview].to_s == "true"
      attempt = Attempt.new(attempt_attrs)
      render json: { notice: "Preview attempt (not saved)", attempt: attempt.as_json }, status: :ok
    else
      attempt = Attempt.create!(attempt_attrs)
      render json: { notice: "Attempt saved", attempt: attempt.as_json }, status: :created
    end
  end

  private

    def set_quiz
      @quiz = Quiz.find_by!(slug: params[:quiz_slug] || params[:slug])
    end

    def attempt_params
      params.require(:attempt).permit(
        :user_name, :user_email, :status, questions: [:question_id, :selected_option]
      )
    end
end
