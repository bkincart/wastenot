class Api::V1::PastinventoriesController < ApplicationController
  def index
    # Iterate through active inventory and mark any not from today as inactive
    active_inventory= Inventory.where(active: true)
    active_inventory.each do |inventory|
      inventory.active = false if inventory.created_at.to_date != DateTime.now.to_date
      inventory.save
    end
    @user_id = current_user.id
    @past_inventories = Inventory.where(user_id: @user_id, active: false)
    render json: @past_inventories
  end
end
