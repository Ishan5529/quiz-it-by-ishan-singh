# frozen_string_literal: true

class Attempt < ApplicationRecord
  scope :belonging_to, ->(quiz_id) { where(quiz_id: Quiz.find(quiz_id)) }

  enum status: { incomplete: "Incomplete", completed: "Completed" }

  belongs_to :user
  belongs_to :quiz

  validates :user_name, :user_email, :submission_time, :status, presence: true
  validates :questions, presence: true
end
