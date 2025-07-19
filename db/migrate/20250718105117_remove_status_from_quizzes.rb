# frozen_string_literal: true

class RemoveStatusFromQuizzes < ActiveRecord::Migration[7.1]
  def change
    remove_column :quizzes, :status, :string
  end
end
