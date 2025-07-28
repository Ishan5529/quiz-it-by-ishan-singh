# frozen_string_literal: true

class Api::V1::OrganizationsController < Api::V1::BaseController
  before_action :authenticate_user!, only: %i[update]
  skip_before_action :authenticate_user_using_x_auth_token, only: %i[show]
  before_action :load_organization, only: %i[show update]

  def show
    render json: { organization: @organization }
  end

  def update
    @organization.update!(organization_params)
    render json: { organization: @organization }
  end

  private

    def organization_params
      params.require(:organization).permit(:name)
    end

    def load_organization
      @organization = Organization.first
      render_error(t("not_found", entity: "Organization"), :not_found) unless @organization
    end
end
