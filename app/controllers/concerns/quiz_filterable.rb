# frozen_string_literal: true

module QuizFilterable
  extend ActiveSupport::Concern

  included do
    private

      def filter_quizzes(data)
        if params[:category].present?
          category_names = Array(params[:category])
          data = data.joins(:category).where(categories: { name: category_names })
        end

        if params[:status].present?
          case params[:status]
          when "draft"
            data = data.where(isDraft: true)
          when "published"
            data = data.where(isPublished: true)
          when "completed"
            data = data.where(status: "completed")
          when "incomplete"
            data = data.where(status: "incomplete")
          end
        end

        data = data.where("quizzes.title ILIKE ?", "%#{params[:title]}%") if params[:title].present?
        data = data.where("attempts.user_name ILIKE ?", "%#{params[:user_name]}%") if params[:user_name].present?
        data
      end
  end
end
