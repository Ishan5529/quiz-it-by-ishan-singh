# frozen_string_literal: true

require "test_helper"

class ApplicationControllerTest < ActionController::TestCase
  include Devise::Test::ControllerHelpers

  class DummyController < ApplicationController
    before_action :ensure_current_user_is_superadmin!

    def index
      render plain: "OK"
    end
  end

  tests DummyController

  def setup
    @routes = ActionDispatch::Routing::RouteSet.new
    @routes.draw { get "dummy" => "application_controller_test/dummy#index" }
    @super_admin = create(:user, role: "super_admin")
    @user = create(:user)
  end

  def test_super_admin_can_access
    sign_in @super_admin
    get :index
    assert_response :success
    assert_equal "OK", response.body
  end

  def test_non_super_admin_is_redirected_with_forbidden_status
    sign_in @user
    get :index
    assert_response :forbidden
    assert_equal "Unauthorized Access!", flash[:alert]
  end

  def test_unauthenticated_user_is_redirected_to_login
    get :index
    assert_response :redirect
    assert_match %r{/devise/users/sign_in}, response.redirect_url
  end
end
