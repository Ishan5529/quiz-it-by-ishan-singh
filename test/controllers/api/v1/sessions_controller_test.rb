# frozen_string_literal: true

require "test_helper"

class Api::V1::SessionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @admin = create(:user, :admin)
  end

  def test_valid_email_and_password_should_be_able_to_log_in
    post api_v1_login_url, params: { user: { email: @admin.email, password: "welcome" } }, as: :json

    assert_response :success
  end

  def test_wrong_combination_of_email_and_password_should_not_be_able_to_log_in
    non_existent_email = "this_email_does_not_exist_in_db@example.email"

    post api_v1_login_url, params: { user: { email: non_existent_email, password: "welcome" } }, as: :json

    assert_response 401
    assert_equal response_body["error"], t("invalid_credentials")
  end

  def test_should_return_auth_token
    post api_v1_login_url, params: { user: { email: @admin.email, password: "welcome" } }, as: :json

    assert_response :success
    assert response_body["auth_token"]
  end

  def test_should_be_able_to_log_out
    post api_v1_login_url, params: { user: { email: @admin.email, password: "welcome" } }, as: :json
    assert_response :success
    token = response_body["auth_token"]

    delete api_v1_logout_url, headers: { "X-Auth-Token" => token }
    assert_response :success

    # Try to access a protected endpoint with the same token
    get api_v1_quizzes_url, headers: { "X-Auth-Token" => token }
    assert_response :unauthorized
  end
end
