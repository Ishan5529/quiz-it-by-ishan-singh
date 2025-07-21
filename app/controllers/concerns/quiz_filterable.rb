# frozen_string_literal: true

module QuizFilterable
  extend ActiveSupport::Concern

  included do
    private

      def filter_quizzes(quizzes)
        if params[:category].present?
          category_names = Array(params[:category])
          quizzes = quizzes.joins(:category).where(categories: { name: category_names })
        end

        if params[:status].present?
          case params[:status]
          when "draft"
            quizzes = quizzes.where(isDraft: true)
          when "published"
            quizzes = quizzes.where(isPublished: true)
          end
        end

        quizzes = quizzes.where("quizzes.title ILIKE ?", "%#{params[:title]}%") if params[:title].present?
        quizzes
      end
  end
end
