# frozen_string_literal: true

class AddCategoryIdToQuizzes < ActiveRecord::Migration[7.1]
  def change
    add_reference :quizzes, :category, type: :uuid, null: false, foreign_key: true
  end
end
