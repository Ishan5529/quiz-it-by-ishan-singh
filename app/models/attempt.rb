# frozen_string_literal: true

class Attempt < ApplicationRecord
  enum status: { incomplete: "Incomplete", completed: "Completed" }

  belongs_to :user
  belongs_to :quiz

  validates :user_name, :user_email, :submission_time, :status, presence: true
  validates :questions, presence: true
end
