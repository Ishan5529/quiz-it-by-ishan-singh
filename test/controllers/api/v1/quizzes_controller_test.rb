# frozen_string_literal: true

require "test_helper"

class Api::V1::QuizzesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user, :admin)
    sign_in @user
    @quiz = create(:quiz, user: @user)
  end

  def test_index
    get api_v1_quizzes_url, headers: headers(@user)
    assert_response :success
    assert_includes response_body["quizzes"].map { |q| q["id"] }, @quiz.id
  end

  def test_show
    get api_v1_quiz_url(@quiz.slug), headers: headers(@user)
    assert_response :success
    assert_equal @quiz.slug, response_body["quiz"]["slug"]
  end

  def test_create
    params = { quiz: attributes_for(:quiz).merge(category_id: create(:category).id) }
    assert_difference "Quiz.count", 1 do
      post api_v1_quizzes_url, params: params, headers: headers(@user)
    end
    assert_response :success
  end

  def test_bulk_destroy
    quiz2 = create(:quiz, user: @user)
    assert_difference "Quiz.count", -2 do
      post bulk_destroy_api_v1_quizzes_url, params: { slugs: [@quiz.slug, quiz2.slug] }, headers: headers(@user)
    end
    assert_response :success
  end

  def test_create_with_invalid_params
    params = { quiz: { title: "" } }
    post api_v1_quizzes_url, params: params, headers: headers(@user)
    assert_response :unprocessable_entity
  end

  def test_create_with_quiet_param
    params = {
      quiz: attributes_for(:quiz).merge(category_id: create(:category).id),
      quiet: true
    }

    assert_difference "Quiz.count", 1 do
      post api_v1_quizzes_url, params: params, headers: headers(@user)
    end

    assert_response :success
    assert response_body.key?("slug")
    assert_not response_body.key?("notice")
  end

  def test_filter_by_category
    category1 = create(:category, name: "Programming")
    category2 = create(:category, name: "Science")

    quiz1 = create(:quiz, user: @user, category: category1)
    quiz2 = create(:quiz, user: @user, category: category2)

    get api_v1_quizzes_url, params: { category: "Programming" }, headers: headers(@user)
    assert_response :success

    quiz_ids = response_body["quizzes"].map { |q| q["id"] }
    assert_includes quiz_ids, quiz1.id
    assert_not_includes quiz_ids, quiz2.id

    get api_v1_quizzes_url, params: { category: "Science" }, headers: headers(@user)
    assert_response :success

    quiz_ids = response_body["quizzes"].map { |q| q["id"] }
    assert_not_includes quiz_ids, quiz1.id
    assert_includes quiz_ids, quiz2.id
  end

  def test_filter_by_status
    draft_quiz = create(:quiz, user: @user, isDraft: true, isPublished: false)
    published_quiz = create(:quiz, user: @user, isDraft: false, isPublished: true)

    get api_v1_quizzes_url, params: { status: "draft" }, headers: headers(@user)
    assert_response :success

    quiz_ids = response_body["quizzes"].map { |q| q["id"] }
    assert_includes quiz_ids, draft_quiz.id
    assert_not_includes quiz_ids, published_quiz.id

    get api_v1_quizzes_url, params: { status: "published" }, headers: headers(@user)
    assert_response :success

    quiz_ids = response_body["quizzes"].map { |q| q["id"] }
    assert_not_includes quiz_ids, draft_quiz.id
    assert_includes quiz_ids, published_quiz.id
  end

  def test_filter_by_title
    quiz1 = create(:quiz, user: @user, title: "Ruby Programming")
    quiz2 = create(:quiz, user: @user, title: "Python Basics")

    get api_v1_quizzes_url, params: { title: "Ruby" }, headers: headers(@user)
    assert_response :success

    quiz_ids = response_body["quizzes"].map { |q| q["id"] }
    assert_includes quiz_ids, quiz1.id
    assert_not_includes quiz_ids, quiz2.id

    get api_v1_quizzes_url, params: { title: "ruby" }, headers: headers(@user)
    assert_response :success

    quiz_ids = response_body["quizzes"].map { |q| q["id"] }
    assert_includes quiz_ids, quiz1.id
  end

  def test_filter_by_multiple_criteria
    category1 = create(:category, name: "Programming")
    category2 = create(:category, name: "Science")

    quiz1 = create(:quiz, user: @user, title: "Ruby Programming", category: category1, isDraft: true)
    quiz2 = create(:quiz, user: @user, title: "Ruby Science", category: category2, isDraft: true)
    quiz3 = create(:quiz, user: @user, title: "Python Programming", category: category1, isPublished: true)

    get api_v1_quizzes_url, params: {
      category: "Programming",
      status: "draft",
      title: "Ruby"
    }, headers: headers(@user)

    assert_response :success

    quiz_ids = response_body["quizzes"].map { |q| q["id"] }
    assert_equal 1, quiz_ids.length
    assert_includes quiz_ids, quiz1.id
    assert_not_includes quiz_ids, quiz2.id
    assert_not_includes quiz_ids, quiz3.id
  end

  def test_update_quiz_success
    new_title = "Updated Quiz Title"
    put api_v1_quiz_url(@quiz.slug), params: { quiz: { title: new_title } }, headers: headers(@user)
    assert_response :success
    assert_equal new_title, @quiz.reload.title
    assert_equal t("successfully_updated", entity: "Quiz"), response_body["notice"]
    assert_equal @quiz.slug, response_body["slug"]
  end

  def test_update_quiz_failure
    put api_v1_quiz_url(@quiz.slug), params: { quiz: { title: "" } }, headers: headers(@user)
    assert_response :unprocessable_entity
    assert_includes response_body["error"], "Title"
  end

  def test_update_quiz_with_quiet_param
    new_title = "Quiet Update"
    put api_v1_quiz_url(@quiz.slug), params: { quiz: { title: new_title }, quiet: true }, headers: headers(@user)
    assert_response :success
    assert_equal new_title, @quiz.reload.title
    assert_nil response_body["notice"]
  end

  def test_show_returns_not_found_for_invalid_slug
    get api_v1_quiz_url("non-existent-slug"), headers: headers(@user)
    assert_response :not_found
    assert_match "Couldn't find Quiz", response_body["error"]
  end
end
