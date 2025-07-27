# frozen_string_literal: true

FactoryBot.define do
  factory :quiz do
    association :user
    association :category
    title { Faker::Lorem.sentence(word_count: 3) }
    # slug { Faker::Internet.unique.slug }
    # isDraft { false }
    # isPublished { true }
  end
end
