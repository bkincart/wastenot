class Api::V1::PickupsController < ApplicationController
  def index
    @user_id = current_user.id
    @pickups = Pickup.where(shelter_id: @user_id)
    render json: @pickups
  end
end
