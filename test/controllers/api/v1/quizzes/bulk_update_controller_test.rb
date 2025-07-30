# frozen_string_literal: true

require "test_helper"

class Api::V1::Quizzes::BulkUpdateControllerTest < ActionDispatch::IntegrationTest
  class DummyController < Api::V1::Quizzes::BulkUpdateController
    public :assign_category_id_from_name
  end

  def setup
    @user = create(:user, :admin)
    sign_in @user
    @quiz = create(:quiz, user: @user)
    @dummy_controller = DummyController.new
    @category = Category.create!(name: "History")
  end

  def test_bulk_update
    quiz2 = create(:quiz, user: @user)
    put bulk_update_api_v1_quizzes_url, params: { slugs: [@quiz.slug, quiz2.slug], quiz: { isPublished: false } },
      headers: headers(@user)
    assert_response :success
    assert_not Quiz.find(@quiz.id).isPublished
    assert_not Quiz.find(quiz2.id).isPublished
  end

  def test_bulk_update_with_publish_action
    quiz2 = create(:quiz, user: @user)

    refute @quiz.isPublished
    refute quiz2.isPublished

    Quizzes::PublishService.any_instance.expects(:publish!).twice

    put bulk_update_api_v1_quizzes_url,
      params: {
        slugs: [@quiz.slug, quiz2.slug],
        quiet: true,
        quiz: { isPublished: true, isDraft: false }
      },
      headers: headers(@user)

    assert_response :success
  end

  def test_bulk_update_publish_fails_for_quiz_with_no_questions
    quiz_without_questions = create(:quiz, user: @user)
    quiz_with_questions = create(:quiz, user: @user)
    create(:question, quiz: quiz_with_questions)

    put bulk_update_api_v1_quizzes_url,
      params: {
        slugs: [quiz_without_questions.slug, quiz_with_questions.slug],
        quiz: { isPublished: true, isDraft: false }
      },
      headers: headers(@user)

    assert_response :success
    assert_includes response_body["notice"], "Failed to publish the quiz"
    assert_includes response_body["notice"], quiz_without_questions.title
  end

  # Concern unit tests
  def test_assigns_category_id_from_name
    attrs = { "category" => "History", "title" => "Quiz" }
    result = @dummy_controller.assign_category_id_from_name(attrs)
    assert_equal @category.id, result["category_id"]
    assert_nil result["category"]
  end

  def test_returns_attrs_unchanged_if_no_category
    attrs = { "title" => "Quiz" }
    result = @dummy_controller.assign_category_id_from_name(attrs)
    assert_equal attrs, result
  end

  def test_assigns_nil_if_category_name_not_found
    attrs = { "category" => "Nonexistent" }
    result = @dummy_controller.assign_category_id_from_name(attrs)
    assert_nil result["category_id"]
    assert_nil result["category"]
  end
end
