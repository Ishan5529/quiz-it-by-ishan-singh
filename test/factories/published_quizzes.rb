# frozen_string_literal: true

FactoryBot.define do
  factory :published_quiz do
    association :quiz
    data { {} }
  end
end
