# frozen_string_literal: true

class AddStatusToQuizzes < ActiveRecord::Migration[7.1]
  def change
    add_column :quizzes, :status, :string, null: false, default: "draft"
  end
end
