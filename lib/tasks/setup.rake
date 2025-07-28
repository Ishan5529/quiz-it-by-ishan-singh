# frozen_string_literal: true

desc "drops the db, creates db, migrates db and populates sample data"
task setup: [:environment, "db:drop", "db:create", "db:migrate"] do
  Rake::Task["reset_and_populate_sample_data"].invoke if Rails.env.development?
end

desc "Populates sample data without resetting the database first"
task populate_sample_data: [:environment] do
  create_sample_data!
  puts "sample data has been added."
end

desc "Populates sample data without after resetting the database"
task reset_and_populate_sample_data: [:environment] do
  if Rails.env.production?
    puts "Skipping deleting and populating sample data"
  elsif Rails.env.staging?
    puts "Skipping deleting and populating sample data"
  else
    delete_all_records_from_all_tables
    Rake::Task["populate_sample_data"].invoke
  end
end

#
# DO NOT CHANGE ANYTHING IN THIS METHOD
# This is last layer of defense against deleting data in production
# If you need to delete data in staging or in production
# please execute the command manually and do not change this method
#
def delete_all_records_from_all_tables
  if Rails.env.production?
    raise "deleting all records in production is not allowed"
  else
    Rake::Task["db:schema:load"].invoke
  end
end

def create_sample_data!
  admin = create_user!(email: "oliver@example.com", role: "super_admin")
  user1 = create_user!(email: "luna@example.com", first_name: "Luna", role: "standard")
  user2 = create_user!(email: "sam@example.com", first_name: "Sam", role: "standard")
  puts "Created users: #{admin.email}, #{user1.email}, #{user2.email}"

  categories = []
  categories << Category.create!(name: "Programming")
  categories << Category.create!(name: "Science")
  categories << Category.create!(name: "History")

  puts "Created #{categories.size} categories"

  quizzes = []
  categories.each do |category|
    2.times do |i|
      is_published = [true, false].sample
      is_draft = !is_published

      quiz = Quiz.create!(
        title: "#{category.name} Quiz #{i+1}",
        # slug: "#{category.name.parameterize}-quiz-#{i+1}",
        category: category,
        user: admin,
        isDraft: is_draft,
        isPublished: is_published
      )

      quizzes << quiz

      5.times do |j|
        question = Question.create!(
          title: "#{category.name} Question #{j+1}",
          quiz: quiz,
          position: j,
          option1: "Option A",
          option2: "Option B",
          option3: "Option C",
          option4: "Option D",
          correct_option: rand(1..4)
        )
      end

      if is_published
        Quizzes::PublishService.new(quiz).publish!
      end
    end
  end

  puts "Created #{quizzes.size} quizzes with 5 questions each"

  quizzes_for_attempts = quizzes.select(&:isPublished).sample(3)

  quizzes_for_attempts.each do |quiz|
    next unless quiz.published_quiz

    2.times do |i|
      user = [user1, user2].sample

      published_data = quiz.published_quiz.data
      question_objs = published_data["questions"]

      questions_data = question_objs.map do |question|
        # 80% chance of answering
        selected =
          if rand < 0.8
            # 60% chance correct, else random wrong
            rand < 0.6 ? question["correct_option"].to_s : ((question["correct_option"].to_i % 4) + 1).to_s
          else
            nil
          end

        {
          question_id: question["id"],
          title: question["title"],
          options: question["options"],
          correct_option: question["correct_option"].to_s,
          selected_option: selected
        }
      end

      attempt = Attempt.create!(
        quiz: quiz,
        user: user,
        user_name: "#{user.first_name} #{user.last_name}",
        user_email: user.email,
        submission_time: Time.current - i.days,
        status: "completed",
        questions: questions_data
      )

      correct = questions_data.count { |q| q[:selected_option] == q[:correct_option] }
      unanswered = questions_data.count { |q| q[:selected_option].nil? }
      wrong = questions_data.length - correct - unanswered

      attempt.update!(
        correct_answers: correct,
        wrong_answers: wrong,
        unanswered: unanswered
      )
    end
  end

  puts "Created attempts for #{quizzes_for_attempts.count} quizzes"
end

def create_user!(options = {})
  user_attributes = {
    first_name: "Oliver",
    last_name: "Smith",
    password: "welcome",
    password_confirmation: "welcome",
    role: "standard"
  }
  attributes = user_attributes.merge options
  User.create! attributes
end
