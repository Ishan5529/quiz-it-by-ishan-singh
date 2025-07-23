# frozen_string_literal: true

class Api::V1::UsersController < Api::V1::BaseController
  skip_before_action :authenticate_user!, only: :create
  skip_before_action :authenticate_user_using_x_auth_token, only: :create

  before_action :load_user!, only: %i[show destroy]

  def show
    render_json(@user)
  end

  def create
    user = User.new(user_params)
    if user.invalid? && params[:quiet].to_s == "true"
      if user.errors[:email].any? { |e| e.to_s.downcase.include?("taken") }
        return
      end
    end

    user = User.create!(user_params)

    if params[:quiet].to_s == "true"
      render_json({ user:, auth_token: user.authentication_token })
      return
    end

    render_message(
      t("signup_successful"),
      :ok,
      { user:, auth_token: user.authentication_token }
    )
  end

  def destroy
    @user.destroy!
    render_message(t("successfully_deleted", count: 1, entity: "User"))
  end

  private

    def load_user!
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:email, :first_name, :last_name, :password, :password_confirmation, :role)
    end
end
