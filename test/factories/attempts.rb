# frozen_string_literal: true

FactoryBot.define do
  factory :attempt do
    association :user
    association :quiz
    user_name { user&.name }
    user_email { user&.email }
    submission_time { Time.current }
    correct_answers { rand(1..5) }
    wrong_answers { rand(0..3) }
    unanswered { rand(0..2) }
    questions {
      opts = [
        Faker::Lorem.sentence(word_count: 2),
        Faker::Lorem.sentence(word_count: 2),
        Faker::Lorem.sentence(word_count: 2)
      ]
      [
        {
          id: SecureRandom.uuid,
          title: Faker::Lorem.question,
          options: opts,
          correct_option: opts.sample
        }
      ]
    }
    status { "incomplete" }
  end
end
