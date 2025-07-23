# frozen_string_literal: true

class Api::V1::Public::QuizzesController < Api::V1::BaseController
  skip_before_action :authenticate_user_using_x_auth_token
  skip_before_action :authenticate_user!
  skip_before_action :verify_authenticity_token

  helper PublicQuizzesHelper

  def index
    @quizzes = Quiz.includes(:category, :published_quiz)
                   .where(isPublished: true)
                   .where.not(published_quiz: { data: nil })
  end

  def show
    @quiz = Quiz.includes(:category, :published_quiz)
                .where(isPublished: true)
                .find_by!(slug: params[:slug])
  end
end
