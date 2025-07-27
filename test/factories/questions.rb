# frozen_string_literal: true

FactoryBot.define do
  factory :question do
    association :quiz
    title { Faker::Lorem.question }
    option1 { Faker::Lorem.word }
    option2 { Faker::Lorem.word }
    option3 { Faker::Lorem.word }
    option4 { Faker::Lorem.word }
    option5 { nil }
    option6 { nil }
    correct_option { 1 }
    position { 0 }
  end
end
