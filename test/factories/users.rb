# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    email { Faker::Internet.unique.email }
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    password { "welcome" }
    password_confirmation { "welcome" }
    role { "standard" }

    trait :admin do
      role { "super_admin" }
    end
  end
end
