# frozen_string_literal: true

class Api::V1::Quizzes::DraftsController < Api::V1::BaseController
  def discard
    quizzes = current_user.quizzes.where(slug: params[:slugs])
    quizzes.each { |quiz| restore_quiz_from_published(quiz) }
    render_message(t("successfully_deleted", entity: "Draft", count: quizzes.size))
  end

  private

    def restore_quiz_from_published(quiz)
      return unless quiz.published_quiz&.data.present?

      published = quiz.published_quiz.data
      quiz.questions.destroy_all
      (published["questions"] || []).each do |question|
        quiz.questions.create!(
          title: question["title"],
          correct_option: question["correct_option"],
          position: question["position"],
          option1: question["options"][0],
          option2: question["options"][1],
          option3: question["options"][2],
          option4: question["options"][3],
          option5: question["options"][4],
          option6: question["options"][5]
        )
      end
      quiz.update!(isDraft: false)
    end
end
