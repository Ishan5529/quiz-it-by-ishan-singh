# frozen_string_literal: true

FactoryBot.define do
  factory :quiz do
    association :user
    association :category
    title { Faker::Lorem.sentence(word_count: 3) }
  end
end
