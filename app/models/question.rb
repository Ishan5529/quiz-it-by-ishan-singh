# frozen_string_literal: true

class Question < ApplicationRecord
  belongs_to :quiz

  validates :title, :option1, :option2, :correct_option, :quiz_id, presence: true
  validates :correct_option, inclusion: { in: 1..6 }
  validates :position, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
end
