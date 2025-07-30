# frozen_string_literal: true

class Api::V1::Quizzes::DraftsController < Api::V1::BaseController
  include QuizDraftable

  def discard
    quizzes = current_user.quizzes.where(slug: params[:slugs])
    quizzes.each { |quiz| restore_quiz_from_published(quiz) }
    render_message(t("successfully_deleted", entity: "Draft", count: quizzes.size))
  end
end
