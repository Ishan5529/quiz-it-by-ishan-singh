# frozen_string_literal: true

FactoryBot.define do
  factory :published_quiz do
    association :quiz
    data {
      {
        slug: quiz.slug,
        title: quiz.title,
        category: {
          id: quiz.category&.id || SecureRandom.uuid,
          name: quiz.category&.name || "General",
          created_at: quiz.category&.created_at || 1.day.ago,
          updated_at: quiz.category&.updated_at || Time.current
        },
        questions: [
          {
            id: SecureRandom.uuid,
            title: Faker::Lorem.sentence(word_count: 3),
            options: [Faker::Lorem.sentence(word_count: 2), Faker::Lorem.sentence(word_count: 2),
Faker::Lorem.sentence(word_count: 2)],
            position: 0,
            correct_option: 1
          },
        ]
      }
    }
  end
end
