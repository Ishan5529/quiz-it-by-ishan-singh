# frozen_string_literal: true

FactoryBot.define do
  factory :attempt do
    user_name { "MyString" }
    user_email { "MyString" }
    submission_time { "2025-07-21 18:11:59" }
    correct_answers { 1 }
    wrong_answers { 1 }
    unanswered { 1 }
    questions { "" }
    status { "MyString" }
    user { nil }
    quiz { nil }
  end
end
