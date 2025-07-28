# frozen_string_literal: true

require "test_helper"

class Quizzes::PublishServiceTest < ActiveSupport::TestCase
  def setup
    @category = create(:category, name: "Test Category")
    @quiz = create(:quiz, title: "Test Quiz", category: @category)

    @question1 = create(
      :question,
      quiz: @quiz,
      title: "Question 1",
      option1: "Option 1A",
      option2: "Option 1B",
      option3: "Option 1C",
      option4: "Option 1D",
      correct_option: 2,
      position: 1
    )

    @question2 = create(
      :question,
      quiz: @quiz,
      title: "Question 2",
      option1: "Option 2A",
      option2: "Option 2B",
      option3: nil,
      option4: "",
      correct_option: 1,
      position: 2
    )
  end

  def test_publish_creates_published_quiz_when_none_exists
    assert_nil @quiz.published_quiz
    assert_difference "PublishedQuiz.count", 1 do
      Quizzes::PublishService.new(@quiz).publish!
    end

    @quiz.reload
    assert @quiz.isPublished
    assert_not @quiz.isDraft

    published_quiz = @quiz.published_quiz
    published_data = published_quiz.data

    assert_equal @quiz.title, published_data["title"]
    assert_equal @quiz.slug, published_data["slug"]
    assert_equal @category.id, published_data["category"]["id"]
    assert_equal @category.name, published_data["category"]["name"]

    assert_equal 2, published_data["questions"].size

    q1_data = published_data["questions"].find { |q| q["id"] == @question1.id }
    assert_equal "Question 1", q1_data["title"]
    assert_equal ["Option 1A", "Option 1B", "Option 1C", "Option 1D"], q1_data["options"]
    assert_equal 2, q1_data["correct_option"]
    assert_equal 1, q1_data["position"]

    q2_data = published_data["questions"].find { |q| q["id"] == @question2.id }
    assert_equal "Question 2", q2_data["title"]
    assert_equal ["Option 2A", "Option 2B"], q2_data["options"]
    assert_equal 1, q2_data["correct_option"]
    assert_equal 2, q2_data["position"]
  end

  def test_publish_updates_existing_published_quiz
    Quizzes::PublishService.new(@quiz).publish!

    @quiz.update!(title: "Updated Quiz Title")
    @question1.update!(title: "Updated Question", option3: "New Option C")

    assert_no_difference "PublishedQuiz.count" do
      Quizzes::PublishService.new(@quiz).publish!
    end

    @quiz.reload
    published_data = @quiz.published_quiz.data

    assert_equal "Updated Quiz Title", published_data["title"]
    q1_data = published_data["questions"].find { |q| q["id"] == @question1.id }
    assert_equal "Updated Question", q1_data["title"]
    assert_equal "New Option C", q1_data["options"][2]
  end
end
