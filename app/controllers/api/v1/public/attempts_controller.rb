# frozen_string_literal: true

class Api::V1::Public::AttemptsController < Api::V1::BaseController
  include QuizFilterable

  skip_before_action :authenticate_user_using_x_auth_token
  skip_before_action :authenticate_user!
  skip_before_action :verify_authenticity_token
  before_action :set_quiz, only: %i[index create show update]

  def index
    @attempts = Attempt.where(quiz: @quiz)
    @attempts = filter_quizzes(@attempts)

    @attempts = @attempts.page(params[:page]).per(params[:per_page] || 12)
  end

  def show
    if params[:preview].to_s == "true"
      @attempt = Attempt.find_by(id: params[:id])
    else
      @attempt = Attempt.find(params[:id])
    end
    render_json(attempt: @attempt)
    if params[:preview].to_s == "true"
      @attempt.destroy if @attempt.present?
    end
  end

  def create
    questions = []
    published_questions = @quiz.published_quiz&.data&.dig("questions") || []
    published_questions.each do |pq|
      questions << {
        question_id: pq["id"],
        selected_option: nil,
        options: pq["options"] || [],
        title: pq["title"],
        correct_option: pq["correct_option"].to_s
      }
    end

    unanswered = published_questions.count
    correct = 0
    wrong = 0

    attempt_attrs = attempt_params.merge(
      user: current_user,
      user_name: current_user.name,
      user_email: current_user.email,
      quiz: @quiz,
      submission_time: Time.current,
      correct_answers: correct,
      wrong_answers: wrong,
      unanswered: unanswered,
      questions: questions
    )

    attempt = Attempt.create!(attempt_attrs)
    render_json(attempt:)
  end

  def update
    questions = attempt_params[:questions] || []
    published_questions = @quiz.published_quiz&.data&.dig("questions") || []

    correct = 0
    wrong = 0
    unanswered = 0

    questions.each do |q|
      published_question = published_questions.find { |pq| pq["id"].to_s == q["question_id"].to_s }

      options = published_question ? published_question["options"] || [] : []
      correct_option = published_question["correct_option"].to_s

      q["options"] = options
      q["title"] = published_question["title"]
      q["correct_option"] = correct_option

      selected_option_index = options.index(q["selected_option"])&.+(1)


      if q["selected_option"].blank?
        unanswered += 1
        q["selected_option"] = nil
      elsif published_question && selected_option_index.to_s == correct_option
        correct += 1
        q["selected_option"] = selected_option_index.to_s
      else
        wrong += 1
        q["selected_option"] = selected_option_index.to_s
      end
    end

    attempt_attrs = attempt_params.merge(
      quiz: @quiz,
      submission_time: Time.current,
      correct_answers: correct,
      wrong_answers: wrong,
      unanswered: unanswered,
      questions: questions
    )

    attempt = Attempt.find(params[:id])
    attempt = attempt.update!(attempt_attrs)
    render_json(attempt:)
  end

  def bulk_destroy
    attempt_ids = params[:attempt_ids] || []
    attempts = Attempt.where(id: attempt_ids)
    attempts.destroy_all
    render_json(message: "Submissions deleted successfully") unless params[:quiet] == "true"
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
end
