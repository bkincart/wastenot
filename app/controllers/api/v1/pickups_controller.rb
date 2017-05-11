class Api::V1::PickupsController < ApplicationController
  def index
    # Iterate through pickups for user and make sure any inventory not from
    # today is marked as inactive
    @user_id = current_user.id
    @user_pickups = Pickup.where(shelter_id: @user_id)
    @user_pickups.each do |pickup|
      pickup.active = false if pickup.inventory.created_at.to_date != DateTime.now.to_date
      pickup.save
    end
    @active_pickups = Pickup.where(shelter_id: @user_id, active: true)
    # Serve up the active pickup items
    render json: @active_pickups
  end

  def create
    body = request.body.read
    parsed = JSON.parse(body)
    pickup = Pickup.new(parsed)
    # Save pickup
    if pickup.save
      # Add pickup_id to appropriate inventory item
      pickup.inventory.pickup_id = pickup.id
      pickup.inventory.available = false
      if pickup.inventory.save
        render json: { messages: 'Success', pickup: pickup }
      end
    else
      render json: { messages: pickup.errors.full_messages }
    end
  end

  def destroy
    body = request.body.read
    parsed = JSON.parse(body)
    pickup = Pickup.find(parsed['pickup_id'])
    # Reset related inventory object
    pickup.inventory.pickup_id = nil
    pickup.inventory.available = true
    pickup.inventory.save
    # Destroy pickup object
    pickup.destroy
    render json: { message: 'Success' }
  end
end
