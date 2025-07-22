# frozen_string_literal: true

class CreateAttempts < ActiveRecord::Migration[7.1]
  def change
    create_table :attempts, id: :uuid do |t|
      t.string :user_name, null: false
      t.string :user_email, null: false
      t.datetime :submission_time, null: false
      t.integer :correct_answers, default: 0, null: false
      t.integer :wrong_answers, default: 0, null: false
      t.integer :unanswered, default: 0, null: false
      t.jsonb :questions, null: false, default: []
      t.string :status, null: false, default: "incomplete"
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.references :quiz, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end

    add_index :attempts, :questions, using: :gin
  end
end
