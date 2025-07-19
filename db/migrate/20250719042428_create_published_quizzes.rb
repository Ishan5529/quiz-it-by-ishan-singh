# frozen_string_literal: true

class CreatePublishedQuizzes < ActiveRecord::Migration[7.1]
  def change
    create_table :published_quizzes, id: :uuid do |t|
      t.references :quiz, null: false, foreign_key: true, type: :uuid
      t.jsonb :data

      t.timestamps
    end
  end
end
