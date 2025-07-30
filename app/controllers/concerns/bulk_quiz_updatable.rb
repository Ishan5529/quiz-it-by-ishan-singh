# frozen_string_literal: true

module BulkQuizUpdatable
  extend ActiveSupport::Concern

  private

    def handle_bulk_publish(quizzes)
      failed_quizzes = []
      quizzes.each do |quiz|
        begin
          result = quiz.publish!
          failed_quizzes << quiz if result
          next
        end
      end

      if failed_quizzes.empty?
        render_json(
          notice: t("successfully_updated", count: quizzes.size, entity: "Quiz")
        )
      else
        render_message(
          t("failed_to_publish_quiz", title: failed_quizzes.map(&:title).join(", "), count: failed_quizzes.size),
          :ok,
          "error"
        )
      end
    end

    def handle_bulk_update(quizzes, attrs, quiet = false)
      quizzes.update_all(attrs)
      render_json(
        notice: t("successfully_updated", count: quizzes.size, entity: "Quiz")
      ) unless quiet
    end
end
