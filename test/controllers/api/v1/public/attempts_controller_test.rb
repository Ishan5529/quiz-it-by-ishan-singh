require "test_helper"

class Api::V1::Public::AttemptsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @quiz = create(:quiz)
    create(:published_quiz, quiz: @quiz)
    @user = create(:user, :admin)
    sign_in @user
    @question = create(:question, quiz: @quiz)
    @attempt = create(:attempt, quiz: @quiz, user: @user)
  end

  def test_index
    get api_v1_public_quiz_attempts_url(@quiz.slug), headers: headers(@user)
    assert_response :success
    assert_includes response_body["attempts"].map { |a| a["id"] }, @attempt.id
  end

  def test_show
    get api_v1_public_quiz_attempt_url(@quiz.slug, @attempt), headers: headers(@user)
    assert_response :success
    assert_equal @attempt.id, response_body["attempt"]["id"]
  end

  def test_create
    params = {
      attempt: {
        quiz_id: @quiz.id,
        user_id: @user.id,
        user_name: @user.name,
        user_email: @user.email,
        submission_time: Time.current,
        correct_answers: 0,
        wrong_answers: 0,
        unanswered: 0,
        status: "incomplete",
        questions: [
          {
            question_id: @question.id,
            selected_option: nil
          }
        ]
      }
    }
    assert_difference "Attempt.count", 1 do
      post api_v1_public_quiz_attempts_url(@quiz.slug), params: params, headers: headers(@user)
    end
    assert_response :success
  end

  def test_update
    question = @quiz.questions.first
    params = {
      attempt: {
        status: "completed",
        questions: [
          { question_id: question.id, selected_option: 1 }
        ]
      }
    }
    put api_v1_public_quiz_attempt_url(@quiz.slug, @attempt), params: params, headers: headers(@user)
    assert_response :success
    @attempt.reload
    assert_equal "completed", @attempt.status
  end

  def test_update_with_correct_answer
    options = ["Option A", "Option B", "Option C", "Option D"]
    correct_option = 2

    published_quiz = @quiz.published_quiz
    published_quiz_data = published_quiz.data
    published_question_id = published_quiz_data["questions"][0]["id"]

    published_quiz_data["questions"][0]["options"] = options
    published_quiz_data["questions"][0]["correct_option"] = correct_option
    published_quiz.update!(data: published_quiz_data)

    params = {
      attempt: {
        status: "completed",
        questions: [
          {
            question_id: published_question_id,
            selected_option: options[correct_option - 1]
          }
        ]
      }
    }

    put api_v1_public_quiz_attempt_url(@quiz.slug, @attempt), params: params, headers: headers(@user)
    assert_response :success

    @attempt.reload
    assert_equal 1, @attempt.correct_answers
    assert_equal 0, @attempt.wrong_answers
    assert_equal 0, @attempt.unanswered
  end

  def test_update_with_unanswered_question
    published_quiz = @quiz.published_quiz
    published_quiz_data = published_quiz.data
    published_question_id = published_quiz_data["questions"][0]["id"]

    options = ["Option A", "Option B", "Option C", "Option D"]
    published_quiz_data["questions"][0]["options"] = options
    published_quiz_data["questions"][0]["correct_option"] = 2
    published_quiz.update!(data: published_quiz_data)

    params = {
      attempt: {
        status: "completed",
        questions: [
          {
            question_id: published_question_id,
            selected_option: nil
          }
        ]
      }
    }

    put api_v1_public_quiz_attempt_url(@quiz.slug, @attempt), params: params, headers: headers(@user)
    assert_response :success

    @attempt.reload
    assert_equal 0, @attempt.correct_answers
    assert_equal 0, @attempt.wrong_answers
    assert_equal 1, @attempt.unanswered
  end

  def test_bulk_destroy
    a2 = create(:attempt, quiz: @quiz, user: @user)
    assert_difference "Attempt.count", -2 do
      post bulk_destroy_api_v1_public_quiz_attempts_url(@quiz.slug), params: { attempt_ids: [@attempt.id, a2.id] }, headers: headers(@user)
    end
    assert_response :success
  end

  def test_create_with_invalid_params
    params = { attempt: { status: "" } }
    post api_v1_public_quiz_attempts_url(@quiz.slug), params: params, headers: headers(@user)
    assert_response :unprocessable_entity
  end

  def test_filter_by_completed_status
    completed_attempt = create(:attempt, quiz: @quiz, user: @user, status: "completed")
    incomplete_attempt = create(:attempt, quiz: @quiz, user: @user, status: "incomplete")

    get api_v1_public_quiz_attempts_url(@quiz.slug),
        params: { status: "completed" },
        headers: headers(@user)

    assert_response :success

    attempt_ids = response_body["attempts"].map { |a| a["id"] }
    assert_includes attempt_ids, completed_attempt.id
    assert_not_includes attempt_ids, incomplete_attempt.id
  end

  def test_filter_by_incomplete_status
    completed_attempt = create(:attempt, quiz: @quiz, user: @user, status: "completed")
    incomplete_attempt = create(:attempt, quiz: @quiz, user: @user, status: "incomplete")

    get api_v1_public_quiz_attempts_url(@quiz.slug),
        params: { status: "incomplete" },
        headers: headers(@user)

    assert_response :success

    attempt_ids = response_body["attempts"].map { |a| a["id"] }
    assert_includes attempt_ids, incomplete_attempt.id
    assert_not_includes attempt_ids, completed_attempt.id
  end

  def test_filter_by_user_name
    attempt1 = create(:attempt, quiz: @quiz, user: @user, user_name: "John Doe")
    attempt2 = create(:attempt, quiz: @quiz, user: @user, user_name: "Jane Smith")

    get api_v1_public_quiz_attempts_url(@quiz.slug),
        params: { user_name: "John" },
        headers: headers(@user)

    assert_response :success

    attempt_ids = response_body["attempts"].map { |a| a["id"] }
    assert_includes attempt_ids, attempt1.id
    assert_not_includes attempt_ids, attempt2.id
  end

  def test_filter_by_multiple_criteria
    john_completed = create(:attempt, quiz: @quiz, user: @user,
                           user_name: "John Doe", status: "completed")
    john_incomplete = create(:attempt, quiz: @quiz, user: @user,
                            user_name: "John Doe", status: "incomplete")
    jane_completed = create(:attempt, quiz: @quiz, user: @user,
                           user_name: "Jane Smith", status: "completed")

    get api_v1_public_quiz_attempts_url(@quiz.slug),
        params: { user_name: "John", status: "completed" },
        headers: headers(@user)

    assert_response :success

    attempt_ids = response_body["attempts"].map { |a| a["id"] }
    assert_equal 1, attempt_ids.length
    assert_includes attempt_ids, john_completed.id
    assert_not_includes attempt_ids, john_incomplete.id
    assert_not_includes attempt_ids, jane_completed.id
  end
end
