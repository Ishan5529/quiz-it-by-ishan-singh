# frozen_string_literal: true

module Api
  module V1
    module Quizzes
      class BulkUpdateController < Api::V1::BaseController
        include QuizFilterable
        include BulkQuizUpdatable

        before_action :load_quizzes

        def update
          attrs = quiz_params.to_h
          if ActiveModel::Type::Boolean.new.cast(attrs["isPublished"])
            handle_bulk_publish(@quizzes)
          else
            handle_bulk_update(@quizzes, attrs, params[:quiet])
          end
        end

        private

          def quiz_params
            params.require(:quiz).permit(
              :title, :slug, :status, :category_id, :category, :isDraft, :isPublished)
          end

          def load_quizzes
            @quizzes = current_user.quizzes.where(slug: params[:slugs])
            render_error(t("not_found", entity: "Quiz")) if @quizzes.empty?
          end
      end
    end
  end
end
