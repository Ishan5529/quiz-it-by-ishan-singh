# frozen_string_literal: true

class AddDraftAndPublishedToQuizzes < ActiveRecord::Migration[7.1]
  def change
    add_column :quizzes, :isDraft, :boolean, default: true, null: false
    add_column :quizzes, :isPublished, :boolean, default: false, null: false
  end
end
