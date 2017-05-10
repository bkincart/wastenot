class Api::V1::CurrentuserController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def index
    @current_user = current_user
    @current_user_type = current_user.type
    render json: {
      current_user: @current_user,
      current_user_type: @current_user_type
    }
  end
end
