# frozen_string_literal: true

class CreateQuestions < ActiveRecord::Migration[7.1]
  def change
    create_table :questions, id: :uuid do |t|
      t.string :title, null: false
      t.text :option1, null: false
      t.text :option2, null: false
      t.text :option3
      t.text :option4
      t.text :option5
      t.text :option6
      t.integer :correct_option, null: false
      t.references :quiz, type: :uuid, null: false, foreign_key: true
      t.integer :position, null: false, default: 0

      t.timestamps
    end
  end
end
