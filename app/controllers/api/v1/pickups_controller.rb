class Api::V1::PickupsController < ApplicationController
  def index
    @user_id = current_user.id
    @pickups = Pickup.where(shelter_id: @user_id)
    render json: @pickups
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
