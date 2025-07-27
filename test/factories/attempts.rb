# frozen_string_literal: true

FactoryBot.define do
  factory :attempt do
    association :user
    association :quiz
    user_name { user.first_name }
    user_email { user.email }
    submission_time { Time.current }
    correct_answers { rand(1..5) }
    wrong_answers { rand(0..3) }
    unanswered { rand(0..2) }
    questions { [] }
    status { "incomplete" }
  end
end
