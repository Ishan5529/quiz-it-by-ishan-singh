# frozen_string_literal: true

require "test_helper"

class ApplicationHelperTest < ActionView::TestCase
  def setup
    @user = create(:user)
    @admin = create(:user, role: "super_admin")
    @controller = ApplicationController.new
  end

  def test_get_client_props_returns_user_and_is_admin
    stubs(:current_user).returns(@admin)
    props = get_client_props
    assert_equal @admin, props[:user]
    assert props[:is_admin]
  end

  def test_get_client_props_returns_nil_user_and_false_is_admin_if_not_signed_in
    stubs(:current_user).returns(nil)
    props = get_client_props
    assert_nil props[:user]
    refute props[:is_admin]
  end

  def test_super_admin_signed_in_returns_true_for_super_admin
    stubs(:user_signed_in?).returns(true)
    stubs(:current_user).returns(@admin)
    assert super_admin_signed_in?
  end

  def test_super_admin_signed_in_returns_false_for_normal_user
    stubs(:user_signed_in?).returns(true)
    stubs(:current_user).returns(@user)
    refute super_admin_signed_in?
  end

  def test_nav_link_renders_active_class_when_current_page
    stubs(:current_page?).with("/dashboard").returns(true)
    html = nav_link("Dashboard", "/dashboard")
    assert_includes html, "active"
    assert_includes html, "Dashboard"
  end

  def test_nav_link_renders_without_active_class_when_not_current_page
    stubs(:current_page?).with("/dashboard").returns(false)
    html = nav_link("Dashboard", "/dashboard")
    refute_includes html, "active"
  end

  def test_nav_link_sets_title_option_if_not_present
    stubs(:current_page?).with("/dashboard").returns(false)
    html = nav_link("Dashboard", "/dashboard")
    assert_includes html, "title=\"Dashboard\""
  end

  def test_nav_link_does_not_override_title_option_if_present
    stubs(:current_page?).with("/dashboard").returns(false)
    html = nav_link("Dashboard", "/dashboard", false, { title: "Custom" })
    assert_includes html, "title=\"Custom\""
  end
end
