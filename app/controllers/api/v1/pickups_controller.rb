class Api::V1::PickupsController < ApplicationController
  def index
    @user_id = current_user.id
    binding.pry
    render json:
      {
        pickups: Pickup.where(shelter_id: @user_id)
      }
  end
end
