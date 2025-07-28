# frozen_string_literal: true

require "test_helper"

class Api::V1::QuestionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user, :admin)
    sign_in @user
    @quiz = create(:quiz, user: @user)
    @question = create(:question, quiz: @quiz)
  end

  def test_index
    get api_v1_quiz_questions_url(@quiz.slug), headers: headers(@user)
    assert_response :success
    assert_includes response_body["questions"].map { |q| q["id"] }, @question.id
  end

  def test_show
    get api_v1_quiz_question_url(@quiz.slug, @question), headers: headers(@user)
    assert_response :success
    assert_equal @question.id, response_body["question"]["id"]
  end

  def test_create
    params = { question: { title: "Updated", options: ["opt1", "opt2"], position: 1, correct_option: 1 } }
    assert_difference "Question.count", 1 do
      post api_v1_quiz_questions_url(@quiz.slug), params: params, headers: headers(@user)
    end
    assert_response :success
  end

  def test_update
    patch api_v1_quiz_question_url(@quiz.slug, @question),
      params: { question: { title: "Updated", options: ["opt1", "opt2"] } },
      headers: headers(@user)
    assert_response :success
    @question.reload
    assert_equal "Updated", @question.title
  end

  def test_bulk_destroy
    q2 = create(:question, quiz: @quiz)
    assert_difference "Question.count", -2 do
      post bulk_destroy_api_v1_quiz_questions_url(@quiz.slug), params: { ids: [@question.id, q2.id] },
        headers: headers(@user)
    end
    assert_response :success
  end

  def test_create_with_invalid_params
    params = { question: { title: "" } }
    post api_v1_quiz_questions_url(@quiz.slug), params: params, headers: headers(@user)
    assert_response :unprocessable_entity
  end

  def test_create_with_quiet_param
    params = {
      question: {
        title: "Quiet Question",
        options: ["opt1", "opt2"],
        position: 1,
        correct_option: 1
      },
      quiet: true
    }
    assert_difference "Question.count", 1 do
      post api_v1_quiz_questions_url(@quiz.slug), params: params, headers: headers(@user)
    end
    assert_response :success
    assert response_body.key?("question")
    assert_not response_body.key?("notice")
  end
end
