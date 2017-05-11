class Api::V1::PastpickupsController < ApplicationController
  def index
    # Iterate through pickups for user and make sure any inventory not from
    # today is marked as inactive
    @user_id = current_user.id
    @user_pickups = Pickup.where(shelter_id: @user_id)
    @user_pickups.each do |pickup|
      pickup.active = false if pickup.inventory.created_at.to_date != DateTime.now.to_date
      pickup.save
    end
    # Serve up the inactive pickup items
    @pastpickups = Pickup.where(shelter_id: @user_id, active: false)
    render json: @pastpickups
  end
end
